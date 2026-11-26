import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "@/components/ds";
import { contactInfo, personalInfo } from "@/lib/resume";
import { AmbientSound } from "./ambient-sound";
import { BookCallButton } from "./book-call-button";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Craft", href: "/craft" },
  { label: "Split", href: "/split" },
  { label: "Resume", href: personalInfo.resumeUrl },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur-md">
      <nav aria-label="Main" className="flex h-14 items-center gap-4 px-4">
        {/* The two side groups share the leftover width equally, so the links
            between them sit on the true centre whatever each side holds */}
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/"
            aria-label="Ankit Yadav, home"
            className="flex size-8 items-center justify-center bg-foreground font-sans text-sm font-bold text-background transition-transform duration-press ease-out active:scale-press focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            ay.
          </Link>
        </div>

        <div className="hidden items-center md:flex">
          {links.map((link, index) => (
            <Button key={link.href} href={link.href} variant="ghost" size="sm">
              <span className="opacity-50">{String(index + 1).padStart(2, "0")} {"//"}</span>
              {link.label}
            </Button>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            href={contactInfo.github}
            variant="ghost"
            aria-label="GitHub profile"
            icon={<Github className="size-4" />}
          />
          <AmbientSound />
          <ThemeToggle />
          <BookCallButton />
        </div>
      </nav>
    </header>
  );
}
