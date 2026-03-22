"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    ;(window as any).__lenis = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle anchor links with smooth scroll
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute("href")
        if (href && href !== "#") {
          e.preventDefault()
          const el = document.querySelector(href)
          if (el) {
            lenis.scrollTo(el as HTMLElement, { offset: -80 })
          }
        }
      }
    }

    document.addEventListener("click", handleAnchorClick)

    // Stop/start Lenis when modals open/close
    const handleStop = () => lenis.stop()
    const handleStart = () => lenis.start()
    window.addEventListener("lenis-stop", handleStop)
    window.addEventListener("lenis-start", handleStart)

    return () => {
      lenis.destroy()
      document.removeEventListener("click", handleAnchorClick)
      window.removeEventListener("lenis-stop", handleStop)
      window.removeEventListener("lenis-start", handleStart)
    }
  }, [])

  return <>{children}</>
}
