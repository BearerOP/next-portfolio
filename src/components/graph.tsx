import { motion } from "framer-motion";

export default function ContributionsPage() {

  return (
    <div className=" max-w-4xl mx-auto p-6 flex gap-6 invert grayscale">
      <motion.img 
      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        ease: "easeInOut",
        delay: 0.6,
      }}
      src="https://ghchart.rshah.org/4a4a4a/bearerop" alt="2016rshah's Blue Github Chart" className="w-full" />

      </div>
  );
}
