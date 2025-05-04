import Logo from "@/components/logo";
import { ProjectCarousel } from "@/components/project-carousel";
import { ModeToggle } from "@/components/theme-button";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import { GithubGraph } from "@/components/github";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <main className="max-w-5xl mx-auto flex flex-col gap-4 px-4 min-h-[92vh]">
        <DotPattern
          width={5}
          height={5}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />
      <Navbar />

        {/* Add responsive classes to the carousel */}
        <ProjectCarousel />
        <Toaster />
      </main>
    </>
  );
}
