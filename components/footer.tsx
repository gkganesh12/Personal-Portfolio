"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MagneticButton } from "./magnetic-button"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
              <span className="text-white">GANESH</span>
              <span className="text-[#00ff88]">.EXE</span>
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
      </motion.div>
    </footer>
  )
}
