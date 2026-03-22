"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GitCommit, GitPullRequest, GitMerge, Star } from "lucide-react"
import { TiltCard } from "./tilt-card"

const activities = [
  {
    type: "commit",
    repo: "ai-agent-framework",
    message: "feat: add streaming response handler",
    time: "2 hours ago",
    icon: GitCommit,
  },
  {
    type: "pr",
    repo: "neural-network-lib",
    message: "refactor: optimize matrix operations",
    time: "5 hours ago",
    icon: GitPullRequest,
  },
  {
    type: "merge",
    repo: "cyber-security-toolkit",
    message: "Merged: implement zero-trust auth",
    time: "1 day ago",
    icon: GitMerge,
  },
  {
    type: "star",
    repo: "open-source-contrib",
    message: "Starred by 500+ developers",
    time: "2 days ago",
    icon: Star,
  },
]

const contributionGrid = Array.from({ length: 52 * 7 }, (_, i) => {
  const rand = Math.random()
  if (rand > 0.7) return 4
  if (rand > 0.5) return 3
  if (rand > 0.3) return 2
  if (rand > 0.15) return 1
  return 0
})

const levelColors = [
  "bg-white/5",
  "bg-[#00ff88]/20",
  "bg-[#00ff88]/40",
  "bg-[#00ff88]/60",
  "bg-[#00ff88]/80",
]

export function GithubActivity() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="section-header">{"// SYSTEM LOGS"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
            Recent Activity
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contribution graph with tilt */}
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#00ff88]/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)]">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-mono text-sm text-white/60">Contribution Matrix</h3>
                  <motion.span
                    animate={isInView ? { opacity: [0, 1] } : {}}
                    transition={{ delay: 0.5 }}
                    className="font-mono text-xs text-[#00ff88]"
                  >
                    1,247 commits
                  </motion.span>
                </div>
                <div className="flex flex-wrap gap-[3px]">
                  {contributionGrid.map((level, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.2,
                        delay: Math.min(i * 0.002, 1),
                        ease: "easeOut",
                      }}
                      whileHover={{
                        scale: 2,
                        zIndex: 10,
                        boxShadow: level > 0 ? "0 0 8px rgba(0,255,136,0.5)" : "none",
                      }}
                      className={`h-[10px] w-[10px] rounded-sm ${levelColors[level]} transition-shadow`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <span className="font-mono text-xs text-white/40">Less</span>
                  {levelColors.map((color, i) => (
                    <div key={i} className={`h-[10px] w-[10px] rounded-sm ${color}`} />
                  ))}
                  <span className="font-mono text-xs text-white/40">More</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Activity feed with tilt */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotateY: 5 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <TiltCard>
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 hover:border-[#00ff88]/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)]">
                <h3 className="mb-4 font-mono text-sm text-white/60">Latest Commits</h3>
                <div className="space-y-4">
                  {activities.map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                      whileHover={{
                        x: 4,
                        borderColor: "rgba(0,255,136,0.3)",
                        transition: { duration: 0.2 },
                      }}
                      className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 transition-all"
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.5 }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[#00ff88]/10"
                      >
                        <activity.icon className="h-4 w-4 text-[#00ff88]" />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <p className="font-mono text-xs text-[#00ff88]">{activity.repo}</p>
                        <p className="mt-0.5 truncate text-sm text-white/80">{activity.message}</p>
                        <p className="mt-1 font-mono text-xs text-white/40">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
