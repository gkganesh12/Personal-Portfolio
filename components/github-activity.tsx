"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState, useMemo } from "react"
import { GitCommit, GitPullRequest, GitMerge, Star, Users, BookOpen, Code2 } from "lucide-react"
import { TiltCard } from "./tilt-card"

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
}

interface GitHubRepo {
  name: string
  stargazers_count: number
  language: string | null
  updated_at: string
  description: string | null
  html_url: string
  fork: boolean
}

interface GitHubData {
  user: GitHubUser | null
  repos: GitHubRepo[]
  totalStars: number
  languages: string[]
  loading: boolean
  error: boolean
}

// Fallback placeholder data
const fallbackActivities = [
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

function useGitHubData(): GitHubData {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/gkganesh12", { signal: controller.signal }),
          fetch("https://api.github.com/users/gkganesh12/repos?per_page=100&sort=updated", { signal: controller.signal }),
        ])

        if (!userRes.ok || !reposRes.ok) {
          throw new Error("GitHub API request failed")
        }

        const userData: GitHubUser = await userRes.json()
        const reposData: GitHubRepo[] = await reposRes.json()

        setUser(userData)
        setRepos(reposData)
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(true)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()
    return () => controller.abort()
  }, [])

  const totalStars = useMemo(
    () => repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    [repos]
  )

  const languages = useMemo(
    () => [...new Set(repos.map((r) => r.language).filter(Boolean))] as string[],
    [repos]
  )

  return { user, repos, totalStars, languages, loading, error }
}

function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return "just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded bg-white/10 ${className ?? ""}`} />
  )
}

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
  const { user, repos, totalStars, languages, loading, error } = useGitHubData()

  // Build activity feed from real repos
  const recentActivities = useMemo(() => {
    if (error || repos.length === 0) return fallbackActivities

    return repos.slice(0, 4).map((repo, i) => {
      const icons = [GitCommit, GitPullRequest, GitMerge, Star]
      return {
        type: "repo",
        repo: repo.name,
        message: repo.description || "No description",
        time: formatTimeAgo(repo.updated_at),
        icon: icons[i % icons.length],
        url: repo.html_url,
      }
    })
  }, [repos, error])

  return (
    <section ref={ref} id="github-activity" className="relative px-6 py-24">
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

        {/* GitHub Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <TiltCard>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 transition-all duration-500 hover:border-[#00ff88]/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)]">
              {loading ? (
                <div className="flex items-center justify-around gap-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <SkeletonPulse className="h-4 w-16" />
                      <SkeletonPulse className="h-6 w-10" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-around gap-4">
                  <StatItem icon={BookOpen} label="Repos" value={user?.public_repos ?? 0} />
                  <StatItem icon={Users} label="Followers" value={user?.followers ?? 0} />
                  <StatItem icon={Users} label="Following" value={user?.following ?? 0} />
                  <StatItem icon={Star} label="Stars" value={totalStars} />
                  <StatItem icon={Code2} label="Languages" value={languages.length} />
                </div>
              )}
            </div>
          </TiltCard>
        </motion.div>

        {/* Languages ticker */}
        {!loading && languages.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 flex flex-wrap items-center justify-center gap-2"
          >
            {languages.map((lang) => (
              <span
                key={lang}
                className="rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 font-mono text-xs text-[#00ff88]/80 transition-colors hover:border-[#00ff88]/40 hover:bg-[#00ff88]/10"
              >
                {lang}
              </span>
            ))}
          </motion.div>
        )}

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
                    {loading ? (
                      <SkeletonPulse className="h-4 w-24" />
                    ) : (
                      `${user?.public_repos ?? 0} public repos`
                    )}
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
                <h3 className="mb-4 font-mono text-sm text-white/60">
                  {loading ? "Loading..." : error ? "Latest Commits" : "Recently Updated Repos"}
                </h3>
                <div className="space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3"
                      >
                        <SkeletonPulse className="h-8 w-8 shrink-0 !rounded" />
                        <div className="flex-1 space-y-2">
                          <SkeletonPulse className="h-3 w-24" />
                          <SkeletonPulse className="h-4 w-full" />
                          <SkeletonPulse className="h-3 w-16" />
                        </div>
                      </div>
                    ))
                  ) : (
                    recentActivities.map((activity, i) => (
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
                    ))
                  )}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function StatItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5">
        <Icon className="h-3.5 w-3.5 text-[#00ff88]/60" />
        <span className="font-mono text-xs text-white/40">{label}</span>
      </div>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="font-mono text-lg font-bold text-[#00ff88]"
      >
        {value}
      </motion.span>
    </div>
  )
}
