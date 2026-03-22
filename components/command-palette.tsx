"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { playSoundGlobal } from "./sound-toggle"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  User,
  Code2,
  Briefcase,
  BookOpen,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Terminal,
  Zap,
  Home,
} from "lucide-react"

const commands = [
  { id: "home", label: "Go to Home", icon: Home, action: "#identity", group: "Navigation" },
  { id: "origin", label: "About Me", icon: User, action: "#origin", group: "Navigation" },
  { id: "capabilities", label: "Skills & Capabilities", icon: Code2, action: "#capabilities", group: "Navigation" },
  { id: "deployments", label: "Projects & Deployments", icon: Briefcase, action: "#deployments", group: "Navigation" },
  { id: "logs", label: "Blog & Thinking Logs", icon: BookOpen, action: "#logs", group: "Navigation" },
  { id: "contact", label: "Contact Me", icon: Mail, action: "#contact", group: "Navigation" },
  { id: "github", label: "Open GitHub", icon: Github, action: "https://github.com/gkganesh12", group: "Social", external: true },
  { id: "linkedin", label: "Open LinkedIn", icon: Linkedin, action: "https://www.linkedin.com/in/ganeshkhetawat/", group: "Social", external: true },
  { id: "twitter", label: "Open Twitter/X", icon: Twitter, action: "https://x.com/gkganesh01", group: "Social", external: true },
  { id: "terminal", label: "Open Terminal", icon: Terminal, action: "terminal", group: "Actions" },
]

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  )

  // Keep refs in sync to avoid stale closures
  const filteredRef = useRef(filteredCommands)
  filteredRef.current = filteredCommands
  const selectedRef = useRef(selectedIndex)
  selectedRef.current = selectedIndex

  const groups = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.group]) acc[cmd.group] = []
    acc[cmd.group].push(cmd)
    return acc
  }, {} as Record<string, typeof commands>)

  const executeCommand = useCallback((command: (typeof commands)[0]) => {
    playSoundGlobal("click")
    setIsOpen(false)
    setSearch("")

    if (command.action === "terminal") {
      window.dispatchEvent(new CustomEvent("open-terminal"))
      return
    }

    if ((command as any).external) {
      window.open(command.action, "_blank")
    } else {
      const el = document.querySelector(command.action)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const selected = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
    if (selected) {
      selected.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen((prev) => {
          if (!prev) {
            playSoundGlobal("click")
            window.dispatchEvent(new CustomEvent("achievement:command-palette"))
          }
          return !prev
        })
        setSearch("")
        setSelectedIndex(0)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Separate handler for navigation keys — only active when open
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const filtered = filteredRef.current
      const selected = selectedRef.current

      if (e.key === "Escape") {
        setIsOpen(false)
        setSearch("")
      }

      if (e.key === "ArrowDown") {
        e.preventDefault()
        playSoundGlobal("hover")
        setSelectedIndex(selected < filtered.length - 1 ? selected + 1 : 0)
      }

      if (e.key === "ArrowUp") {
        e.preventDefault()
        playSoundGlobal("hover")
        setSelectedIndex(selected > 0 ? selected - 1 : filtered.length - 1)
      }

      if (e.key === "Enter" && filtered[selected]) {
        executeCommand(filtered[selected])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, executeCommand])

  // Stop Lenis smooth scroll when palette is open
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (!lenis) return
    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [isOpen])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  let flatIndex = -1

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsOpen(false)
              setSearch("")
            }}
          />

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed left-1/2 top-[20%] z-[101] w-full max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_0_60px_rgba(0,255,136,0.1)]"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-5 w-5 text-white/40" />
              <input
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/30"
                autoFocus
              />
              <kbd className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/40">
                ESC
              </kbd>
            </div>

            {/* Commands list */}
            <div
              ref={listRef}
              className="max-h-[300px] overflow-y-auto overscroll-contain p-2"
              onWheel={(e) => e.stopPropagation()}
            >
              {Object.entries(groups).map(([group, cmds]) => (
                <div key={group}>
                  <div className="px-3 py-2 font-mono text-xs text-white/30">
                    {group}
                  </div>
                  {cmds.map((cmd) => {
                    flatIndex++
                    const currentIndex = flatIndex
                    return (
                      <button
                        key={cmd.id}
                        data-index={currentIndex}
                        onClick={() => executeCommand(cmd)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                          currentIndex === selectedIndex
                            ? "bg-[#00ff88]/10 text-[#00ff88]"
                            : "text-white/70 hover:bg-white/5"
                        }`}
                      >
                        <cmd.icon className="h-4 w-4 shrink-0" />
                        <span className="font-mono text-sm">{cmd.label}</span>
                        {currentIndex === selectedIndex && (
                          <motion.div
                            layoutId="cmd-highlight"
                            className="ml-auto font-mono text-xs text-[#00ff88]/60"
                          >
                            Enter
                          </motion.div>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
              {filteredCommands.length === 0 && (
                <div className="px-3 py-8 text-center font-mono text-sm text-white/30">
                  No commands found
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2">
              <div className="flex items-center gap-4 font-mono text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-white/10 bg-white/5 px-1">↵</kbd> Select
                </span>
              </div>
              <span className="font-mono text-xs text-[#00ff88]/40">
                <Zap className="inline h-3 w-3" /> GANESH.EXE
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
