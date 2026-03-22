"use client"

import { useState, useEffect, useRef } from "react"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "div"
  autoGlitch?: boolean
  autoGlitchInterval?: number
}

export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
  autoGlitch = false,
  autoGlitchInterval = 5000,
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAutoGlitching, setIsAutoGlitching] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!autoGlitch) return

    const trigger = () => {
      setIsAutoGlitching(true)
      // Glitch lasts 400-800ms randomly
      const duration = 400 + Math.random() * 400
      timeoutRef.current = setTimeout(() => {
        setIsAutoGlitching(false)
      }, duration)
    }

    const interval = setInterval(trigger, autoGlitchInterval)
    // First glitch after a short delay
    const initialDelay = setTimeout(trigger, 2000 + Math.random() * 1000)

    return () => {
      clearInterval(interval)
      clearTimeout(initialDelay)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [autoGlitch, autoGlitchInterval])

  const showGlitch = isHovered || isAutoGlitching

  // Extract shimmer classes to apply to inner text spans
  const shimmerClass = className.split(" ").filter(c => c.startsWith("shimmer-")).join(" ")
  const wrapperClass = className.split(" ").filter(c => !c.startsWith("shimmer-")).join(" ")

  return (
    <Tag
      className={`glitch-wrapper relative inline-block ${isAutoGlitching ? "glitching" : ""} ${wrapperClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
    >
      <span className={`relative z-10 ${shimmerClass}`}>{children}</span>
      {showGlitch && (
        <>
          <span
            className="glitch-layer-1 pointer-events-none absolute left-0 top-0 z-20"
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="glitch-layer-2 pointer-events-none absolute left-0 top-0 z-20"
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </Tag>
  )
}
