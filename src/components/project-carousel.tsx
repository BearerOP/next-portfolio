"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FadeText } from "./magicui/fade-text";
import { CopyButton } from "./copy-button";
import { motion } from "framer-motion";

export function ProjectCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-1/2 pt-8">
      <h3 className="max-w-7xl pl-4 mx-auto text-xl md:text-2xl font-light text-neutral-800/80 dark:text-neutral-200/60 font-sans">
        <FadeText
          className="text-2xl font-bold"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.2, duration: 0.3 } },
          }}
          text="Hi! I'm Ankit Yadav."
        />
      </h3>
      <FadeText
        className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800/90 dark:text-neutral-200/90 font-sans text-wrap"
        text="I create seamless full-stack web applications."
        direction="up"
        framerProps={{
          show: { transition: { delay: 0.4, duration: 0.3 } },
        }}
      />
      <motion.div
        className="mt-6 pl-4 flex justify-start items-center  "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <CopyButton />
      </motion.div>
      <Carousel items={cards} />
    </div>
  );
}

const data = [
  {
    category: "Startup Website Clone @MagicUI",
    title: "MagicUI template",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fstartup-template.jpg?alt=media&token=e20f0c2d-71d7-4736-8369-220d1b3c149d",
    githubLink: "https://github.com/BearerOP/startup-landing-page-nextjs",
    liveLink: "https://startup-template.bearerop.tech/",
  },

  {
    category: "Learning Management System ( LMS )",
    title: "GyanSagar",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Fgyansagar.jpg?alt=media&token=d939d4e6-76eb-413e-828a-e3d789172c24",
    githubLink: "https://github.com/BearerOP/gyansagar-client.git",
    liveLink: "https://gyansagar-client.vercel.app/",
  },
  {
    category: "API Monitoring",
    title: "Avadhi",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2Favadhi.jpg?alt=media&token=27115960-b6fa-41d4-af7d-c54f693c767a",
    githubLink: "https://github.com/BearerOP/API-Monitoring-Frontend",
    liveLink: "https://avadhi.bearerop.tech/",
  },
  {
    category: "Health & Fitness Monitoring System App (Backend)",
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
