"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimatedTextProps {
  text: string
  className?: string
  startScroll?: number
  endScroll?: number
}

export function ScrollAnimatedText({ text, className, startScroll = 0, endScroll = 1000 }: ScrollAnimatedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [letters, setLetters] = useState<string[]>([])
  const scrollProgress = useMotionValue(0)
  
  // Custom scroll progress based on absolute scroll positions
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const progress = Math.max(0, Math.min(1, (scrollY - startScroll) / (endScroll - startScroll)))
      scrollProgress.set(progress)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [startScroll, endScroll, scrollProgress])
  
  useEffect(() => {
    // Split text into individual letters, preserving spaces
    setLetters(text.split(""))
  }, [text])

  return (
    <div ref={containerRef} className={cn("relative overflow-hidden flex items-center justify-center", className)}>
      <div className="flex">
        {letters.map((letter, index) => (
          <LetterAnimation
            key={index}
            letter={letter}
            index={index}
            totalLetters={letters.length}
            scrollProgress={scrollProgress}
          />
        ))}
      </div>
    </div>
  )
}

interface LetterAnimationProps {
  letter: string
  index: number
  totalLetters: number
  scrollProgress: any
}

function LetterAnimation({ letter, index, totalLetters, scrollProgress }: LetterAnimationProps) {
  // Calculate timing for each letter
  const letterDelay = index / totalLetters

  // Entry animation: letters appear one by one (0% to 30% of scroll)
  const entryStart = letterDelay * 0.25 // Stagger entry over first 25%
  const entryEnd = entryStart + 0.05 // Quick entry transition

  // Stay visible (30% to 60% of scroll - equivalent to ~100px)
  // const stayStart = 0.3
  // const stayEnd = 0.6

  // Exit animation: letters disappear one by one (60% to 90% of scroll)
  const exitStart = 0.6 + letterDelay * 0.25 // Stagger exit over 25%
  const exitEnd = exitStart + 0.05 // Quick exit transition

  const y = useTransform(
    scrollProgress,
    [0, entryStart, entryEnd, exitStart, exitEnd, 1],
    [20, 20, 0, 0, -20, -20], // Start below, move to center, stay, then move up and out
  )

  const opacity = useTransform(scrollProgress, [0, entryStart, entryEnd, exitStart, exitEnd, 1], [0, 0, 1, 1, 0, 0])

  return (
    <motion.span
      style={{
        y,
        opacity,
      }}
      className="inline-block font-serif text-4xl"
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  )
}
