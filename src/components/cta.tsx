"use client";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
export default function Booker() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"quick-chat"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, [])
  

  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.05 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.35 }}
    className="relative flex w-full h-fit p-2 gap-x-2 place-content-center text-center items-center justify-between rounded-xl border border-primary/10 bg-foreground/5 shadow-[0px_1px_1px_-0.5px_rgba(0,0,0,0.03),0px_3px_3px_-1.5px_rgba(0,0,0,0.03)] hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)] dark:border-primary/10 dark:hover:shadow-[0px_3px_3px_-1.5px_rgba(0,0,0,0.03),0px_6px_6px_-3px_rgba(0,0,0,0.03),0px_12px_12px_-6px_rgba(0,0,0,0.03)]"
      data-cal-namespace="quick-chat"
      data-cal-link="ankit-yadav-edanet/quick-chat"
      data-cal-config='{"layout":"month_view"}'
      onClick={handleClick}
    >
     <PhoneCall className="h-3 w-3 text-primary" />
     <span className="flex items-center justify-start gap-x-1">
        <span className="text-sm font-semibold text-primary">
            Book a call
        </span>
        <span className="text-xs text-muted-foreground">
            (15 min)
        </span>
     </span>
    </motion.button>
  );
};