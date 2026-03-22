"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const codeLines = [
  { type: "comment", content: "// ganesh.config.ts" },
  { type: "keyword", content: "const " },
  { type: "variable", content: "developer" },
  { type: "operator", content: " = " },
  { type: "bracket", content: "{" },
  { type: "newline", content: "" },
  { type: "indent", content: "  " },
  { type: "property", content: "name" },
  { type: "operator", content: ": " },
  { type: "string", content: '"Ganesh Khetawat"' },
  { type: "operator", content: "," },
  { type: "newline", content: "" },
  { type: "indent", content: "  " },
  { type: "property", content: "role" },
  { type: "operator", content: ": " },
  { type: "string", content: '"Full Stack Developer"' },
  { type: "operator", content: "," },
  { type: "newline", content: "" },
  { type: "indent", content: "  " },
  { type: "property", content: "status" },
  { type: "operator", content: ": " },
  { type: "string", content: '"Building the future"' },
  { type: "operator", content: "," },
  { type: "newline", content: "" },
  { type: "indent", content: "  " },
  { type: "property", content: "passion" },
  { type: "operator", content: ": " },
  { type: "bracket", content: "[" },
  { type: "string", content: '"AI"' },
  { type: "operator", content: ", " },
  { type: "string", content: '"Cyber"' },
  { type: "operator", content: ", " },
  { type: "string", content: '"Innovation"' },
  { type: "bracket", content: "]" },
  { type: "newline", content: "" },
  { type: "bracket", content: "};" },
]

const colorMap: Record<string, string> = {
  comment: "text-white/40",
  keyword: "text-[#ff79c6]",
  variable: "text-[#50fa7b]",
  operator: "text-white/60",
  bracket: "text-white/80",
  property: "text-[#8be9fd]",
  string: "text-[#f1fa8c]",
  indent: "",
  newline: "",
}

export function CodeTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayedLines, setDisplayedLines] = useState<number>(0)

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setDisplayedLines((prev) => {
          if (prev >= codeLines.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 50)
      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-lg overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 font-mono text-xs text-white/40">ganesh.config.ts</span>
      </div>

      {/* Code content */}
      <div className="p-4 font-mono text-sm leading-relaxed">
        <pre className="whitespace-pre-wrap">
          {codeLines.slice(0, displayedLines).map((line, i) => {
            if (line.type === "newline") {
              return <br key={i} />
            }
            return (
              <span key={i} className={colorMap[line.type]}>
                {line.content}
              </span>
            )
          })}
          <span className="animate-pulse text-[#00ff88]">|</span>
        </pre>
      </div>
    </motion.div>
  )
}
