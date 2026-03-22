"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Search } from "lucide-react"
import { playSoundGlobal } from "./sound-toggle"
import { TextScramble } from "./text-scramble"

const navItems = [
  { label: "IDENTITY", href: "#identity" },
  { label: "ORIGIN", href: "#origin" },
  { label: "CAPABILITIES", href: "#capabilities" },
  { label: "DEPLOYMENTS", href: "#deployments" },
  { label: "LOGS", href: "#logs" },
  { label: "CONTACT", href: "#contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <a href="#identity" className="font-mono text-sm text-white">
            <TextScramble trigger="hover" duration={600}>GANESH.EXE</TextScramble>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onMouseEnter={() => playSoundGlobal("hover")}
                onClick={() => playSoundGlobal("click")}
                className="font-mono text-xs tracking-wider text-white/50 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Command palette trigger */}
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }))}
            className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-white/40 transition-colors hover:border-[#00ff88]/30 hover:text-white/60 md:flex"
            data-hover
          >
            <Search className="h-3 w-3" />
            <span>Search</span>
            <kbd className="ml-2 rounded border border-white/10 bg-white/5 px-1 text-[10px]">⌘K</kbd>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded border border-white/10 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-lg tracking-wider text-white/70 transition-colors hover:text-[#00ff88]"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
