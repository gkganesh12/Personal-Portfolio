"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { playSoundGlobal } from "./sound-toggle"

const bootMessages = [
  { text: "Initializing neural interface...", icon: "[SYS]" },
  { text: "Mounting filesystem /dev/ganesh...", icon: "[FS ]" },
  { text: "Loading quantum processors...", icon: "[CPU]" },
  { text: "Allocating memory blocks...", icon: "[MEM]" },
  { text: "Establishing secure connection...", icon: "[NET]" },
  { text: "Verifying SSL certificates...", icon: "[SSL]" },
  { text: "Compiling visual cortex...", icon: "[GPU]" },
  { text: "Loading 3D particle engine...", icon: "[3D ]" },
  { text: "Injecting matrix overlay...", icon: "[VFX]" },
  { text: "Bootstrapping React runtime...", icon: "[JSX]" },
  { text: "Hydrating server components...", icon: "[SSR]" },
  { text: "Accessing GANESH.EXE...", icon: "[APP]" },
  { text: "All systems operational.", icon: "[ OK]" },
]

// ~2 seconds total: 13 messages × ~120ms each = ~1560ms + 300ms glitch/exit
const MESSAGE_INTERVAL = 120

// Fake system stats that update during boot
const systemStats = [
  "CPU: 4.2 GHz  |  MEM: 32GB  |  GPU: RTX 4090",
  "NETWORK: 1 Gbps  |  LATENCY: 2ms  |  STATUS: ONLINE",
]

export function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  useEffect(() => {
    if (currentMessage < bootMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => prev + 1)
      }, MESSAGE_INTERVAL)
      return () => clearTimeout(timer)
    } else {
      // Last message shown — glitch then exit
      const timer = setTimeout(() => {
        playSoundGlobal("success")
        setGlitchActive(true)
        setTimeout(() => {
          setIsComplete(true)
          setTimeout(onComplete, 300)
        }, 200)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [currentMessage, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Scanline effect */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-scanline absolute inset-x-0 h-px bg-[#00ff88]/10" />
          </div>

          {/* CRT vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.8) 100%)",
            }}
          />

          {/* Horizontal scan lines (CRT effect) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.1) 2px, rgba(0,255,136,0.1) 4px)",
            }}
          />

          {/* Glitch overlay */}
          {glitchActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0, 0.2, 0, 0.1, 0] }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-[#00ff88]/10"
            />
          )}

          {/* Terminal container */}
          <div className="w-full max-w-lg px-8">
            {/* Header bar */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-1 flex items-center justify-between"
            >
              <span className="font-mono text-xs text-[#00ff88]/50">
                GANESH.EXE BOOT SEQUENCE v1.0.0
              </span>
              <BootClock />
            </motion.div>

            {/* Top border */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 h-px w-full origin-left bg-gradient-to-r from-[#00ff88]/60 via-[#00d4ff]/40 to-[#00ff88]/60"
            />

            {/* System stats */}
            <div className="mb-4 space-y-1">
              {systemStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.2 }}
                  className="font-mono text-[10px] text-white/20"
                >
                  {stat}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-4 h-px w-full bg-white/5" />

            {/* Boot prompt */}
            <div className="mb-6 font-mono text-xs text-[#00ff88]/60">
              {">"} Booting GANESH.EXE...
            </div>

            {/* Messages log */}
            <div className="space-y-1.5 font-mono text-sm">
              {bootMessages.slice(0, currentMessage + 1).map((message, index) => {
                const isLast = index === bootMessages.length - 1
                const isCurrent = index === currentMessage

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className={`shrink-0 ${isLast && isCurrent ? "text-[#00ff88]" : "text-[#00ff88]/40"}`}>
                      {message.icon}
                    </span>
                    <span className={isLast && isCurrent ? "font-bold text-[#00ff88]" : isCurrent ? "text-white/80" : "text-white/40"}>
                      {message.text}
                    </span>
                    {!isCurrent && (
                      <span className="ml-auto shrink-0 font-mono text-xs text-[#00ff88]/30">✓</span>
                    )}
                    {isLast && isCurrent && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: [0, 1.3, 1] }}
                        transition={{ duration: 0.3 }}
                        className="ml-auto shrink-0 text-[#00ff88]"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Progress section */}
            <div className="mt-8">
              {/* Progress bar */}
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentMessage + 1) / bootMessages.length) * 100}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                    boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff88",
                  }}
                />
              </div>

              {/* Progress info */}
              <div className="mt-2 flex justify-between font-mono text-xs text-white/30">
                <span>
                  {Math.round(((currentMessage + 1) / bootMessages.length) * 100)}% complete
                </span>
                <span>
                  {currentMessage + 1}/{bootMessages.length} modules loaded
                </span>
              </div>

              {/* Elapsed time */}
              <ElapsedTime />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function BootClock() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString())
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.span
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="font-mono text-xs text-[#00ff88]/40"
    >
      {time}
    </motion.span>
  )
}

function ElapsedTime() {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed((prev) => prev + 100)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mt-1 text-right font-mono text-[10px] text-white/15">
      {(elapsed / 1000).toFixed(1)}s elapsed
    </div>
  )
}
