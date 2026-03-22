"use client"

import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react"
import { Volume2, VolumeX } from "lucide-react"

type SoundType = "click" | "hover" | "success" | "error"

interface SoundContextValue {
  enabled: boolean
  playSound: (type: SoundType) => void
}

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  playSound: () => {},
})

export function useSound() {
  return useContext(SoundContext)
}

function synthesizeSound(ctx: AudioContext, type: SoundType) {
  const now = ctx.currentTime

  switch (type) {
    case "click": {
      // Short sci-fi blip
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(1200, now)
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06)
      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.06)
      break
    }
    case "hover": {
      // Subtle high-frequency tick
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = "sine"
      osc.frequency.setValueAtTime(2400, now)
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.04)
      gain.gain.setValueAtTime(0.04, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.04)
      break
    }
    case "success": {
      // Ascending two-tone sci-fi chime
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      const gain2 = ctx.createGain()
      osc1.type = "sine"
      osc1.frequency.setValueAtTime(600, now)
      osc1.frequency.exponentialRampToValueAtTime(900, now + 0.08)
      gain1.gain.setValueAtTime(0.07, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
      osc1.connect(gain1).connect(ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.08)

      osc2.type = "triangle"
      osc2.frequency.setValueAtTime(900, now + 0.06)
      osc2.frequency.exponentialRampToValueAtTime(1400, now + 0.15)
      gain2.gain.setValueAtTime(0.001, now)
      gain2.gain.setValueAtTime(0.06, now + 0.06)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.15)
      osc2.connect(gain2).connect(ctx.destination)
      osc2.start(now + 0.06)
      osc2.stop(now + 0.15)
      break
    }
    case "error": {
      // Descending two-tone buzz
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      const gain2 = ctx.createGain()
      osc1.type = "sawtooth"
      osc1.frequency.setValueAtTime(400, now)
      osc1.frequency.exponentialRampToValueAtTime(200, now + 0.1)
      gain1.gain.setValueAtTime(0.05, now)
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
      osc1.connect(gain1).connect(ctx.destination)
      osc1.start(now)
      osc1.stop(now + 0.1)

      osc2.type = "square"
      osc2.frequency.setValueAtTime(250, now + 0.05)
      osc2.frequency.exponentialRampToValueAtTime(120, now + 0.14)
      gain2.gain.setValueAtTime(0.001, now)
      gain2.gain.setValueAtTime(0.04, now + 0.05)
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14)
      osc2.connect(gain2).connect(ctx.destination)
      osc2.start(now + 0.05)
      osc2.stop(now + 0.14)
      break
    }
  }
}

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-sound")
    if (stored === "on") {
      setEnabled(true)
    }
  }, [])

  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext()
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [])

  const playSound = useCallback(
    (type: SoundType) => {
      if (!enabled) return
      try {
        const ctx = getAudioContext()
        synthesizeSound(ctx, type)
      } catch {
        // Silently fail if audio is not available
      }
    },
    [enabled, getAudioContext]
  )

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      localStorage.setItem("portfolio-sound", next ? "on" : "off")
      if (next) {
        window.dispatchEvent(new CustomEvent("achievement:sound"))
        // Play a quick click so the user hears it turned on
        try {
          const ctx = getAudioContext()
          synthesizeSound(ctx, "click")
        } catch {
          // ignore
        }
      }
      return next
    })
  }, [getAudioContext])

  return (
    <SoundContext.Provider value={{ enabled, playSound }}>
      {children}
      <SoundToggleButton enabled={enabled} toggle={toggle} />
    </SoundContext.Provider>
  )
}

function SoundToggleButton({ enabled, toggle }: { enabled: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      aria-label={enabled ? "Mute sounds" : "Enable sounds"}
      className="fixed bottom-[4.5rem] left-6 z-[90] hidden items-center justify-center rounded-lg border border-white/10 bg-black/60 p-2 font-mono text-white/40 backdrop-blur-lg transition-colors hover:text-[#00ff88] md:flex"
    >
      {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  )
}

export function SoundToggle() {
  // This is a no-op component for backward compatibility.
  // The actual toggle is rendered by SoundProvider.
  return null
}

// Global sound helper — works without React context
// Components can import and call this directly
let globalAudioCtx: AudioContext | null = null

export function playSoundGlobal(type: SoundType) {
  if (typeof window === "undefined") return
  if (localStorage.getItem("portfolio-sound") !== "on") return
  try {
    if (!globalAudioCtx) globalAudioCtx = new AudioContext()
    if (globalAudioCtx.state === "suspended") globalAudioCtx.resume()
    synthesizeSound(globalAudioCtx, type)
  } catch {
    // ignore
  }
}
