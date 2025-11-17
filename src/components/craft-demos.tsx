"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight } from "tabler-icons-react";

interface DemoVideo {
  title: string;
  description: string;
  videoPath: string;
  componentId: string;
}

const demos: DemoVideo[] = [
  {
    title: "Origin Aware Card",
    description: "Expandable cards with layout animations",
    videoPath: "/videos/demo/origin-aware-card.mov",
    componentId: "origin-aware-cards",
  },
  {
    title: "Family Style Modal",
    description: "Multi-step animated modal with smooth transitions",
    videoPath: "/videos/demo/family-style-modal.mov",
    componentId: "family-style-modal",
  },
];

export function CraftDemos() {
  return (
    <section className="w-full py-12">
      <div className="space-y-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
          Craft Components
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Interactive UI components with smooth animations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demos.map((demo, index) => (
          <DemoCard key={demo.title} demo={demo} index={index} />
        ))}
      </div>
    </section>
  );
}

function DemoCard({ demo, index }: { demo: DemoVideo; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    // Set the component in sessionStorage before navigation
    sessionStorage.setItem("craft-selected-component", demo.componentId);
    router.push("/craft");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-video rounded-[18px] overflow-hidden bg-zinc-900 dark:bg-zinc-800 shadow-lg">
        {/* Video */}
        <video
          src={demo.videoPath}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 p-2 flex flex-col justify-end items-start">
          {/* Title */}
          {/* <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {demo.title}
            </h3>
            <p className="text-sm md:text-base text-zinc-300 mt-1">
              {demo.description}
            </p>
          </div> */}

          {/* Link Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            className="flex justify-center"
          >
            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05, cursor: "pointer" }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-zinc-100/60 text-zinc-900 rounded-xl transition-transform text-xs font-medium"
            >
              Visit - {demo.title}
              <ArrowUpRight
                className="w-4 h-4"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
