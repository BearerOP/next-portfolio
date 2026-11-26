import Image from "next/image";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Annotation, Button, Tooltip } from "@/components/ds";
import { contactInfo } from "@/lib/resume";
import { AvatarToggle } from "./avatar-toggle";

const socials = [
  { name: "Twitter", href: contactInfo.twitter, icon: Twitter },
  { name: "LinkedIn", href: contactInfo.linkedin, icon: Linkedin },
  { name: "GitHub", href: contactInfo.github, icon: Github },
  { name: "Email", href: `mailto:${contactInfo.email}`, icon: Mail },
] as const;

export function Hero() {
  return (
    <div className="cross-rules border border-line-strong bg-background">
      <Annotation side="left" align="bottom">click me</Annotation>
      <Annotation side="right" align="bottom">follow me</Annotation>
      <div className="relative h-48 overflow-hidden border-b border-line md:h-72">
        <Image
          src="/images/hero-banner.gif"
          alt="Pixel-art waterfalls in a forest"
          fill
          priority
          // Animated GIF: the optimizer would flatten it to one frame
          unoptimized
          sizes="(min-width: 768px) 768px, 100vw"
          className="media-mono pixelated object-cover"
        />
      </div>
      <div className="flex items-end justify-between gap-4 px-4 pb-4">
        <AvatarToggle />
        <div className="flex items-end gap-2 pt-4">
          {socials.map(({ name, href, icon: Icon }) => (
            <Tooltip key={name} content={name}>
              <Button href={href} aria-label={name} icon={<Icon className="size-4" />} />
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
