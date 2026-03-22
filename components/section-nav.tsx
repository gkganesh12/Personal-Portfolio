"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSoundGlobal } from "./sound-toggle"

const sections = [
  { label: "Identity", id: "identity" },
  { label: "Origin", id: "origin" },
  { label: "Capabilities", id: "capabilities" },
  { label: "Timeline", id: "timeline" },
  { label: "GitHub", id: "github-activity" },
  { label: "Deployments", id: "deployments" },
  { label: "Logs", id: "logs" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
]

export function SectionNav() {
  const [activeSection, setActiveSection] = useState<string>("")
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const visibilityMap = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio)
        })

        let maxRatio = 0
        let maxId = ""
        visibilityMap.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            maxId = id
          }
        })

        if (maxId) {
          setActiveSection(maxId)
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    )

    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[]

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
      {sections.map((section) => {
        const isActive = activeSection === section.id
        return (
          <div
            key={section.id}
            className="relative flex items-center"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip */}
            <AnimatePresence>
              {hoveredSection === section.id && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-full mr-3 whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 font-mono text-xs text-white/70"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <button
              onClick={() => { playSoundGlobal("click"); handleClick(section.id) }}
              aria-label={`Scroll to ${section.label}`}
              className="group flex items-center justify-center p-1"
            >
              <motion.span
                className="block rounded-full transition-colors duration-300"
                animate={{
                  width: isActive ? 12 : 6,
                  height: isActive ? 12 : 6,
                  backgroundColor: isActive
                    ? "#00ff88"
                    : "rgba(255,255,255,0.2)",
                  boxShadow: isActive
                    ? "0 0 8px #00ff88, 0 0 16px rgba(0,255,136,0.4)"
                    : "none",
                }}
                whileHover={
                  !isActive
                    ? { backgroundColor: "rgba(255,255,255,0.4)" }
                    : {}
                }
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        )
      })}
    </nav>
  )
}
