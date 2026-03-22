"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const techStack = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Node.js", icon: "nodejs" },
  { name: "Python", icon: "python" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "Docker", icon: "docker" },
  { name: "Kubernetes", icon: "kubernetes" },
  { name: "AWS", icon: "aws" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Redis", icon: "redis" },
  { name: "GraphQL", icon: "graphql" },
  { name: "Tailwind", icon: "tailwind" },
  { name: "Git", icon: "git" },
  { name: "Linux", icon: "linux" },
]

function TechIcon({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.15,
        y: -8,
        borderColor: "rgba(0,255,136,0.5)",
        boxShadow: "0 0 25px rgba(0,255,136,0.2)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-3 backdrop-blur-sm transition-colors"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded bg-white/5">
        <motion.span
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-xs text-[#00ff88]"
        >
          {"</>"}
        </motion.span>
      </div>
      <span className="font-mono text-sm text-white/80">{name}</span>
    </motion.div>
  )
}

export function TechMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 0])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-y border-white/5 bg-black/50 py-12"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-black to-transparent" />

      {/* Subtle glow */}
      <motion.div
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#00ff88]/5 via-transparent to-[#00ff88]/5"
      />

      {/* First row - scrolling with parallax */}
      <div className="mb-4 flex">
        <motion.div
          className="flex gap-4"
          style={{ x: x1 }}
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <TechIcon key={`${tech.name}-${i}`} name={tech.name} index={i} />
          ))}
        </motion.div>
      </div>

      {/* Second row - scrolling opposite direction */}
      <div className="flex">
        <motion.div
          className="flex gap-4"
          style={{ x: x2 }}
          animate={{ x: [-1920, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {[...techStack.slice().reverse(), ...techStack.slice().reverse(), ...techStack.slice().reverse()].map(
            (tech, i) => (
              <TechIcon key={`${tech.name}-rev-${i}`} name={tech.name} index={i} />
            )
          )}
        </motion.div>
      </div>
    </section>
  )
}
