"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ArrowRight, Clock, ArrowLeft, Search, BookOpen, Zap } from "lucide-react"
import Link from "next/link"
import type { BlogPostMeta } from "@/lib/blog"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { Spotlight } from "@/components/spotlight"
import { MatrixRain } from "@/components/matrix-rain"
import { ParticleField } from "@/components/particle-field"
import { MagneticButton } from "@/components/magnetic-button"
import { TiltCard } from "@/components/tilt-card"
import { GlitchText } from "@/components/glitch-text"
import { CharReveal } from "@/components/text-reveal"

export function BlogListClient({ posts }: { posts: BlogPostMeta[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)))

  const filteredPosts = posts.filter((post) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag)
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-black">
        {/* === IMMERSIVE EFFECTS === */}
        <CustomCursor />
        <ScrollProgress />
        <Spotlight />
        <MatrixRain />
        <ParticleField />

        {/* Background grid */}
        <div className="pointer-events-none fixed inset-0 z-[1] bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

        {/* Noise texture */}
        <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]">
          <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
        </div>

        {/* Scanline */}
        <div className="pointer-events-none fixed inset-0 z-[3] overflow-hidden opacity-30">
          <div className="animate-scanline absolute inset-x-0 h-px bg-[#00ff88]/10" />
        </div>

        {/* === HEADER === */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3">
            <MagneticButton as="a" href="/" strength={0.3}>
              <span className="flex items-center gap-2 font-mono text-sm text-white/60 transition-colors hover:text-[#00ff88]">
                <ArrowLeft className="h-4 w-4" />
                <span>GANESH<span className="text-[#00ff88]">.EXE</span></span>
              </span>
            </MagneticButton>

            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-[#00ff88]/60" />
              <span className="font-mono text-xs text-white/40">THINKING_LOGS</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-white/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
              </span>
              {posts.length} LOGS
            </div>
          </div>
        </div>

        {/* === HERO === */}
        <section className="relative px-6 py-24">
          {/* Ambient glows */}
          <motion.div
            animate={{ opacity: [0.03, 0.07, 0.03], scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#00ff88] blur-[150px]"
          />
          <motion.div
            animate={{ opacity: [0.02, 0.04, 0.02] }}
            transition={{ duration: 8, repeat: Infinity, delay: 3 }}
            className="pointer-events-none absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-[#00d4ff] blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-header">{"// THINKING_LOGS"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl"
            >
              <GlitchText>
                <CharReveal delay={0.3}>Classified</CharReveal>
              </GlitchText>{" "}
              <span className="text-[#00ff88]">
                <CharReveal delay={0.6}>Thoughts</CharReveal>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-6 max-w-xl text-white/50"
            >
              Declassified insights, technical deep-dives, and observations from the field.
              Not your average blog posts.
            </motion.p>

            {/* Search bar with glow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 backdrop-blur-sm transition-all duration-300 focus-within:border-[#00ff88]/40 focus-within:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
            >
              <Search className="h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search classified logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent font-mono text-sm text-white outline-none placeholder:text-white/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-mono text-xs text-white/30 hover:text-[#00ff88]"
                >
                  CLEAR
                </button>
              )}
            </motion.div>

            {/* Tags filter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTag(null)}
                className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                  !selectedTag
                    ? "border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.15)]"
                    : "border-white/10 text-white/40 hover:border-white/20"
                }`}
              >
                ALL
              </motion.button>
              {allTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                    selectedTag === tag
                      ? "border-[#00ff88] bg-[#00ff88]/10 text-[#00ff88] shadow-[0_0_10px_rgba(0,255,136,0.15)]"
                      : "border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  #{tag}
                </motion.button>
              ))}
            </motion.div>

            {/* Results count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 font-mono text-xs text-white/20"
            >
              {filteredPosts.length} of {posts.length} logs declassified
            </motion.div>
          </div>
        </section>

        {/* === BLOG POSTS === */}
        <section className="relative px-6 pb-24">
          <div className="relative z-10 mx-auto max-w-4xl">
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 40, rotateX: 5 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                >
                  <TiltCard>
                    <Link href={`/blog/${post.slug}`}>
                      <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#00ff88]/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]">
                        {/* Animated left accent line */}
                        <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-gradient-to-b from-[#00ff88] to-[#00d4ff] transition-transform duration-500 group-hover:scale-y-100" />

                        {/* Featured badge */}
                        {post.featured && (
                          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/10 px-2.5 py-0.5 font-mono text-xs text-[#00ff88]">
                            <Zap className="h-3 w-3" />
                            FEATURED
                          </div>
                        )}

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex-1">
                            {/* Meta */}
                            <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs">
                              <span className="text-[#00ff88]/60">
                                LOG_{String(index + 1).padStart(3, "0")}
                              </span>
                              <span className="text-white/30">
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1 text-white/30">
                                <Clock className="h-3 w-3" />
                                {post.readingTime}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#00ff88] sm:text-2xl">
                              {post.title}
                            </h2>

                            {/* Excerpt */}
                            <p className="mb-4 text-sm leading-relaxed text-white/50">
                              {post.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/40 transition-colors group-hover:border-[#00ff88]/15 group-hover:text-white/50"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Arrow */}
                          <div className="flex items-center self-end sm:self-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:border-[#00ff88]/30 group-hover:bg-[#00ff88]/5 group-hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]">
                              <ArrowRight className="h-4 w-4 text-white/20 transition-all duration-500 group-hover:translate-x-0.5 group-hover:text-[#00ff88]" />
                            </div>
                          </div>
                        </div>

                        {/* Bottom glow */}
                        <div className="absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-[#00ff88]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Top accent line */}
                        <div className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-[#00ff88]/30 via-[#00d4ff]/20 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                      </article>
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}

              {filteredPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <div className="mb-4 font-mono text-4xl text-white/10">404</div>
                  <p className="font-mono text-sm text-white/30">No logs found matching your criteria.</p>
                  <button
                    onClick={() => {
                      setSelectedTag(null)
                      setSearchQuery("")
                    }}
                    className="mt-4 rounded border border-[#00ff88]/20 bg-[#00ff88]/5 px-4 py-2 font-mono text-xs text-[#00ff88] transition-all hover:border-[#00ff88]/40 hover:bg-[#00ff88]/10"
                  >
                    [ CLEAR ALL FILTERS ]
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="border-t border-white/10 px-6 py-6">
          <div className="mx-auto flex max-w-4xl items-center justify-between">
            <MagneticButton as="a" href="/" strength={0.3}>
              <span className="font-mono text-xs text-white/40 transition-colors hover:text-[#00ff88]">
                &larr; Back to GANESH.EXE
              </span>
            </MagneticButton>
            <span className="font-mono text-xs text-white/20">
              {posts.length} logs declassified
            </span>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  )
}
