"use client"

import { useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSoundGlobal } from "./sound-toggle"

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
]

export function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([])

  const emojis = ["🚀", "⚡", "💻", "🔥", "✨", "🎮", "👾", "🤖", "💎", "🌟", "🎯", "⭐"]

  const triggerCelebration = useCallback(() => {
    playSoundGlobal("success")
    setIsActivated(true)
    window.dispatchEvent(new CustomEvent("achievement:konami"))

    // Create explosion particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }))
    setParticles(newParticles)

    setTimeout(() => {
      setIsActivated(false)
      setParticles([])
    }, 4000)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setInputSequence((prev) => {
        const newSequence = [...prev, e.key].slice(-KONAMI_CODE.length)

        if (newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, i) => key === KONAMI_CODE[i])) {
          setTimeout(triggerCelebration, 0)
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [triggerCelebration])

  return (
    <AnimatePresence>
      {isActivated && (
        <>
          {/* Screen flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none fixed inset-0 z-[200] bg-[#00ff88]"
          />

          {/* Achievement popup */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed left-1/2 top-1/2 z-[201] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#00ff88]/50 bg-black/90 p-8 text-center shadow-[0_0_80px_rgba(0,255,136,0.3)] backdrop-blur-xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="mb-4 text-6xl"
            >
              🏆
            </motion.div>
            <h3 className="mb-2 font-mono text-xl font-bold text-[#00ff88]">
              ACHIEVEMENT UNLOCKED!
            </h3>
            <p className="font-mono text-sm text-white/60">
              You found the secret Konami Code!
            </p>
            <p className="mt-2 font-mono text-xs text-[#00ff88]/60">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>
          </motion.div>

          {/* Particle explosion */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: particle.x,
                y: particle.y,
                scale: [0, 1.5, 1],
                opacity: [1, 1, 0],
                rotate: Math.random() * 720 - 360,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: "easeOut",
              }}
              className="pointer-events-none fixed z-[202] text-3xl"
            >
              {particle.emoji}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
