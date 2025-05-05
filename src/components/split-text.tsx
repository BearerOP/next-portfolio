"use client"

import { animate, stagger } from "motion"
import { splitText } from "motion-plus"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface SplitTextProps {
  description: string
  className?: string
}

export default function SplitText({ description, className }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!containerRef.current) return

      containerRef.current.style.visibility = "visible"

      const h1 = containerRef.current.querySelector("h1")
      if (!h1) return

      const { words } = splitText(h1)

      animate(
        words,
        { opacity: [0, 1], y: [10, 0], filter: ["blur(5px)", "blur(0px)"] },
        {
          type: "spring",
          duration: 2,
          bounce: 0,
          delay: stagger(0.075),
        }
      )

      // Highlight specific words after animation setup
      words.forEach((word) => {
        const text = word.textContent?.trim()
        if (text === "Ankit" || text === "Yadav" || text === "BearerOP") {
          word.classList.add("italic", "font-instrument")
          word.classList.add("text-black")
          word.classList.add("dark:text-white")
        }
        if (text === "aka") {
          word.classList.add("text-sm")
        }
      })
    })
  }, [])

  return (
    <div className={cn("description", className)} ref={containerRef}>
      <h1 className="h1">{description}</h1>
      <Stylesheet />
    </div>
  )
}

function Stylesheet() {
  return (
    <style>{`
      .description {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        visibility: hidden;
      }

      .split-word {
        will-change: transform, opacity;
      }
    `}</style>
  )
}
