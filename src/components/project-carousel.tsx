"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";
import { GithubGraph } from "./github";
import SplitText from "./split-text";
import { CustomButton } from "./custom-button";
import { AvatarIcon } from "@radix-ui/react-icons";
import AvatarComponent from "./avatar-comp";

export function ProjectCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full pt-8 space-y-6">
      {/* Main Heading Section */}
      <div className="max-w-7xl mx-auto px-4 flex gap-2">
        <div>
        <SplitText
          className="text-lg md:text-xl flex items-start w-fit font-sans font-normal text-zinc-900 dark:text-zinc-200"
          description="Hi! I'm Ankit Yadav aka BearerOP"
        />
        <SplitText
          className="text-2xl md:text-3xl w-full font-semibold text-neutral-800/90 dark:text-neutral-200/90 "
          description="I build web applications that look good, feel fast, and work flawlessly across devices."
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
          }}
          whileHover={{ scale: 1.05 }}
          exit={{ opacity: 1 }}
          className="flex items-center justify-center w-fit mt-4"
        >
          <CustomButton textToCopy="npm i -g ankit-cli && ankit" />
        </motion.div>
        </div>
        <div className="flex items-start justify-center min-w-[16rem] w-fit">
          <div className="mt-4">
          <AvatarComponent/>
          </div>
          
          </div>
        {/* <SplitText
          className="text-5xl w-full font-semibold text-neutral-800/90 dark:text-neutral-200/90 "
          description="Here are some of my projects that I have built so far."
        /> */}
      </div>

      {/* GitHub Graph + Copy Button Section */}
      {/* <motion.div
        className="max-w-7xl mx-auto px-4 flex justify-start items-center mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="hidden md:block">
            <GithubGraph
              username="bearerop"
              blockMargin={2}
              lightColorPalette={[
                "#1e1e2f",
                "#5a3e7a",
                "#7e5aa2",
                "#a87cc3",
                "#d9a9e6",
              ]}
              darkColorPalette={[
                "#1e1e2f",
                "#5a3e7a",
                "#7e5aa2",
                "#a87cc3",
                "#d9a9e6",
              ]}
            />
          </div>
        </div>
      </motion.div> */}

      {/* Carousel */}
      <div className="max-w-5xl mx-auto">
        <Carousel items={cards} />
      </div>
    </div>
  );
}
const data = [
  {
    category: "Link-in-bio web",
    title: "Vraksh",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2F632shots_so.png?alt=media&token=a79bac5e-b1aa-45e3-b989-85edceacaed4",
    githubLink: "https://github.com/BearerOP/vraksh-project",
    liveLink: "https://vraksh.bearerop.tech/",
  },

  {
    category: "Learning Management System ( LMS )",
    title: "GyanSagar",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fgyansagar.jpg?alt=media&token=d939d4e6-76eb-413e-828a-e3d789172c24",
    githubLink: "https://github.com/BearerOP/gyansagar-client.git",
    liveLink: "https://gyansagar.bearerop.tech/",
  },
  {
    category: "Startup Website Clone @MagicUI",
    title: "MagicUI template",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fstartup-template.jpg?alt=media&token=e20f0c2d-71d7-4736-8369-220d1b3c149d",
    githubLink: "https://github.com/BearerOP/startup-landing-page-nextjs",
    liveLink: "https://startup-template.bearerop.tech/",
  },
  {
    category: "API Monitoring Dashboard",
    title: "Avadhi",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Favadhi.jpg?alt=media&token=27115960-b6fa-41d4-af7d-c54f693c767a",
    githubLink: "https://github.com/BearerOP/API-Monitoring-Frontend",
    liveLink: "https://avadhi.bearerop.tech/",
  },
  {
    category: "Health & Fitness Monitoring System App (Backend only)",
    title: "Swasthya",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fswasthya.jpg?alt=media&token=0d5e5117-c79d-4e43-b7e9-1cf0443c7d55",
    githubLink: "https://github.com/BearerOP/Swasthya-backend",
    liveLink: "",
  },
  {
    category: "Food Order & Delivery App - (Backend only)",
    title: "FoodPlanet",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FfoodPlanet.jpg?alt=media&token=cabaf9f7-e520-478c-ad2d-4ec34f061ee2",
    githubLink: "https://github.com/BearerOP/food-delivery-app",
    liveLink: "https://www.youtube.com/watch?v=oRNMadW335g",
  },
  {
    category: "Web 3 Wallet",
    title: "Dhanam",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.10.png?alt=media&token=7df4bc7e-1bea-4b1b-a9d6-809a574f1b87",
    githubLink: "https://github.com/bearerOP/dhanam",
    liveLink: "https://dhanam.bearerop.tech/",
  },
  {
    category: "URL Shortener",
    title: "Slug",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fslug.jpg?alt=media&token=adb0c27d-2a2d-4795-8127-5d0c13cd615e",
    githubLink: "https://github.com/bearerOP/TheSlugProject",
    liveLink: "https://theslug.netlify.app",
  },
  {
    category: "NPM Package",
    title: "OTP generation package",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.23.png?alt=media&token=7b55cdc6-9df5-482f-9a2c-92da4949ae69",
    githubLink: "https://github.com/BearerOP/otp-generation-package",
    liveLink: "https://www.npmjs.com/package/otp-generation",
  },
];
