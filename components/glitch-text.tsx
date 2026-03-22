"use client"

import { useState } from "react"

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
  as?: "h1" | "h2" | "h3" | "span" | "div"
}

export function GlitchText({ children, className = "", as: Tag = "span" }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Extract shimmer classes to apply to inner text spans
  const shimmerClass = className.split(" ").filter(c => c.startsWith("shimmer-")).join(" ")
  const wrapperClass = className.split(" ").filter(c => !c.startsWith("shimmer-")).join(" ")

  return (
    <Tag
      className={`glitch-wrapper relative inline-block ${wrapperClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hover
    >
      <span className={`relative z-10 ${shimmerClass}`}>{children}</span>
      {isHovered && (
        <>
          <span
            className={`glitch-layer-1 pointer-events-none absolute left-0 top-0 z-20 ${shimmerClass}`}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className={`glitch-layer-2 pointer-events-none absolute left-0 top-0 z-20 ${shimmerClass}`}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </Tag>
  )
}
