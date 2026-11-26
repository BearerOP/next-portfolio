import { PageFrame, Reveal } from "@/components/ds";
import { About } from "@/components/home/about";
import { Crafts } from "@/components/home/crafts";
import { Education, Experience } from "@/components/home/experience";
import { GithubActivity } from "@/components/home/github-activity";
import { Hero } from "@/components/home/hero";
import { NowPlaying } from "@/components/home/now-playing";
import { Projects } from "@/components/home/projects";
import { TechStack } from "@/components/home/tech-stack";
import { SiteFooter } from "@/components/home/site-footer";
import { Navbar } from "@/components/navbar";

// Each section is one Panel; the order here is the order on the sheet.
const sections = [Hero, About, TechStack, GithubActivity, NowPlaying, Projects, Crafts, Experience, Education];

export default function Home() {
  return (
    <>
      <Navbar />
      <PageFrame>
        <main className="flex flex-col gap-6">
          {sections.map((Section, index) => (
            <Reveal key={Section.name} index={index}>
              <Section />
            </Reveal>
          ))}
        </main>
        <SiteFooter />
      </PageFrame>
    </>
  );
}
