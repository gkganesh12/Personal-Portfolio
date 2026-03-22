"use client"

import { useEffect, useRef } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let paused = false
    let frameCount = 0

    canvas.width = width
    canvas.height = height

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()アイウエオカキクケコサシスセソ"
    const fontSize = 16
    const columns = Math.floor(width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.3)

    // Pause when scrolled past hero
    const handleScroll = () => {
      paused = window.scrollY > window.innerHeight * 1.2
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    function draw() {
      // Throttle to ~20fps (skip 2 out of 3 frames)
      frameCount++
      if (frameCount % 3 !== 0) {
        animationId = requestAnimationFrame(draw)
        return
      }

      if (paused) {
        animationId = requestAnimationFrame(draw)
        return
      }

      ctx!.fillStyle = "rgba(0, 0, 0, 0.06)"
      ctx!.fillRect(0, 0, width, height)

      ctx!.fillStyle = "#00ff88"
      ctx!.font = `${fontSize}px monospace`
      ctx!.globalAlpha = 0.7

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx!.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i] += speeds[i]
      }

      ctx!.globalAlpha = 1
      animationId = requestAnimationFrame(draw)
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    window.addEventListener("resize", handleResize)
    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.07]"
    />
  )
}
