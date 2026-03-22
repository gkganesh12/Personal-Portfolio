"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, useSpring } from "framer-motion"

const PARTICLE_COUNT = 10

interface Particle {
  x: number
  y: number
  opacity: number
  size: number
}

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [particles, setParticles] = useState<Particle[]>([])

  const positionHistory = useRef<{ x: number; y: number }[]>([])

  const cursorX = useSpring(0, { stiffness: 300, damping: 30 })
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 })
  const trailX = useSpring(0, { stiffness: 150, damping: 25 })
  const trailY = useSpring(0, { stiffness: 150, damping: 25 })

  const updateParticles = useCallback(() => {
    const history = positionHistory.current
    if (history.length === 0) return

    const newParticles: Particle[] = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const historyIndex = Math.min(
        Math.floor((i / PARTICLE_COUNT) * history.length),
        history.length - 1
      )
      const pos = history[historyIndex]
      const progress = i / PARTICLE_COUNT
      newParticles.push({
        x: pos.x,
        y: pos.y,
        opacity: 0.8 * (1 - progress),
        size: 6 * (1 - progress * 0.7),
      })
    }
    setParticles(newParticles)
  }, [])

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)

    let rafId: number

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true)
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)

      positionHistory.current.unshift({ x: e.clientX, y: e.clientY })
      if (positionHistory.current.length > 30) {
        positionHistory.current.length = 30
      }
    }

    const animateParticles = () => {
      updateParticles()
      rafId = requestAnimationFrame(animateParticles)
    }
    rafId = requestAnimationFrame(animateParticles)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-hover]") ||
        target.closest(".card-hover")
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => {
      setIsHovering(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [cursorX, cursorY, trailX, trailY, updateParticles])

  if (isMobile) return null

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

      {/* Glowing particle trail */}
      {isVisible &&
        particles.map((particle, i) => (
          <div
            key={i}
            className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full"
            style={{
              transform: `translate(${particle.x - particle.size / 2}px, ${particle.y - particle.size / 2}px)`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: "#00ff88",
              opacity: particle.opacity,
              boxShadow: `0 0 ${4 + particle.size}px rgba(0, 255, 136, ${particle.opacity * 0.6}), 0 0 ${8 + particle.size}px rgba(0, 255, 136, ${particle.opacity * 0.3})`,
              transition: "opacity 0.1s ease-out",
            }}
          />
        ))}

      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      >
        <div className="h-3 w-3 rounded-full bg-[#00ff88]" />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
        }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="h-10 w-10 rounded-full border border-[#00ff88]/60"
          style={{
            boxShadow: isHovering
              ? "0 0 20px rgba(0,255,136,0.3), inset 0 0 20px rgba(0,255,136,0.1)"
              : "none",
          }}
        />
      </motion.div>
    </>
  )
}
