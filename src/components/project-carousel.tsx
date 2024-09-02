"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export function ProjectCarousel() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout={true} />
  ));

  return (
    <div className="w-full h-1/2 pt-8">
      <h3 className="max-w-7xl pl-4 mx-auto text-xl md:text-2xl font-light text-neutral-800/80 dark:text-neutral-200/60 font-sans">
        Hi! I&apos;m Ankit Yadav.
      </h3>
      <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800/90 dark:text-neutral-200/90 font-sans">
      I create seamless full-stack web applications.
      </h2>
      <Carousel items={cards}  />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "URL Shortener",
    title: "Slug",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.09.08.png?alt=media&token=5d295480-e9b8-4e4d-ac2f-dc5cad22e191",
    content: <DummyContent />,
  },
  {
    category: "Web 3 Wallet",
    title: "Dhanam",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.10.png?alt=media&token=7df4bc7e-1bea-4b1b-a9d6-809a574f1b87",
    content: <DummyContent />,
  },
  {
    category: "API Monitoring",
    title: "Avadhi",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.09.27.png?alt=media&token=d7ae6831-77e0-41cb-9821-f6d345ae5645",
    content: <DummyContent />,
  },

  {
    category: "NPM Package",
    title: "OTP generation package",
    src: "https://firebasestorage.googleapis.com/v0/b/theslugproject.appspot.com/o/portfolio%2FScreenshot%202024-08-29%20at%2009.10.23.png?alt=media&token=7b55cdc6-9df5-482f-9a2c-92da4949ae69",
    content: <DummyContent />,
  },
  {
    category: "Product",
    title: "Maps for your iPhone 15 Pro Max.",
    src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
  {
    category: "iOS",
    title: "Photography just got better.",
    src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    content: <DummyContent />,
  },
];
