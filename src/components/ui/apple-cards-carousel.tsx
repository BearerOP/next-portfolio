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
import AnimatedShinyText from "../magicui/animated-shiny-text";
import { ArrowUpRight } from "lucide-react";
import useSound from "@/hooks/use-sound";

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
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const clickSound = useSound("/audio/click.wav");

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
              "flex flex-row justify-start gap-4 pl-4",
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
            className="relative h-10 w-10 rounded-full hover:bg-gray-800 flex items-center justify-center disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            className="relative h-10 w-10 rounded-full hover:bg-gray-800 flex items-center justify-center disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
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
  const clickSound = useSound("/audio/click.wav");
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

  return (
    <>
      <div className="relative group">
        {/* Container for hover opacity */}
        <motion.div
          layoutId={layout ? `card-${card.title}` : undefined}
          onClick={redirectLiveLink}
          className="rounded-3xl bg-black dark:bg-neutral-900 h-[20rem] w-56 md:h-[33rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 transition-opacity duration-300 group-hover:[absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-100 group-hover:opacity-80 transition-opacity duration-300 z-20 pointer-events-none]"
        >
          {/* Overlay gradient */}
          <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
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
              <div
                className="group rounded-full border border-white/80 hover:border-white/50 hover:bg-neutral-900/50 bg-white/20 text-white transition-all ease-in hover:cursor-pointer text-sm sm:text-base"
                onClick={(e)=> {
                  e.stopPropagation();
                  redirectGithubLink();
                }}
              >
                <AnimatedShinyText className="inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-2 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 z-50 w-full sm:w-[120px]">
                  <span className="text-white whitespace-nowrap">
                    ✨ Github
                  </span>
                  <ArrowUpRight className="ml-1 size-3 sm:size-4 text-white transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
              </div>
            </div>
          </div>
          <BlurImage
            src={card.src}
            alt={card.title}
            fill
            className="object-cover absolute inset-0 transition-opacity duration-300 group-hover:opacity-55"
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
