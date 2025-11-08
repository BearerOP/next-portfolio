"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";
import useSound from "@/hooks/use-sound";
import { GithubIcon } from "./github-icon";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  githubLink: string;
  liveLink: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => { },
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickSound = useSound("/audio/button-click.wav");

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    clickSound(); // 🔊 play on click
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    clickSound(); // 🔊 play on click
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 ",
              "max-w-7xl mx-auto"
            )}
          >
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeInOut",
                    once: true,
                  },
                }}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl transition-transform duration-500 hover:-translate-y-4 cursor-pointer"
              >
                <div className="transition-transform duration-500 hover:-translate-y-4">
                  {item}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mr-10">
          <button
            className="relative h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center disabled:opacity-30 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-colors duration-200" />
          </button>
          <button
            className="relative h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center disabled:opacity-30 transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 border border-gray-200 dark:border-gray-700"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-700 dark:text-gray-300 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const { onCardClose, currentIndex } = useContext(CarouselContext);
  const clickSound = useSound("/audio/button-click.wav");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const redirectLiveLink = () => {
    clickSound(); // 🔊
    if (card.liveLink) {
      window.open(card.liveLink, "_blank");
    }
  };

  const redirectGithubLink = () => {
    clickSound(); // 🔊
    if (card.githubLink) {
      window.open(card.githubLink, "_blank");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Extract domain from liveLink for favicon
  const getFaviconUrl = () => {
    if (!card.liveLink) return null;
    try {
      const url = new URL(card.liveLink);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        className="relative group"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Mouse Follower Pointer - Hidden on mobile */}
        {isHovered && card.liveLink && !isButtonHovered && (
          <motion.div
            className="absolute pointer-events-none z-50 hidden md:block"
            initial={{
              opacity: 0, scale: 0.8, x: mousePosition.x + 15,
              y: mousePosition.y + 15,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePosition.x + 15,
              y: mousePosition.y + 15,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              mass: 0.5,
            }}
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 dark:bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">
              {getFaviconUrl() && (
                <img
                  src={getFaviconUrl()!}
                  alt=""
                  className="w-4 h-4 rounded-sm"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <span className="text-xs font-medium text-white whitespace-nowrap">
                Visit - {' '}
                <span className="font-bold">{card.title}</span>
              </span>
              <ArrowUpRight className="w-3 h-3 text-white/80" />
            </div>
          </motion.div>
        )}

        {/* Container for hover opacity */}
        <motion.div
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={redirectLiveLink}
          className="rounded-3xl bg-black dark:bg-neutral-900 h-[20rem] w-56 md:h-[33rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 transition-opacity duration-300 group-hover:[absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-100 group-hover:opacity-80 transition-opacity duration-300 z-20 pointer-events-none]"
        >
          {/* Overlay gradient */}
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none rounded-3xl" />
          {/* Text content */}
          <div className="relative z-40 p-8">
            <motion.h2
              layoutId={layout ? `title-${card.title}` : undefined}
              className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2 group-hover:opacity-100"
            >
              {card.title}
            </motion.h2>
            <motion.h2
              layoutId={layout ? `category-${card.category}` : undefined}
              className="text-slate-300 text-sm md:text-base font-medium font-sans text-left group-hover:opacity-100"
            >
              {card.category}
            </motion.h2>
            {/* GitHub button, hidden by default and appears on hover */}
            <div className="flex justify-start pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2 z-[999]">
              <motion.button
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden rounded-full border border-white/60 hover:border-white/90 hover:bg-white/10 bg-white/5 text-white transition-all duration-300 hover:cursor-pointer backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  redirectGithubLink();
                }}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <GithubIcon size={12} className="text-white flex-shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">Github</span>
                  <motion.div
                    animate={{
                      width: isButtonHovered ? "auto" : 0,
                      opacity: isButtonHovered ? 1 : 0,
                      marginLeft: isButtonHovered ? "0.125rem" : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden flex items-center"
                  >
                    <ArrowUpRight className="size-4 text-white flex-shrink-0" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-55 rounded-3xl"
          />
        </motion.div>
      </div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <Image
        className={cn(
          "transition duration-300 transform",
          isLoading ? "blur-sm" : "blur-0",
          className
        )}
        onLoad={() => setLoading(false)}
        src={src}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        blurDataURL={typeof src === "string" ? src : undefined}
        alt={alt ? alt : "Background of a beautiful view"}
        {...rest}
      />
    </>
  );
};
