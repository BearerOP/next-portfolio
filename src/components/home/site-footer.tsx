import { Label, TextLink } from "@/components/ds";
import { contactInfo, personalInfo } from "@/lib/resume";
import { VisitorCount } from "./visitor-count";

const links = [
  { label: "Twitter", href: contactInfo.twitter },
  { label: "LinkedIn", href: contactInfo.linkedin },
  { label: "GitHub", href: contactInfo.github },
  { label: "Mail", href: `mailto:${contactInfo.email}` },
  { label: "Resume", href: personalInfo.resumeUrl },
] as const;

/** Site footer: the row of social links under the last panel. */
export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-4 pb-8">
      <nav aria-label="Social" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <TextLink key={link.label} href={link.href} tone="muted">
            <Label>{link.label}</Label>
          </TextLink>
        ))}
      </nav>
      <VisitorCount />
    </footer>
  );
}
