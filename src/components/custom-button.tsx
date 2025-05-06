import { ClipboardCopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSound from "@/hooks/use-sound";
import { motion } from "framer-motion";

export const CustomButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const clickSound = useSound("/audio/click.mp3");

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        clickSound();
        toast.success("Command Copied!", {
          description: "Make sure to run the command in your terminal.",
        });
        setTimeout(() => setIsCopied(false), 3000);
      } else {
        toast.error("Clipboard API not available in your browser.");
      }
    } catch (err) {
      console.error("Clipboard copy error:", err);
      toast.error("Failed to copy the command. Please try again.");
    }
  };

  return (
    <motion.button
      onClick={copyToClipboard}
      type="button"
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-fit  flex font-mono items-center justify-center font-semibold  border p-2 transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl text-neutral-700 dark:text-white/80 relative  overflow-hidden shadow-[inset_0px_4.35px_8.7px_#ffffff99,inset_0px_-4.35px_4px_#cccccc99,0px_7px_11.7px_#00000040]"
    >
      <span className="size-icon">
        <ClipboardCopyIcon className="h-4 w-4" />
      </span>
      <span>
        npx ankit
      </span>
    </motion.button>
  );
};
