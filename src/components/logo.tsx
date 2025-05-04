"use client";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import useSound from "@/hooks/use-sound";
const Logo: React.FC = () => {
  const clickSound = useSound("/audio/button-click.wav");
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        whileHover={{ scale: 1.1, rotate: 0 }}
        exit={{ opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          duration: 0.2,
          damping: 20,
        }}
      >
        <Link
          href={"/"}
          onClick={() => {
            clickSound();
          }}
          className="font-extrabold text-xl p-1 dark:bg-white/80 dark:text-background bg-foreground/80 text-background size-[50px] leading-[1.35] rounded-lg text-center align-middle shadow-inner	
    "
        >
          ay.
        </Link>
      </motion.div>
    </>
  );
};

export default Logo;
