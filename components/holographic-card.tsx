"use client"

import { useRef, useCallback } from "react"

interface HolographicCardProps {
  children: React.ReactNode
  className?: string
}

export function HolographicCard({ children, className = "" }: HolographicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const rotX = (y - 0.5) * -20
    const rotY = (x - 0.5) * 20

    ref.current.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`

    if (overlayRef.current) {
      overlayRef.current.style.background = `linear-gradient(${130 + x * 100}deg, rgba(0,255,136,0) 0%, rgba(0,255,136,0.08) ${x * 40}%, rgba(0,212,255,0.12) ${x * 60 + 20}%, rgba(255,121,198,0.08) ${x * 80 + 30}%, rgba(0,255,136,0) 100%)`
      overlayRef.current.style.opacity = "1"
    }

    if (shineRef.current) {
      shineRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
      shineRef.current.style.opacity = "1"
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)"
    if (overlayRef.current) overlayRef.current.style.opacity = "0"
    if (shineRef.current) shineRef.current.style.opacity = "0"
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
      className={`group relative ${className}`}
    >
      {/* Holographic gradient overlay */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-lg opacity-0 transition-opacity duration-300"
      />

      {/* Prismatic shine */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 z-20 rounded-lg opacity-0 transition-opacity duration-300"
      />

      {children}
    </div>
  )
}
