'use client'

import { motion } from "motion/react"
import { ReactNode } from "react"

interface AnimatedContainerProps {
  children: ReactNode
  className?: string
}

export function AnimatedContainer({ children, className = "" }: AnimatedContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 