import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { motion } from "framer-motion"

export default function AvatarComponent() {
  return (
    <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.7 }}
    className="relative rounded-full size-full bg-transparent ring-1 ring-gray-700 dark:bg-neutral-900 p-[5px] overflow-hidden shadow-[inset_0px_4.35px_8.7px_#ffffff99,inset_0px_-4.35px_4px_#cccccc99,0px_7px_11.7px_#00000040]
">
      <Avatar className="w-24 h-24  outline-lime-50 ">
        <AvatarImage src="/images/gabimaru.jpg" alt="Ankit Yadav" />
        <AvatarFallback>ay.</AvatarFallback>
      </Avatar>
    </motion.div>
  )
}
