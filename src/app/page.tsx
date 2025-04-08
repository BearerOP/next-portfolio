import Logo from "@/components/logo";
import { ProjectCarousel } from "@/components/project-carousel";
import { ModeToggle } from "@/components/theme-button";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col gap-4 px-4 min-h-[92vh]">
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
        <nav className="flex justify-between items-center p-4 flex-wrap gap-2">
          <h2 className="flex items-center gap-2">
            <Logo />
          </h2>

          <ModeToggle />
        </nav>

        {/* Add responsive classes to the carousel */}
        <ProjectCarousel />
        <Toaster />
      </main>
    </>
  );
}
