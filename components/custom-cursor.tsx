"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const positionHistory = useRef<{ x: number; y: number }[]>([])
  const rafId = useRef<number>(0)
  const isVisibleRef = useRef(false)

  const cursorX = useSpring(0, { stiffness: 300, damping: 30 })
  const cursorY = useSpring(0, { stiffness: 300, damping: 30 })
  const trailX = useSpring(0, { stiffness: 150, damping: 25 })
  const trailY = useSpring(0, { stiffness: 150, damping: 25 })

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let mouseActive = false
    let mouseTimer: NodeJS.Timeout

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisibleRef.current) {
        isVisibleRef.current = true
        setIsVisible(true)
      }
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      trailX.set(e.clientX)
      trailY.set(e.clientY)

      positionHistory.current.unshift({ x: e.clientX, y: e.clientY })
      if (positionHistory.current.length > 20) {
        positionHistory.current.length = 20
      }
      mouseActive = true
      clearTimeout(mouseTimer)
      mouseTimer = setTimeout(() => { mouseActive = false }, 150)
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (mouseActive && isVisibleRef.current) {
        const history = positionHistory.current
        for (let i = 0; i < Math.min(8, history.length); i++) {
          const pos = history[i]
          const progress = i / 8
          const opacity = 0.6 * (1 - progress)
          const size = 5 * (1 - progress * 0.7)

          ctx.beginPath()
          ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 255, 136, ${opacity})`
          ctx.fill()
        }
      }

      rafId.current = requestAnimationFrame(drawParticles)
    }

    rafId.current = requestAnimationFrame(drawParticles)

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => {
      isVisibleRef.current = false
      setIsVisible(false)
    }
    const handleMouseEnter = () => {
      isVisibleRef.current = true
      setIsVisible(true)
    }

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

    const handleHoverEnd = () => setIsHovering(false)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(rafId.current)
      clearTimeout(mouseTimer)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
      window.removeEventListener("resize", handleResize)
    }
  }, [isMobile, cursorX, cursorY, trailX, trailY])

  if (isMobile) return null

  return (
    <>
      <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

      {/* Canvas-based particle trail — no React re-renders */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9997]"
      />

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
