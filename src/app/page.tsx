import Logo from "@/components/logo";
import { ProjectCarousel } from "@/components/project-carousel";
import { ModeToggle } from "@/components/theme-button";

export default function Home() {
  return (
    <>
      <main className="max-w-7xl mx-auto flex flex-col gap-4 px-4  min-h-[92vh]">
        <nav className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <ModeToggle />
        </nav>
        <ProjectCarousel />
      </main>
    </>
  );
}
