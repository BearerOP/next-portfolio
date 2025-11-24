"use client";
import React, { useRef, useState } from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion, Variants, AnimatePresence } from "motion/react";
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
import { SpotifyNowPlaying } from "./spotify-live";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/magicui/company-logo";

export function ProjectCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastHoveredTime, setLastHoveredTime] = useState<number>(0);
  const HOVER_COOLDOWN = 3000; // 3 seconds

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

  const techStack = [
    { name: "Next.js", icon: NextjsIcon },
    { name: "TypeScript", icon: TypeScriptIcon },
    { name: "Tailwind CSS", icon: TailwindIcon },
    { name: "Motion", icon: MotionIcon },
    { name: "Node.js", icon: NodeIcon },
    { name: "Postgres", icon: PostgresIcon },
    { name: "Figma", icon: FigmaIcon },
  ];

  return (
    <div className="w-full pt-8 space-y-6">
      {/* Main Heading Section */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse md:flex-row gap-2">
        <div className="flex flex-col gap-1 md:gap-2 items-start justify-center w-full">
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
          
          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map(({ name, icon: Icon }) => (
              <TooltipItem
                key={name}
                content={name}
                lastHoveredTime={lastHoveredTime}
                setLastHoveredTime={setLastHoveredTime}
                hoverCooldown={HOVER_COOLDOWN}
              >
                <Badge 
                  variant="secondary"
                  className="rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 px-2 py-0.5 text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors gap-1.5 font-medium cursor-default"
                >
                  <div className="relative w-3.5 h-3.5 flex-shrink-0">
                    <CompanyLogo
                      name={name}
                      size={14}
                      className="w-3.5 h-3.5"
                      fallback={<Icon className="w-3.5 h-3.5" />}
                      lazy={false}
                    />
                  </div>
                  {name}
                </Badge>
              </TooltipItem>
            ))}
          </div>
        </div>
        <div className="flex items-start justify-center w-fit md:min-w-[16rem]">
          <div className="md:mt-4">
            <AvatarComponent />
          </div>
        </div>
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
          <TooltipItem
             content="Copy install command"
             lastHoveredTime={lastHoveredTime}
             setLastHoveredTime={setLastHoveredTime}
             hoverCooldown={HOVER_COOLDOWN}
          >
            <CustomButton textToCopy="npm i -g ankit-cli && ankit" />
          </TooltipItem>
        </motion.div>

        <motion.div
          className="flex items-center justify-center w-fit gap-2 md:pr-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {[
            {
              name: "Twitter @ankit_twt",
              href: "https://x.com/ankit_twt",
              icon: <TwitterIcon size={16} />,
            },
            {
              name: "LinkedIn @yadavankit189",
              href: "https://linkedin.com/in/yadavankit189",
              icon: <LinkedinIcon size={16} />,
            },
            {
              name: "Email",
              href: "mailto:work.ankit189@gmail.com",
              icon: <MailCheckIcon size={16} />,
            },
            {
              name: "GitHub @BearerOP",
              href: "https://github.com/BearerOP",
              icon: <GithubIcon size={16} />,
            },
            {
              name: "Craft",
              href: "/craft",
              icon: <ArchiveIcon size={16} />,
            },
          ].map(({ name, href, icon }, idx) => (
            <TooltipItem
              key={idx}
              content={name}
              lastHoveredTime={lastHoveredTime}
              setLastHoveredTime={setLastHoveredTime}
              hoverCooldown={HOVER_COOLDOWN}
            >
              <motion.a
                href={href}
                target={href.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                variants={itemVariants as Variants}
                whileHover={{ scale: 1.15 }}
                onHoverStart={hoverSound}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="border p-2 transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl text-neutral-700 dark:text-white/80 relative  overflow-hidden shadow-[inset_0px_4.35px_8.7px_#ffffff99,inset_0px_-4.35px_4px_#cccccc99,0px_7px_11.7px_#00000040] block"
              >
                {icon}
              </motion.a>
            </TooltipItem>
          ))}
        </motion.div>
      </div>

      {/* GitHub Graph */}
      <ContributionsPage />

      <SpotifyNowPlaying />

      {/* Carousel */}
      <div className="max-w-5xl mx-auto">
        <Carousel items={cards} />
      </div>
    </div>
  );
}

// Tooltip Component
function TooltipItem({ 
  children, 
  content, 
  lastHoveredTime, 
  setLastHoveredTime, 
  hoverCooldown 
}: { 
  children: React.ReactNode;
  content: string;
  lastHoveredTime: number;
  setLastHoveredTime: (time: number) => void;
  hoverCooldown: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    if (isHovered) {
      const isWarm = Date.now() - lastHoveredTime < hoverCooldown;
      const delay = isWarm ? 0 : 800; // 0ms if warm, 800ms if cold
      
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      if (isVisible) {
        setLastHoveredTime(Date.now());
      }
    }
  }, [isHovered, lastHoveredTime, hoverCooldown, isVisible, setLastHoveredTime]);

  return (
    <div 
      className="relative flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute -top-10 px-2.5 py-1 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50 border border-zinc-800 dark:border-zinc-200"
          >
            {content}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-zinc-100 rotate-45 border-r border-b border-zinc-800 dark:border-zinc-200" />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
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

// Icons - Official SVGs from brand repositories
const NextjsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 394 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z" fill="currentColor" className="text-black dark:text-white"/>
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="400" rx="60" fill="#3178C6"/>
    <path d="M127.604 211.26h57.235v-12.873h-72.828v-7.168h72.828v-12.631H114.01v83.844h13.594v-51.172zm89.939 51.172c13.333 0 24.255-2.98 32.766-8.94 8.51-5.96 14.593-14.593 18.246-25.9 3.653-11.306 5.48-24.255 5.48-38.846v-1.255h-13.594v1.255c0 12.39-1.255 23.07-3.765 32.04-2.51 8.97-6.274 16.235-11.29 21.798-5.017 5.562-11.286 9.42-18.81 11.572-7.523 2.153-16.3 3.23-26.33 3.23-10.03 0-18.807-1.077-26.33-3.23-7.524-2.152-13.793-6.01-18.81-11.572-5.016-5.563-8.78-12.828-11.29-21.798-2.51-8.97-3.765-19.65-3.765-32.04v-1.255h-13.594v1.255c0 14.591 1.827 27.54 5.48 38.846 3.653 11.307 9.736 19.94 18.246 25.9 8.51 5.96 19.433 8.94 32.766 8.94zm95.954-51.172v12.631h-28.894v70.541h13.594v-70.54h15.3z" fill="white"/>
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 54 33" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.08 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.12 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.28 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.32 20.192 16.2 13.5 16.2z" fill="#38BDF8"/>
  </svg>
);

const MotionIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L24 12L12 24L0 12L12 0Z" fill="black" className="dark:fill-white"/>
    <path d="M12 0L24 12H0L12 0Z" fill="url(#motion-gradient)" fillOpacity="0.5"/>
    <defs>
      <linearGradient id="motion-gradient" x1="0" y1="12" x2="24" y2="12" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF0080"/>
        <stop offset="1" stopColor="#7928CA"/>
      </linearGradient>
    </defs>
  </svg>
);

const NodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 256 296" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M128 0L256 74v148L128 296 0 222V74L128 0z" fill="#339933"/>
    <path d="M128 37.5L214.5 90v116L128 258.5 41.5 206V90L128 37.5z" fill="#FFFFFF"/>
    <path d="M128 37.5L214.5 90v116L128 258.5 41.5 206V90L128 37.5z" fill="none" stroke="#339933" strokeWidth="3"/>
    <path d="M195.8 99.6v28.2l-12.2 7.1-12.2-7.1V99.6l12.2-7.1 12.2 7.1zm-24.4 0v28.2l-12.2 7.1-12.2-7.1V99.6l12.2-7.1 12.2 7.1z" fill="#339933"/>
  </svg>
);

const PostgresIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 512 512" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 480C132.5 480 32 379.5 32 256S132.5 32 256 32s224 100.5 224 224-100.5 224-224 224z" fill="#336791"/>
    <path d="M256 64c-106 0-192 86-192 192s86 192 192 192 192-86 192-192-86-192-192-192zm0 352c-88.2 0-160-71.8-160-160S167.8 96 256 96s160 71.8 160 160-71.8 160-160 160z" fill="#336791"/>
    <path d="M256 128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128zm0 224c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z" fill="#336791"/>
    <path d="M256 192c-35.3 0-64 28.7-64 64s28.7 64 64 64 64-28.7 64-64-28.7-64-64-64zm0 96c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" fill="#336791"/>
  </svg>
);

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 38 57" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 28.5 19 19 19 19C19 13.7533 23.2533 9.5 28.5 9.5C33.7467 9.5 38 13.7533 38 19C38 24.2467 33.7467 28.5 28.5 28.5H19Z" fill="#1ABCFE"/>
    <path d="M9.5 28.5C4.25329 28.5 0 24.2467 0 19C0 13.7533 4.25329 9.5 9.5 9.5H19V28.5H9.5Z" fill="#0ACF83"/>
    <path d="M19 0V9.5H9.5C4.25329 9.5 0 5.24671 0 0H19Z" fill="#F24E1E"/>
    <path d="M9.5 28.5C4.25329 28.5 0 32.7533 0 38C0 43.2467 4.25329 47.5 9.5 47.5H19V28.5H9.5Z" fill="#A259FF"/>
    <path d="M19 28.5V47.5C24.2467 47.5 28.5 43.2467 28.5 38C28.5 32.7533 24.2467 28.5 19 28.5Z" fill="#F24E1E"/>
  </svg>
);
