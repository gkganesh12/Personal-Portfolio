"use client"

import { useRef, useCallback } from "react"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  glareEnabled?: boolean
}

export function TiltCard({ children, className = "", glareEnabled = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const maxRotate = 15

    const rotX = (y - 0.5) * -maxRotate
    const rotY = (x - 0.5) * maxRotate

    ref.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`

    if (glareRef.current) {
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(0,255,136,0.15) 0%, transparent 60%)`
      glareRef.current.style.opacity = "1"
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    if (glareRef.current) {
      glareRef.current.style.opacity = "0"
    }
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.15s ease-out" }}
      className={`relative ${className}`}
    >
      {children}
      {glareEnabled && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300"
        />
      )}
    </div>
  )
}
