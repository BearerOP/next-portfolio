"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "./ui/separator";
import { ArrowUpRight } from 'tabler-icons-react';
import useSound from "@/hooks/use-sound";

const socialLinks = [
    {
        href: "https://x.com/ankit_twt",
        label: "Twitter",
    },
    {
        href: "https://www.linkedin.com/in/yadavankit189/",
        label: "LinkedIn",
    },
    {
        href: "https://github.com/BearerOP",
        label: "Github",
    },
    {
        href: "mailto:work.ankit189@gmail.com",
        label: "Mail",
    },
    {
        href: "https://dub.sh/resume189",
        label: "Resume",
    },
];

function Footer() {
  const clickSound = useSound("/audio/button-click.wav");
  const bearerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    const currentRef = bearerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <footer className="max-w-7xl mx-auto px-4 py-8">
        <Separator className="my-4" />
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
          {socialLinks.map(({ href, label }, index) => (
            <React.Fragment key={index}>
              <Link
                href={href}
                onClick={clickSound}
                target="_blank"
                className="opacity-70 font-bold flex items-center gap-2 relative group transition-opacity hover:opacity-100"
              >
                <span className="relative transition-transform duration-500 ease-in-out group-hover:-translate-x-2">
                  {label}
                </span>
                <ArrowUpRight
                  size={48}
                  strokeWidth={1}
                  className="absolute h-[22px] -right-8 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 dark:text-white text-black"
                />
              </Link>
              {index < socialLinks.length - 1 && (
                <Separator orientation="vertical" className="hidden sm:block h-6" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Separator className="my-4" />
      </footer>

      {/* Bearer Text Block with Gradient */}
      <div
        ref={bearerRef}
        className="w-full overflow-hidden py-16 sm:py-36 md:py-48 relative"
        style={{
          opacity: isVisible ? 1 : 0.3,
          transition: 'opacity 2 ease-out',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-white to-blue-300 dark:from-[#030712]  dark:to-blue-400"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 2s ease-out',
          }}
        >
          <div className="h-full relative -bottom-[1.2rem] lg:-bottom-[2rem] flex items-end justify-center">
            <h2 className="align-bottom text-[124px] sm:text-[96px] md:text-[18vw] lg:text-[18vw] font-black tracking-tighter text-white/50 dark:text-white/30 select-none leading-none">
              bearer
            </h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer;