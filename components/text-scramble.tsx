"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useInView } from "framer-motion"

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

function getRandomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

interface TextScrambleProps {
  children: string
  trigger?: "hover" | "inView"
  duration?: number
  className?: string
}

export function TextScramble({
  children,
  trigger = "inView",
  duration = 1000,
  className,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(children)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const animatingRef = useRef(false)

  const scramble = useCallback(() => {
    if (animatingRef.current) return
    animatingRef.current = true

    const text = children
    const length = text.length
    const startTime = performance.now()

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Number of characters that have "locked in" from left to right
      const lockedCount = Math.floor(progress * length)

      let result = ""
      for (let i = 0; i < length; i++) {
        if (text[i] === " ") {
          result += " "
        } else if (i < lockedCount) {
          result += text[i]
        } else {
          result += getRandomChar()
        }
      }

      setDisplay(result)

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setDisplay(text)
        animatingRef.current = false
      }
    }

    requestAnimationFrame(step)
  }, [children, duration])

  // inView trigger
  useEffect(() => {
    if (trigger === "inView" && isInView) {
      scramble()
    }
  }, [trigger, isInView, scramble])

  const handleMouseEnter = trigger === "hover" ? scramble : undefined

  return (
    <span ref={ref} className={className} onMouseEnter={handleMouseEnter}>
      {display}
    </span>
  )
}
