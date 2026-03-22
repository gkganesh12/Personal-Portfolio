"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft, Clock, Calendar, User, Link2, Twitter, Linkedin, ChevronUp, BookOpen } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { Spotlight } from "@/components/spotlight"
import { MatrixRain } from "@/components/matrix-rain"
import { ParticleField } from "@/components/particle-field"
import { MagneticButton } from "@/components/magnetic-button"
import { GlitchText } from "@/components/glitch-text"
import { useState, useRef, useEffect } from "react"

function CopyLinkButton() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <MagneticButton strength={0.3}>
      <button
        onClick={handleCopy}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/50 transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]"
        title="Copy link"
      >
        {copied ? (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="font-mono text-xs text-[#00ff88]"
          >
            ✓
          </motion.span>
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </MagneticButton>
  )
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
      <motion.div
        className="h-full origin-left"
        style={{
          width,
          background: "linear-gradient(90deg, #00ff88, #00d4ff)",
          boxShadow: "0 0 8px #00ff88",
        }}
      />
    </div>
  )
}

function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => ({
      text: line.replace("## ", ""),
      id: line
        .replace("## ", "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
    }))

  if (headings.length < 2) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="hidden xl:block"
    >
      <div className="fixed left-8 top-1/3 z-30 w-48">
        <div className="rounded-lg border border-white/5 bg-black/40 p-4 backdrop-blur-md">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-white/30">
            <BookOpen className="h-3 w-3" />
            CONTENTS
          </div>
          <div className="space-y-2">
            {headings.map((heading, i) => (
              <a
                key={i}
                href={`#${heading.id}`}
                className="block truncate font-mono text-xs text-white/30 transition-colors hover:text-[#00ff88]"
              >
                {heading.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ScrollToTop() {
  return (
    <MagneticButton strength={0.4}>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/40 backdrop-blur-lg transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] hover:shadow-[0_0_20px_rgba(0,255,136,0.15)]"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </MagneticButton>
  )
}

export function BlogPostClient({ post, mdxContent }: { post: BlogPost; mdxContent: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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

        {/* === STICKY HEADER === */}
        <div className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="relative mx-auto flex max-w-3xl items-center justify-between px-6 py-3">
            <MagneticButton as="a" href="/blog" strength={0.3}>
              <span className="flex items-center gap-2 font-mono text-sm text-white/60 transition-colors hover:text-[#00ff88]">
                <ArrowLeft className="h-4 w-4" />
                <span>ALL LOGS</span>
              </span>
            </MagneticButton>

            {/* Post title (truncated) */}
            <span className="hidden max-w-[200px] truncate font-mono text-xs text-white/20 sm:block">
              {post.title}
            </span>

            {/* Share buttons */}
            <div className="flex items-center gap-2">
              <CopyLinkButton />
              <MagneticButton strength={0.3}>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/50 transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </MagneticButton>
              <MagneticButton strength={0.3}>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/50 transition-all hover:border-[#00ff88]/30 hover:text-[#00ff88] hover:shadow-[0_0_15px_rgba(0,255,136,0.15)]"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </MagneticButton>
            </div>

            <ReadingProgress />
          </div>
        </div>

        {/* === TABLE OF CONTENTS (desktop sidebar) === */}
        <TableOfContents content={post.content} />

        {/* === POST HEADER === */}
        <section className="relative px-6 pb-12 pt-20">
          {/* Multiple ambient glows */}
          <motion.div
            animate={{ opacity: [0.03, 0.08, 0.03], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#00ff88] blur-[150px]"
          />
          <motion.div
            animate={{ opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="pointer-events-none absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-[#00d4ff] blur-[120px]"
          />

          <div className="relative z-10 mx-auto max-w-3xl">
            {/* Log ID badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-1 font-mono text-xs text-[#00ff88]/70"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88] animate-pulse" />
              CLASSIFIED LOG
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5 flex flex-wrap gap-2"
            >
              {post.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className="rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 px-3 py-0.5 font-mono text-xs text-[#00ff88] transition-all hover:border-[#00ff88]/40 hover:bg-[#00ff88]/10"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Title with glitch on hover */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            >
              <GlitchText>{post.title}</GlitchText>
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-8 text-lg leading-relaxed text-white/50"
            >
              {post.excerpt}
            </motion.p>

            {/* Meta info bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="origin-left"
            >
              <div className="flex flex-wrap items-center gap-6 rounded-lg border border-white/5 bg-white/[0.02] px-5 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00ff88]/10">
                    <User className="h-3 w-3 text-[#00ff88]" />
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                  <Calendar className="h-3.5 w-3.5 text-[#00ff88]/60" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="h-4 w-px bg-white/10" />
                <div className="flex items-center gap-2 font-mono text-xs text-white/40">
                  <Clock className="h-3.5 w-3.5 text-[#00ff88]/60" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === DIVIDER === */}
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="h-px w-full origin-left bg-gradient-to-r from-[#00ff88]/30 via-[#00d4ff]/20 to-transparent"
          />
        </div>

        {/* === POST CONTENT === */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative px-6 py-12"
        >
          {/* Side decorative line */}
          <div className="pointer-events-none absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-[#00ff88]/10 via-transparent to-[#00ff88]/10 lg:block" style={{ left: "calc(50% - 370px)" }} />

          <div className="relative z-10 mx-auto max-w-3xl">
            {mdxContent}
          </div>
        </motion.article>

        {/* === END OF POST DECORATION === */}
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
            <motion.span
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="font-mono text-xs text-[#00ff88]/40"
            >
              EOF
            </motion.span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
          </div>
        </div>

        {/* === BOTTOM NAVIGATION === */}
        <div className="border-t border-white/10 px-6 py-8">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <MagneticButton as="a" href="/blog" strength={0.3}>
              <span className="flex items-center gap-2 font-mono text-sm text-white/50 transition-colors hover:text-[#00ff88]">
                <ArrowLeft className="h-4 w-4" />
                <span>All Logs</span>
              </span>
            </MagneticButton>

            <ScrollToTop />

            <MagneticButton as="a" href="/" strength={0.3}>
              <span className="font-mono text-sm text-white/50 transition-colors hover:text-[#00ff88]">
                GANESH<span className="text-[#00ff88]">.EXE</span>
              </span>
            </MagneticButton>
          </div>
        </div>
      </main>
    </SmoothScroll>
  )
}
