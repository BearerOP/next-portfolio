"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface CodeBlockProps {
  code: string;
  /** Long listings start clipped with an Expand control. */
  collapsible?: boolean;
}

/**
 * A block of code with a copy button. Use for anything the reader is meant
 * to copy: commands, usage examples, full source.
 */
export function CodeBlock({ code, collapsible = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable: leave the icon unchanged so it does not claim success
    }
  };

  return (
    <div className="border border-line bg-fill">
      <div className="flex items-start">
        <pre
          className={cn(
            "min-w-0 flex-1 overflow-x-auto p-4 font-mono text-xs leading-relaxed scrollbar-hide",
            collapsible && !expanded && "max-h-96 overflow-y-hidden"
          )}
        >
          <code>{code}</code>
        </pre>
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copy}
            aria-label={copied ? "Copied" : "Copy code"}
            icon={copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          />
        </div>
      </div>
      {collapsible && (
        <div className="flex justify-center border-t border-line p-2">
          <Button variant="ghost" size="sm" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
            {expanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      )}
    </div>
  );
}
