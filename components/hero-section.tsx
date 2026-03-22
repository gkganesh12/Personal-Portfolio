"use client"

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion"
import { ChevronDown, Terminal, Code2, Braces, Zap, Shield, Cpu, Download } from "lucide-react"
import { CodeTerminal } from "./code-terminal"
import { CharReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"
import { GlitchText } from "./glitch-text"
import { MorphingBlob } from "./morphing-blob"
import { GradientBorder } from "./gradient-border"
import { useRef, useEffect, useState } from "react"

function AnimatedCounter({ value, suffix, className }: { value: number; suffix: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate(latest) {
        setDisplayValue(Math.round(latest))
      },
    })

    return () => controls.stop()
  }, [isInView, value])

  return (
    <span ref={ref} className={className}>
      {displayValue}{suffix}
    </span>
  )
}

const rotatingTitles = [
  "Building AI + Cyber Systems",
  "Full Stack Developer",
  "AI/ML Engineer",
  "Cybersecurity Enthusiast",
]

function TypewriterCycle() {
  const [titleIndex, setTitleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentTitle = rotatingTitles[titleIndex]

    if (!isDeleting && charIndex < currentTitle.length) {
      // Typing forward
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1)
      }, 60)
      return () => clearTimeout(timeout)
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      // Pause at end before deleting
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && charIndex > 0) {
      // Deleting
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev - 1)
      }, 30)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && charIndex === 0) {
      // Move to next title
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % rotatingTitles.length)
    }
  }, [charIndex, isDeleting, titleIndex])

  const currentTitle = rotatingTitles[titleIndex]

  return <span>{currentTitle.slice(0, charIndex)}</span>
}

function FloatingIcon({ icon: Icon, delay, x, y, rotate }: { icon: any; delay: number; x: string; y: string; rotate: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ delay, duration: 1, ease: "easeOut" }}
      className="pointer-events-none absolute hidden md:block"
      style={{ left: x, top: y }}
    >
      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [rotate, rotate + 10, rotate],
        }}
        transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className="h-8 w-8 text-[#00ff88]/40" />
      </motion.div>
    </motion.div>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section
      id="identity"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background grid effect with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
      />

      {/* Floating 3D icons */}
      <FloatingIcon icon={Code2} delay={0.5} x="8%" y="18%" rotate={-15} />
      <FloatingIcon icon={Terminal} delay={0.7} x="85%" y="22%" rotate={10} />
      <FloatingIcon icon={Braces} delay={0.9} x="12%" y="70%" rotate={-5} />
      <FloatingIcon icon={Zap} delay={1.1} x="88%" y="65%" rotate={15} />
      <FloatingIcon icon={Shield} delay={1.3} x="75%" y="15%" rotate={-10} />
      <FloatingIcon icon={Cpu} delay={1.5} x="20%" y="45%" rotate={5} />

      {/* Static orb glows — no animation to avoid GPU recompositing with blur */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] md:h-[800px] md:w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88] opacity-[0.07] blur-[150px]"
      />
      <div
        className="pointer-events-none absolute left-1/3 top-1/3 h-[250px] w-[250px] md:h-[500px] md:w-[500px] rounded-full bg-[#00d4ff] opacity-[0.05] blur-[120px]"
      />

      {/* Morphing blobs - very subtle */}
      <MorphingBlob className="absolute -left-48 top-1/4 opacity-30 hidden md:block" color="#00ff88" size={500} />
      <MorphingBlob className="absolute -right-48 top-1/3 opacity-20 hidden md:block" color="#00d4ff" size={400} />

      <motion.div
        style={{ y: textY, opacity, scale }}
        className="relative z-10 flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16"
      >
        {/* Left side - Identity */}
        <div className="text-center lg:text-left">
          {/* System status */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 font-mono text-xs tracking-widest text-[#00ff88]/60"
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {"// IDENTITY"}
            </motion.span>
          </motion.div>

          {/* Main name with subtle shake + shimmer */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              x: [0, -1, 1, -0.5, 0.5, 0],
            }}
            transition={{
              opacity: { delay: 0.3, duration: 0.8 },
              y: { delay: 0.3, duration: 0.8, ease: "easeOut" },
              filter: { delay: 0.3, duration: 0.8 },
              x: { delay: 1.2, duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" },
            }}
            className="mb-6 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl"
            style={{ fontFamily: 'var(--font-chakra)' }}
          >
            <GlitchText className="inline-block shimmer-white" autoGlitch autoGlitchInterval={2000}>GANESH</GlitchText>
            <br />
            <GlitchText className="inline-block shimmer-green" autoGlitch autoGlitchInterval={2000}>KHETAWAT</GlitchText>
          </motion.h1>

          {/* Subtitle with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-4 flex items-center justify-center gap-2 font-mono text-lg text-white/60 sm:text-xl lg:justify-start"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#00ff88]"
            >
              {">"}
            </motion.span>
            <TypewriterCycle />
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block h-5 w-[2px] bg-[#00ff88]"
            />
          </motion.div>

          {/* Status indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center justify-center gap-2 font-mono text-sm text-white/40 lg:justify-start"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
            </span>
            <span>System Active</span>
          </motion.div>

          {/* Quick stats with 3D hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.8 }}
            className="mt-8 flex items-center justify-center gap-6 lg:justify-start"
          >
            {[
              { value: 5, suffix: "+", label: "YEARS EXP", color: "text-[#00ff88]" },
              { value: 50, suffix: "+", label: "PROJECTS", color: "text-white" },
              { value: 99, suffix: "%", label: "UPTIME", color: "text-white" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="text-center"
              >
                <div className={`font-mono text-2xl font-bold ${stat.color}`}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-xs text-white/40">{stat.label}</div>
              </motion.div>
            ))}
            {/* Dividers rendered between stats */}
          </motion.div>

          {/* Download Resume button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            className="mt-8 flex justify-center lg:justify-start"
          >
            <MagneticButton strength={0.3}>
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "rgba(0, 255, 136, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Download className="h-3.5 w-3.5 text-[#00ff88] transition-transform group-hover:translate-y-[1px]" />
                <span>Download Resume</span>
                <motion.span
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-[#00ff88]"
                >
                  .pdf
                </motion.span>
              </motion.a>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side - Code Terminal with 3D effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
          whileHover={{ rotateY: 5, scale: 1.02 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          className="hidden lg:block"
        >
          <GradientBorder>
            <CodeTerminal />
          </GradientBorder>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <MagneticButton strength={0.5}>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs tracking-widest text-white/40">
              SCROLL TO ENTER SYSTEM
            </span>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-5 w-5 text-[#00ff88]/60" />
            </motion.div>
          </motion.div>
        </MagneticButton>
      </motion.div>
    </section>
  )
}
