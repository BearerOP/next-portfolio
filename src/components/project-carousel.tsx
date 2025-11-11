"use client";
import React, { useRef, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion, Variants } from "motion/react";
import SplitText from "./split-text";
import { CustomButton } from "./custom-button";
import AvatarComponent from "./avatar-comp";
import ContributionsPage from "./graph";
import { TwitterIcon } from "./ui/twitter-icon";
import { MailCheckIcon } from "./ui/mail-icon";
import { GithubIcon } from "./ui/github-icon";
import { LinkedinIcon } from "./ui/linkedin-icon";
import { ArchiveIcon } from "./archive-icon";
import { VolumeIcon } from "./volume-icon";
import { projects } from "@/lib/resume";

export function ProjectCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/click.mp3");
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const hoverSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/click_min.mp3");
    }

    const audio = audioRef.current;

    audio.pause(); // Stop any ongoing playback
    audio.currentTime = 0; // Reset to the beginning
    audio.play(); // Play instantly
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        staggerDirection: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
  };

  return (
    <div className="w-full pt-8 space-y-6">
      {/* Main Heading Section */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row gap-2">
        <h1 className="flex flex-col gap-1 md:gap-2 items-start justify-center w-full">
          <SplitText
            className="hover:font-thin transition-all duration-700 text-xl md:text-2xl flex items-start w-fit font-sans font-normal text-zinc-500 dark:text-zinc-400"
            description="Hi! I'm Ankit Yadav aka BearerOP"
          />
          <SplitText
            className="text-sm md:text-md w-fit font-semibold text-neutral-800/90 dark:text-neutral-200/70 "
            description="21 • Rajasthan, IN • Web Developer/Designer"
          />
          <SplitText
            className="text-sm md:text-lg w-fit font-semibold text-neutral-800/90 dark:text-neutral-200/90 "
            description="I build web applications that look good, feel fast, and work flawlessly across devices."
          />
        </h1>
        <div className="flex items-start justify-center w-fit md:min-w-[16rem]">
          <div className="md:mt-4">
            <AvatarComponent />
          </div>
        </div>
        {/* <SplitText
          className="text-5xl w-full font-semibold text-neutral-800/90 dark:text-neutral-200/90 "
          description="Here are some of my projects that I have built so far."
        /> */}
      </div>
      <div className="flex items-center justify-between w-full gap-2 mt-4 px-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.3,
          }}
          whileHover={{ scale: 1.1 }}
          exit={{ opacity: 1 }}
          className="flex items-center justify-center w-fit"
        >
          <CustomButton textToCopy="npm i -g ankit-cli && ankit" />
        </motion.div>

        <motion.div
          className="flex items-center justify-center w-fit gap-2 md:pr-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {[
            {
              href: "https://x.com/ankit_twt",
              icon: <TwitterIcon size={16} />,
            },
            {
              href: "https://linkedin.com/in/yadavankit189",
              icon: <LinkedinIcon size={16} />,
            },
            {
              href: "mailto:work.ankit189@gmail.com",
              icon: <MailCheckIcon size={16} />,
            },
            {
              href: "https://github.com/BearerOP",
              icon: <GithubIcon size={16} />,
            },
            // {
            //   onclick: "",
            //   icon: <VolumeIcon size={16} />,
            // },
            {
              href: "/craft",
              icon: <ArchiveIcon size={16} />,
            },
          ].map(({ href, icon }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target={href.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              variants={itemVariants as Variants}
              whileHover={{ scale: 1.15 }}
              onHoverStart={hoverSound}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="border p-2 transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl text-neutral-700 dark:text-white/80 relative  overflow-hidden shadow-[inset_0px_4.35px_8.7px_#ffffff99,inset_0px_-4.35px_4px_#cccccc99,0px_7px_11.7px_#00000040]
"
            >
              {icon}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* GitHub Graph */}
      <ContributionsPage />

      {/* Carousel */}
      <div className="max-w-5xl mx-auto">
        <Carousel items={cards} />
      </div>
    </div>
  );
}
// Transform resume project data to match the carousel's expected format
const data = projects.map(project => ({
  category: project.category,
  title: project.title,
  src: project.image,
  githubLink: project.githubUrl,
  liveLink: project.liveUrl,
}));
