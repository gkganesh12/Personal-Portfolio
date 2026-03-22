"use client"

import { cn } from "@/lib/utils"

interface GradientBorderProps {
  children: React.ReactNode
  className?: string
  borderWidth?: number
  speed?: number
}

export function GradientBorder({
  children,
  className,
  borderWidth = 1,
  speed = 3,
}: GradientBorderProps) {
  return (
    <div className={cn("relative rounded-xl p-[var(--border-width)]", className)}
      style={{ "--border-width": `${borderWidth}px` } as React.CSSProperties}
    >
      {/* Rotating gradient border */}
      <div
        className="absolute inset-0 rounded-xl overflow-hidden"
        style={{ padding: borderWidth }}
      >
        <div
          className="absolute inset-[-50%] animate-gradient-rotate"
          style={{
            background: "conic-gradient(from 0deg, #00ff88, #00d4ff, #ff00ff, #00ff88)",
            animationDuration: `${speed}s`,
          }}
        />
      </div>

      {/* Glow effect behind the border */}
      <div
        className="absolute inset-0 rounded-xl opacity-40 blur-md"
        style={{
          background: "conic-gradient(from 0deg, #00ff88, #00d4ff, #ff00ff, #00ff88)",
        }}
      />

      {/* Inner content with dark background to create border illusion */}
      <div className="relative rounded-xl bg-[#0a0a0a]">
        {children}
      </div>
    </div>
  )
}
