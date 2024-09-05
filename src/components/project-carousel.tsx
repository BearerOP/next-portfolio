"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { FadeText } from "./magicui/fade-text";



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
            show: { transition: { delay: 0.2, duration: .3 } },
          }}

          text="Hi! I&apos;m Ankit Yadav."
        />

      </h3>
      <FadeText className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800/90 dark:text-neutral-200/90 font-sans"
        text=" I create seamless full-stack web applications." direction="up"
        framerProps={{
          show: { transition: { delay: 0.4, duration: .3 } },
        }}
      />
      <Carousel items={cards} />
    </div>
  );
}



const data = [
  {
    category: "URL Shortener",
    title: "Slug",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.09.08.png?alt=media&token=5d295480-e9b8-4e4d-ac2f-dc5cad22e191",
    githubLink: "https://github.com/bearerOP/TheSlugProject",
    liveLink: "https://theslug.netlify.app"
  },
  {
    category: "Web 3 Wallet",
    title: "Dhanam",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.10.png?alt=media&token=7df4bc7e-1bea-4b1b-a9d6-809a574f1b87", 
    githubLink: "https://github.com/bearerOP/dhanam",
    liveLink: "https://dhanam.vercel.app"
  },
  {
    category: "API Monitoring",
    title: "Avadhi",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.09.27.png?alt=media&token=d7ae6831-77e0-41cb-9821-f6d345ae5645", 
    githubLink: "https://github.com/bearerOP/avadhi",
    liveLink: "https://up-status-xi.vercel.app"
  },

  {
    category: "NPM Package",
    title: "OTP generation package",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.23.png?alt=media&token=7b55cdc6-9df5-482f-9a2c-92da4949ae69", 
    githubLink: "https://github.com/BearerOP/otp-generation-package",
    liveLink: "https://www.npmjs.com/package/otp-generation"
  }
];
