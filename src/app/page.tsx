import { ProjectCarousel } from "@/components/project-carousel";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";
import { Navbar } from "@/components/navbar";
import { WorkExperience } from "@/components/work-experience";
import { CraftDemos } from "@/components/craft-demos";

export default function Home() {
  return (
    <>
    
      <main role="main" className="max-w-5xl mx-auto flex flex-col gap-4 px-4 min-h-[92vh]">
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
        <ProjectCarousel />
        <CraftDemos />
        <WorkExperience />
      </main>
    </>
  );
}