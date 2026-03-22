"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSoundGlobal } from "./sound-toggle"
import {
  Trophy,
  Compass,
  Anchor,
  Terminal,
  Command,
  Gamepad2,
  BookOpen,
  Share2,
  Volume2,
  Lock,
  Check,
  X,
} from "lucide-react"

// ─── Achievement definitions ────────────────────────────────────────

interface Achievement {
  id: string
  name: string
  description: string
  icon: React.ElementType
  event?: string // custom event name (scroll-based ones have no event)
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "explorer",
    name: "Explorer",
    description: "Scrolled past 50% of the page",
    icon: Compass,
  },
  {
    id: "deep-diver",
    name: "Deep Diver",
    description: "Scrolled to the very bottom",
    icon: Anchor,
  },
  {
    id: "hacker",
    name: "Hacker",
    description: "Opened the interactive terminal",
    icon: Terminal,
    event: "achievement:terminal",
  },
  {
    id: "commander",
    name: "Commander",
    description: "Used the command palette Ctrl+K",
    icon: Command,
    event: "achievement:command-palette",
  },
  {
    id: "code-breaker",
    name: "Code Breaker",
    description: "Found the Konami easter egg",
    icon: Gamepad2,
    event: "achievement:konami",
  },
  {
    id: "reader",
    name: "Reader",
    description: "Visited the blog",
    icon: BookOpen,
    event: "achievement:blog",
  },
  {
    id: "networker",
    name: "Networker",
    description: "Clicked any social link",
    icon: Share2,
    event: "achievement:social",
  },
  {
    id: "sound-engineer",
    name: "Sound Engineer",
    description: "Enabled sound effects",
    icon: Volume2,
    event: "achievement:sound",
  },
]

const STORAGE_KEY = "portfolio-achievements"

// ─── Helpers ────────────────────────────────────────────────────────

function loadUnlocked(): Set<string> {
  if (typeof window === "undefined") return new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return new Set(JSON.parse(raw))
  } catch {
    // ignore
  }
  return new Set()
}

function saveUnlocked(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]))
  } catch {
    // ignore
  }
}

// ─── Toast notification ─────────────────────────────────────────────

function AchievementToast({
  achievement,
  onDone,
}: {
  achievement: Achievement
  onDone: () => void
}) {
  const Icon = achievement.icon

  useEffect(() => {
    const timer = setTimeout(onDone, 3000)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 320, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="pointer-events-auto flex items-center gap-3 rounded-lg border border-[#00ff88]/30 bg-black/90 px-4 py-3 font-mono text-sm backdrop-blur-md shadow-[0_0_20px_rgba(0,255,136,0.15)]"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#00ff88]/10">
        <Icon className="h-5 w-5 text-[#00ff88]" />
      </div>
      <div>
        <p className="text-[#00ff88] text-xs uppercase tracking-wider">
          Achievement Unlocked
        </p>
        <p className="text-white text-sm">{achievement.name}</p>
      </div>
    </motion.div>
  )
}

// ─── Achievement Panel ──────────────────────────────────────────────

function AchievementPanel({
  unlocked,
  onClose,
}: {
  unlocked: Set<string>
  onClose: () => void
}) {
  const count = unlocked.size

  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed right-4 top-20 z-[85] w-80 rounded-xl border border-white/10 bg-black/95 p-4 font-mono backdrop-blur-xl shadow-2xl"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-[#00ff88]" />
          <span className="text-sm text-white">Achievements</span>
        </div>
        <button
          onClick={onClose}
          className="rounded p-1 text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="mb-1 flex justify-between text-xs text-white/50">
          <span>{count}/8 Achievements Unlocked</span>
          <span>{Math.round((count / 8) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-[#00ff88]"
            initial={{ width: 0 }}
            animate={{ width: `${(count / 8) * 100}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-2">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.has(a.id)
          const Icon = a.icon
          return (
            <div
              key={a.id}
              className={`relative flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-all ${
                isUnlocked
                  ? "border-[#00ff88]/20 bg-[#00ff88]/5 shadow-[0_0_12px_rgba(0,255,136,0.08)]"
                  : "border-white/5 bg-white/[0.02] opacity-30"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`h-5 w-5 ${
                    isUnlocked ? "text-[#00ff88]" : "text-white/40"
                  }`}
                />
                {isUnlocked ? (
                  <Check className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-[#00ff88] p-[1px] text-black" />
                ) : (
                  <Lock className="absolute -right-1.5 -top-1.5 h-3 w-3 text-white/30" />
                )}
              </div>
              <span
                className={`text-[10px] leading-tight ${
                  isUnlocked ? "text-white" : "text-white/40"
                }`}
              >
                {a.name}
              </span>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Main Achievements component ────────────────────────────────────

export function Achievements() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [panelOpen, setPanelOpen] = useState(false)
  const [toastQueue, setToastQueue] = useState<Achievement[]>([])
  const unlockedRef = useRef<Set<string>>(new Set())

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadUnlocked()
    unlockedRef.current = loaded
    setUnlocked(new Set(loaded))
  }, [])

  // Unlock helper
  const unlock = useCallback((id: string) => {
    if (unlockedRef.current.has(id)) return
    const achievement = ACHIEVEMENTS.find((a) => a.id === id)
    if (!achievement) return

    unlockedRef.current = new Set([...unlockedRef.current, id])
    const next = new Set(unlockedRef.current)
    setUnlocked(next)
    saveUnlocked(next)
    playSoundGlobal("success")
    setToastQueue((prev) => [...prev, achievement])
  }, [])

  // Scroll tracking for Explorer and Deep Diver
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (docHeight <= 0) return
      const pct = scrollTop / docHeight

      if (pct >= 0.5) unlock("explorer")
      if (pct >= 0.98) unlock("deep-diver")
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [unlock])

  // Listen for custom events
  useEffect(() => {
    const eventMap: Record<string, string> = {}
    ACHIEVEMENTS.forEach((a) => {
      if (a.event) eventMap[a.event] = a.id
    })

    const handlers: Array<[string, () => void]> = Object.entries(eventMap).map(
      ([eventName, achievementId]) => {
        const handler = () => unlock(achievementId)
        window.addEventListener(eventName, handler)
        return [eventName, handler]
      }
    )

    return () => {
      handlers.forEach(([eventName, handler]) => {
        window.removeEventListener(eventName, handler)
      })
    }
  }, [unlock])

  // Remove toast after it finishes
  const dismissToast = useCallback(() => {
    setToastQueue((prev) => prev.slice(1))
  }, [])

  return (
    <>
      {/* Trophy button */}
      <button
        onClick={() => setPanelOpen((v) => !v)}
        className="fixed right-4 top-4 z-[85] flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-black/60 text-white/60 backdrop-blur-md transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] hover:shadow-[0_0_12px_rgba(0,255,136,0.12)]"
        aria-label="Achievements"
      >
        <Trophy className="h-4 w-4" />
        {unlocked.size > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#00ff88] font-mono text-[9px] font-bold text-black">
            {unlocked.size}
          </span>
        )}
      </button>

      {/* Panel */}
      <AnimatePresence>
        {panelOpen && (
          <AchievementPanel
            unlocked={unlocked}
            onClose={() => setPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Toast stack */}
      <div className="pointer-events-none fixed right-4 top-16 z-[100] flex flex-col gap-2">
        <AnimatePresence>
          {toastQueue.length > 0 && (
            <AchievementToast
              key={toastQueue[0].id}
              achievement={toastQueue[0]}
              onDone={dismissToast}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
