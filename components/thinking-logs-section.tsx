"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import { TiltCard } from "./tilt-card"
import { TextReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

const logs = [
  {
    slug: "building-autonomous-cyber-defense-systems",
    id: "001",
    title: "Building Autonomous Cyber Defense Systems",
    excerpt:
      "Exploring the architecture behind self-healing security systems that detect, respond, and adapt to threats in real-time.",
    date: "2024.03.15",
    readTime: "8 min",
    tags: ["AI", "Security", "Architecture"],
  },
  {
    slug: "scaling-mern-applications-to-1m-users",
    id: "002",
    title: "Scaling MERN Applications to 1M Users",
    excerpt:
      "Lessons learned from scaling a full-stack application. Database sharding, caching strategies, and the art of horizontal scaling.",
    date: "2024.02.28",
    readTime: "12 min",
    tags: ["DevOps", "Backend", "Performance"],
  },
  {
    slug: "the-future-of-rag-systems",
    id: "003",
    title: "The Future of RAG Systems",
    excerpt:
      "How retrieval-augmented generation is changing the landscape of AI applications. Building context-aware intelligent systems.",
    date: "2024.02.10",
    readTime: "6 min",
    tags: ["AI", "LLM", "Engineering"],
  },
  {
    slug: "zero-trust-architecture-in-practice",
    id: "004",
    title: "Zero Trust Architecture in Practice",
    excerpt:
      "Implementing zero trust security models in modern cloud infrastructure. Trust nothing, verify everything.",
    date: "2024.01.22",
    readTime: "10 min",
    tags: ["Security", "Cloud", "Architecture"],
  },
]

export function ThinkingLogsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="logs"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{
          x: ["0%", "5%", "0%"],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="pointer-events-none absolute left-1/3 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-[#00ff88] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-header">{"// THINKING_LOGS"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            <TextReveal>Classified Thoughts</TextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            Declassified insights, technical deep-dives, and observations
            from the field. Not your average blog posts.
          </motion.p>
        </motion.div>

        {/* Logs list */}
        <div className="space-y-4">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -40, rotateY: -3 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.12,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <TiltCard>
                <Link href={`/blog/${log.slug}`}>
                  <article className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]">
                    {/* Hover reveal line */}
                    <motion.div
                      className="absolute left-0 top-0 h-full w-[2px] origin-top bg-[#00ff88]"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      {/* Main content */}
                      <div className="flex-1">
                        {/* Meta info */}
                        <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs">
                          <span className="text-[#00ff88]">[LOG_{log.id}]</span>
                          <span className="text-white/40">{log.date}</span>
                          <span className="flex items-center gap-1 text-white/40">
                            <Clock className="h-3 w-3" />
                            {log.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#00ff88] sm:text-xl">
                          {log.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="mb-4 text-sm leading-relaxed text-white/60">
                          {log.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {log.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              whileHover={{ scale: 1.1 }}
                              className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/50 transition-colors group-hover:border-[#00ff88]/20"
                            >
                              #{tag}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex items-center self-end sm:self-center">
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all group-hover:border-[#00ff88]/30 group-hover:bg-[#00ff88]/5"
                        >
                          <ArrowRight className="h-4 w-4 text-white/30 transition-all group-hover:text-[#00ff88]" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bottom glow on hover */}
                    <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-[#00ff88]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </article>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <MagneticButton as="a" href="/blog" strength={0.3}>
            <span className="inline-flex items-center gap-2 font-mono text-sm text-white/50 transition-colors hover:text-[#00ff88]">
              <span>{"[ ACCESS ALL LOGS \u2192"}</span>
              <span>{"]"}</span>
            </span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
