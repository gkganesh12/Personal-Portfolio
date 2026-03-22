"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Minus, Square } from "lucide-react"
import { playSoundGlobal } from "./sound-toggle"

const COMMANDS: Record<string, string | string[]> = {
  help: [
    "Available commands:",
    "  help          - Show this help message",
    "  about         - Who is Ganesh?",
    "  skills        - Technical capabilities",
    "  projects      - View deployments",
    "  contact       - Get in touch",
    "  socials       - Social media links",
    "  experience    - Work experience",
    "  education     - Educational background",
    "  whoami        - System identity",
    "  neofetch      - System information",
    "  matrix        - Enter the matrix",
    "  clear         - Clear terminal",
    "  sudo hire-me  - You know you want to",
    "",
    "  Type any command to explore...",
  ],
  about: [
    "┌──────────────────────────────────────┐",
    "│          GANESH KHETAWAT             │",
    "│      Full Stack Developer & AI       │",
    "│         Systems Architect            │",
    "├──────────────────────────────────────┤",
    "│                                      │",
    "│  A passionate engineer who builds    │",
    "│  AI-powered systems, scalable APIs,  │",
    "│  and cybersecurity solutions.        │",
    "│                                      │",
    "│  Turning coffee into code since      │",
    "│  the early days of curiosity.        │",
    "│                                      │",
    "└──────────────────────────────────────┘",
  ],
  skills: [
    "╔══════════════════════════════════════╗",
    "║         TECHNICAL ARSENAL            ║",
    "╠══════════════════════════════════════╣",
    "║ Frontend  │ React, Next.js, TS      ║",
    "║ Backend   │ Node, Python, Go        ║",
    "║ AI/ML     │ TF, PyTorch, LangChain  ║",
    "║ DevOps    │ Docker, K8s, AWS        ║",
    "║ Security  │ PenTest, OWASP, ZT      ║",
    "║ Database  │ PostgreSQL, MongoDB     ║",
    "╚══════════════════════════════════════╝",
  ],
  projects: [
    "[001] NEURAL_GUARD   - AI Threat Detection     [ACTIVE]",
    "[002] SYNAPSE        - Task Orchestrator        [ACTIVE]",
    "[003] CIPHER_CHAT    - E2E Encrypted Messenger  [DEPLOYED]",
    "[004] QUANTUM_PARSE  - Document Processor       [ACTIVE]",
    "",
    "Run 'projects --detail <id>' for more info",
  ],
  contact: [
    "📧 Email:    gkganesh448@gmail.com",
    "🔗 GitHub:   github.com/gkganesh12",
    "💼 LinkedIn: linkedin.com/in/ganeshkhetawat",
    "🐦 Twitter:  x.com/gkganesh01",
    "",
    "Type 'socials' for clickable links",
  ],
  socials: [
    "→ GitHub:   https://github.com/gkganesh12",
    "→ LinkedIn: https://www.linkedin.com/in/ganeshkhetawat/",
    "→ Twitter:  https://x.com/gkganesh01",
    "→ Email:    mailto:gkganesh448@gmail.com",
  ],
  experience: [
    "┌─ WORK EXPERIENCE ──────────────────────┐",
    "│                                         │",
    "│  ◆ Senior Full Stack Developer          │",
    "│    Building scalable AI systems         │",
    "│    2022 - Present                       │",
    "│                                         │",
    "│  ◆ Full Stack Developer                 │",
    "│    Enterprise web applications          │",
    "│    2020 - 2022                          │",
    "│                                         │",
    "│  ◆ Junior Developer                     │",
    "│    Started the coding journey           │",
    "│    2019 - 2020                          │",
    "│                                         │",
    "└─────────────────────────────────────────┘",
  ],
  education: [
    "🎓 B.Tech in Computer Science",
    "   Focus: AI & Machine Learning",
    "",
    "📚 Certifications:",
    "   • AWS Solutions Architect",
    "   • Google Cloud Professional",
    "   • Certified Ethical Hacker (CEH)",
  ],
  whoami: "ganesh@portfolio:~$ root (just kidding... or am I? 👀)",
  neofetch: [
    "        ██████████          ganesh@GANESH.EXE",
    "      ██░░░░░░░░██         ─────────────────────",
    "    ██░░████████░░██       OS: Developer OS v5.0",
    "    ██░░██    ██░░██       Host: The Internet",
    "    ██░░████████░░██       Kernel: JavaScript V8",
    "    ██░░░░░░░░░░░░██       Shell: Next.js 16",
    "    ██░░████████░░██       Terminal: This one!",
    "    ██░░██    ██░░██       CPU: Brain @ 3.0GHz",
    "    ██░░████████░░██       Memory: Caffeinated",
    "      ██░░░░░░░░██         Uptime: 5+ years",
    "        ██████████          Packages: 50+",
  ],
  matrix: [
    "Wake up, Neo...",
    "The Matrix has you...",
    "Follow the white rabbit.",
    "",
    "🐇 Knock, knock...",
  ],
  "sudo hire-me": [
    "🔓 Access granted!",
    "",
    "✅ Initiating hiring protocol...",
    "✅ Loading awesome developer...",
    "✅ Preparing to build amazing things...",
    "",
    "💚 Let's create something extraordinary together!",
    "📧 Reach out: gkganesh448@gmail.com",
  ],
}

interface TerminalLine {
  type: "input" | "output"
  content: string
}

export function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false)
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "GANESH.EXE Terminal v1.0.0" },
    { type: "output", content: 'Type "help" for available commands.' },
    { type: "output", content: "" },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOpenTerminal = () => {
      setIsOpen(true)
      playSoundGlobal("success")
      window.dispatchEvent(new CustomEvent("achievement:terminal"))
    }
    window.addEventListener("open-terminal", handleOpenTerminal)
    return () => window.removeEventListener("open-terminal", handleOpenTerminal)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
    const lenis = (window as any).__lenis
    if (!lenis) return
    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [isOpen])

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `ganesh@portfolio:~$ ${cmd}` },
    ]

    if (trimmed === "clear") {
      setLines([])
      return
    }

    const response = COMMANDS[trimmed]
    if (response) {
      if (Array.isArray(response)) {
        response.forEach((line) => {
          newLines.push({ type: "output", content: line })
        })
      } else {
        newLines.push({ type: "output", content: response })
      }
    } else if (trimmed === "") {
      // do nothing
    } else {
      newLines.push({
        type: "output",
        content: `Command not found: ${cmd}. Type "help" for available commands.`,
      })
    }

    newLines.push({ type: "output", content: "" })
    setLines(newLines)
    setHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
  }, [lines])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      playSoundGlobal("click")
      executeCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setInput("")
        } else {
          setHistoryIndex(newIndex)
          setInput(history[newIndex])
        }
      }
    }
  }

  return (
    <>
      {/* Terminal toggle button */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          playSoundGlobal("success")
          window.dispatchEvent(new CustomEvent("achievement:terminal"))
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full border border-[#00ff88]/30 bg-black/80 text-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.2)] backdrop-blur-lg transition-all hover:border-[#00ff88]/60 hover:shadow-[0_0_30px_rgba(0,255,136,0.3)]"
        aria-label="Open terminal"
      >
        <span className="font-mono text-lg">{">_"}</span>
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-[95] w-[95vw] max-w-xl overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/95 shadow-[0_0_60px_rgba(0,255,136,0.1)] backdrop-blur-xl sm:bottom-6 sm:right-6"
            style={{ cursor: "auto" }}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ff5f56] transition-colors"
                >
                  <X className="h-2 w-2 text-[#ff5f56] opacity-0 group-hover:text-[#4a0002] group-hover:opacity-100" />
                </button>
                <button className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#ffbd2e]">
                  <Minus className="h-2 w-2 text-[#ffbd2e] opacity-0 group-hover:text-[#4a3200] group-hover:opacity-100" />
                </button>
                <button className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#27c93f]">
                  <Square className="h-1.5 w-1.5 text-[#27c93f] opacity-0 group-hover:text-[#004a00] group-hover:opacity-100" />
                </button>
              </div>
              <span className="font-mono text-xs text-white/40">
                ganesh@portfolio: ~
              </span>
              <div className="w-14" />
            </div>

            {/* Terminal content */}
            <div
              ref={scrollRef}
              className="h-[50vh] max-h-[400px] overflow-y-auto overscroll-contain p-4 font-mono text-sm"
              onWheel={(e) => e.stopPropagation()}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap ${
                    line.type === "input" ? "text-[#00ff88]" : "text-white/70"
                  }`}
                >
                  {line.content}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-0">
                <span className="text-[#00ff88]">ganesh@portfolio:~$&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-white outline-none caret-[#00ff88]"
                  spellCheck={false}
                  autoComplete="off"
                  style={{ cursor: "text" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
