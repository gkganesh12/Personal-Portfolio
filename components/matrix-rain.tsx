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

    canvas.width = width
    canvas.height = height

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン"
    const fontSize = 14
    const columns = Math.floor(width / fontSize)
    const drops: number[] = Array(columns).fill(1)
    const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.3)

    function draw() {
      ctx!.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx!.fillRect(0, 0, width, height)

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Head character - bright green
        ctx!.fillStyle = "#00ff88"
        ctx!.font = `${fontSize}px monospace`
        ctx!.globalAlpha = 0.8
        ctx!.fillText(char, x, y)

        // Trail characters - dimmer
        if (drops[i] > 1) {
          ctx!.fillStyle = "#00ff88"
          ctx!.globalAlpha = 0.15
          const trailChar = chars[Math.floor(Math.random() * chars.length)]
          ctx!.fillText(trailChar, x, y - fontSize)
        }

        ctx!.globalAlpha = 1

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i] += speeds[i]
      }

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
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.07]"
    />
  )
}
