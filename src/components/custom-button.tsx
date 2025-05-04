import { ClipboardCopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useSound from "@/hooks/use-sound";

export const CustomButton = ({ textToCopy }: { textToCopy: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const clickSound = useSound("/audio/rizz.mp3");

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
    <button
      onClick={copyToClipboard}
      type="button"
      className="w-fit flex font-mono items-center justify-center font-semibold border transition-all ease-in duration-75 whitespace-nowrap text-center select-none disabled:shadow-none disabled:opacity-50 disabled:cursor-not-allowed gap-x-1 active:shadow-none text-sm leading-5 rounded-xl py-1.5 h-8 px-4 text-neutral-700 bg-gray-200 dark:bg-gray-300  border-neutral-200  dark:border-neutral-300  dark:disabled:bg-neutral-00 dark:disabled:hover:bg-neutral-00 shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)] dark:shadow-[0px_1px_1px_-0.5px_rgba(255,255,255,0.03),0px_3px_3px_-1.5px_rgba(255,255,255,0.03)] dark:hover:shadow-[0px_3px_3px_-1.5px_rgba(255,255,255,0.03),0px_6px_6px_-3px_rgba(255,255,255,0.03),0px_12px_12px_-6px_rgba(255,255,255,0.2)]"
    >
      <span className="size-icon">
        <ClipboardCopyIcon className="h-4 w-4 text-neutral-70" />
      </span>
      <span className="text-neutral-700">
        npx ankit
      </span>
    </button>
  );
};
