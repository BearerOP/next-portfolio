#!/usr/bin/env node
/**
 * Design-system linter. Run with `pnpm lint:ds`; CI fails on any finding.
 *
 * Rules
 *   raw-color   A colour that is not a token: a hex / rgb() / hsl() literal, or a
 *               Tailwind palette class such as `bg-zinc-900` or `text-white`.
 *   one-off     An arbitrary Tailwind value such as `p-[13px]`. Values that
 *               reference a token (`var(--x)`, `theme(...)`) are fine.
 *   raw-html    A plain element where a component exists (`<button>` -> Button).
 *               Declared in the component with `@ds-replaces <tag>`.
 *   transition-all  `transition-all`. Name the properties that animate.
 *   limit       More uses of a variant than the component allows in one file.
 *               Declared in the component with `@ds-limit prop=value max=N -- why`.
 *
 * Escape hatch: put `ds-lint-disable-next-line <rule> -- <reason>` in a comment
 * on the line above. The reason is required.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const ROOT = process.cwd();
const config = (await import(pathToFileURL(path.join(ROOT, "design-system.config.mjs")).href)).default;

const PALETTE =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const COLOR_UTILITIES =
  "bg|text|border(?:-[xytrbl])?|ring(?:-offset)?|fill|stroke|from|via|to|shadow|outline|decoration|divide|placeholder|caret|accent";
const PALETTE_CLASS = new RegExp(
  `^-?(?:${COLOR_UTILITIES})-(?:(?:${PALETTE})-\\d{2,3}|white|black)(?:/\\d+)?$`
);
const HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/;
const COLOR_FUNCTION = /\b(?:rgba?|hsla?|oklch|oklab)\(\s*[\d.]/;
const ARBITRARY = /\[([^\]]+)\]/;
const USES_TOKEN = /var\(--|theme\(/;
const DISABLE = /ds-lint-disable-next-line\s+([a-z-]+)(\s+--\s*\S.*)?/;

const toPosix = (file) => file.split(path.sep).join("/");
const isUnder = (file, entries) =>
  entries.some((entry) => file === entry || file.startsWith(`${entry}/`));

/** Strip Tailwind variants (`md:hover:`), respecting brackets, and return the utility. */
function utilityOf(token) {
  let depth = 0;
  let start = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token[i];
    if (char === "[") depth++;
    else if (char === "]") depth--;
    else if (char === ":" && depth === 0) start = i + 1;
  }
  return token.slice(start).replace(/^!/, "");
}

/** Read `@ds-replaces` and `@ds-limit` tags from the design-system components. */
function readComponentRules(sources) {
  const replaces = new Map(); // html tag -> [component names]
  const limits = []; // { component, prop, value, max, reason }
  for (const { text } of sources) {
    const component = text.match(/export function (\w+)/)?.[1];
    if (!component) continue;
    for (const match of text.matchAll(/@ds-replaces\s+(\w+)/g)) {
      replaces.set(match[1], [...(replaces.get(match[1]) ?? []), component]);
    }
    for (const match of text.matchAll(/@ds-limit\s+(\w+)=(\w+)\s+max=(\d+)(?:\s+--\s+(.*))?/g)) {
      limits.push({
        component,
        prop: match[1],
        value: match[2],
        max: Number(match[3]),
        reason: match[4]?.trim(),
      });
    }
  }
  return { replaces, limits };
}

function lintSource({ file, text }, rules, { isComponent, isTokenFile }) {
  const findings = [];
  const lines = text.split("\n");
  const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

  const report = (node, rule, message) => {
    const { line, character } = source.getLineAndCharacterOfPosition(node.getStart(source));
    const disable = line > 0 ? lines[line - 1].match(DISABLE) : null;
    if (disable && disable[1] === rule) {
      if (disable[2]) return;
      message = `ds-lint-disable for "${rule}" needs a reason: add \`-- <why>\``;
    }
    findings.push({ file, line: line + 1, column: character + 1, rule, message });
  };

  const checkString = (node, value) => {
    if (!value) return;
    const isAnchor = /^\/?#[\w-]*$/.test(value);
    if (!isTokenFile && !isAnchor) {
      const hex = value.match(HEX);
      if (hex && !/url\(|&#/.test(value)) {
        report(node, "raw-color", `Raw colour "${hex[0]}". Use a semantic token (see DESIGN.md > Color).`);
      } else if (COLOR_FUNCTION.test(value)) {
        report(node, "raw-color", "Raw colour function. Use a semantic token (see DESIGN.md > Color).");
      }
    }
    for (const token of value.split(/\s+/)) {
      if (!token || token.length > 80) continue;
      const utility = utilityOf(token);
      if (PALETTE_CLASS.test(utility)) {
        report(node, "raw-color", `"${token}" is a palette colour. Use a role: bg-background, text-foreground, text-muted-foreground, border-line, bg-fill…`);
        continue;
      }
      if (utility === "transition-all") {
        report(node, "transition-all", `"${token}" animates every property. Name them: transition-colors, transition-transform, transition-[opacity,transform]…`);
        continue;
      }
      // `transition-[opacity,transform]` names properties, which is what we want
      if (utility.startsWith("transition-[")) continue;
      // A bare `[...]` is only a Tailwind arbitrary property if it has a colon;
      // otherwise it is something else, such as a CSS attribute selector
      const arbitrary = utility.match(ARBITRARY);
      if (arbitrary && /^[a-z-]+-\[|^\[[^\]]*:/.test(utility) && !USES_TOKEN.test(arbitrary[1])) {
        report(node, "one-off", `"${token}" is a one-off value. Use the scale, or add a named token to tailwind.config.ts.`);
      }
    }
  };

  const counts = new Map();

  const visit = (node) => {
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      if (!ts.isImportDeclaration(node.parent) && !ts.isExportDeclaration(node.parent)) {
        checkString(node, node.text);
      }
    } else if (ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      checkString(node, node.text);
    } else if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
      const tag = node.tagName.getText(source);
      {
        const replacement = rules.replaces.get(tag);
        if (replacement) {
          report(node, "raw-html", `Raw <${tag}>. Use <${replacement.join("> or <")}> from "@/components/ds".`);
        }
      }
      for (const limit of rules.limits) {
        if (tag !== limit.component) continue;
        const matches = node.attributes.properties.some(
          (attribute) =>
            ts.isJsxAttribute(attribute) &&
            attribute.name.getText(source) === limit.prop &&
            attribute.initializer &&
            ts.isStringLiteral(attribute.initializer) &&
            attribute.initializer.text === limit.value
        );
        if (!matches) continue;
        const key = `${limit.component}.${limit.prop}=${limit.value}`;
        const count = (counts.get(key) ?? 0) + 1;
        counts.set(key, count);
        if (count > limit.max) {
          report(
            node,
            "limit",
            `More than ${limit.max} <${limit.component} ${limit.prop}="${limit.value}"> in one file${limit.reason ? `: ${limit.reason}` : ""}.`
          );
        }
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(source);
  return findings;
}

function collect(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collect(full, out);
    else if (/\.(tsx|ts)$/.test(entry.name) && !entry.name.endsWith(".d.ts")) out.push(full);
  }
  return out;
}

function run() {
  const read = (file) => ({ file: toPosix(path.relative(ROOT, file)), text: fs.readFileSync(file, "utf8") });
  const components = collect(path.join(ROOT, config.componentsDir)).map(read);
  const rules = readComponentRules(components);

  const sources = config.include
    .flatMap((dir) => collect(path.join(ROOT, dir)))
    .map(read)
    .filter(({ file }) => !isUnder(file, config.ignore));

  const findings = sources.flatMap((source) =>
    lintSource(source, rules, {
      isComponent: isUnder(source.file, [config.componentsDir]),
      isTokenFile: config.tokenFiles.includes(source.file),
    })
  );

  for (const finding of findings) {
    console.log(`${finding.file}:${finding.line}:${finding.column}  ${finding.rule}  ${finding.message}`);
  }
  const summary = `ds-lint: ${sources.length} files, ${findings.length} problem${findings.length === 1 ? "" : "s"}`;
  console.log(findings.length ? `\n${summary}` : summary);
  process.exit(findings.length ? 1 : 0);
}

/** Proves each rule still fires. Run in CI so the linter cannot silently stop working. */
function selfTest() {
  const rules = {
    replaces: new Map([["button", ["Button"]]]),
    limits: [{ component: "Button", prop: "variant", value: "primary", max: 1, reason: "test" }],
  };
  const bad = `
    export function Bad() {
      return (
        <div className="bg-zinc-900 p-[13px] transition-all" style={{ color: "#21201c" }}>
          <button>Raw</button>
          <Button variant="primary">One</Button>
          <Button variant="primary">Two</Button>
        </div>
      );
    }`;
  const good = `
    export function Good() {
      return (
        <div className="bg-background p-4 md:hover:border-line w-[var(--col)] transition-[opacity,transform]">
          {/* ds-lint-disable-next-line raw-html -- test fixture */}
          <button>Allowed</button>
          <Button variant="primary">One</Button>
          <Link href="/#projects">Anchor</Link>
          <i data-selector={"[data-hover-sound]"} />
        </div>
      );
    }`;
  const options = { isComponent: false, isTokenFile: false };
  const fired = new Set(lintSource({ file: "bad.tsx", text: bad }, rules, options).map((f) => f.rule));
  const missing = ["raw-color", "one-off", "raw-html", "limit", "transition-all"].filter((rule) => !fired.has(rule));
  const falsePositives = lintSource({ file: "good.tsx", text: good }, rules, options);
  if (missing.length || falsePositives.length) {
    if (missing.length) console.error(`self-test: rules did not fire: ${missing.join(", ")}`);
    for (const f of falsePositives) console.error(`self-test: false positive ${f.rule}: ${f.message}`);
    process.exit(1);
  }
  console.log("ds-lint self-test: all 5 rules fire, no false positives");
}

if (process.argv.includes("--self-test")) selfTest();
else run();
