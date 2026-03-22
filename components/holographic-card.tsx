"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
}

export function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  const rotateX = isHovered ? (mousePos.y - 0.5) * -20 : 0
  const rotateY = isHovered ? (mousePos.x - 0.5) * 20 : 0

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 800, transformStyle: "preserve-3d" }}
      className={`group relative ${className}`}
    >
      {/* Holographic gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `
              linear-gradient(
                ${130 + mousePos.x * 100}deg,
                rgba(0,255,136,0) 0%,
                rgba(0,255,136,0.08) ${mousePos.x * 40}%,
                rgba(0,212,255,0.12) ${mousePos.x * 60 + 20}%,
                rgba(255,121,198,0.08) ${mousePos.x * 80 + 30}%,
                rgba(241,250,140,0.05) ${mousePos.x * 100 + 40}%,
                rgba(0,255,136,0) 100%
              )
            `
            : "none",
        }}
      />

      {/* Prismatic shine */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `radial-gradient(
                circle at ${mousePos.x * 100}% ${mousePos.y * 100}%,
                rgba(255,255,255,0.1) 0%,
                transparent 50%
              )`
            : "none",
        }}
      />

      {/* Rainbow border effect */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: isHovered
            ? `linear-gradient(
                ${mousePos.x * 360}deg,
                #00ff88,
                #00d4ff,
                #ff79c6,
                #f1fa8c,
                #00ff88
              )`
            : "none",
          padding: "1px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />

      {children}
    </motion.div>
  )
}
