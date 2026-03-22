"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { MagneticButton } from "./magnetic-button"
import { TextScramble } from "./text-scramble"

function useVisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    const STORAGE_KEY = "visitor_count"
    const SESSION_KEY = "visitor_counted"

    const currentCount = parseInt(localStorage.getItem(STORAGE_KEY) || "1336", 10)

    if (!sessionStorage.getItem(SESSION_KEY)) {
      const newCount = currentCount + 1
      localStorage.setItem(STORAGE_KEY, String(newCount))
      sessionStorage.setItem(SESSION_KEY, "true")
      setCount(newCount)
    } else {
      setCount(currentCount)
    }
  }, [])

  return count
}

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const visitorCount = useVisitorCounter()

  return (
    <footer ref={ref} className="relative border-t border-white/10 px-6 py-8">
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl"
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Logo/Name */}
          <MagneticButton strength={0.2}>
            <div className="font-mono text-sm text-white/40">
              <TextScramble trigger="inView" duration={800} className="text-white">GANESH.EXE</TextScramble>
              <span className="ml-2 text-white/30">v1.0.0</span>
            </div>
          </MagneticButton>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-white/40">
            {["IDENTITY", "ORIGIN", "CAPABILITIES", "DEPLOYMENTS", "LOGS"].map((item) => (
              <MagneticButton key={item} as="a" href={`#${item.toLowerCase()}`} strength={0.3}>
                <span className="transition-colors hover:text-[#00ff88]">{item}</span>
              </MagneticButton>
            ))}
          </nav>

          {/* Copyright */}
          <div className="font-mono text-xs text-white/30">
            &copy; {new Date().getFullYear()} All systems operational.
          </div>
        </div>

        {/* Visitor Counter */}
        {visitorCount !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex justify-center"
          >
            <div
              className="font-mono text-xs tracking-widest"
              style={{
                color: "#00ff88",
                textShadow: "0 0 7px #00ff88, 0 0 14px #00ff8844",
              }}
            >
              VISITOR #{String(visitorCount).padStart(6, "0")}
            </div>
          </motion.div>
        )}
      </motion.div>
    </footer>
  )
}
