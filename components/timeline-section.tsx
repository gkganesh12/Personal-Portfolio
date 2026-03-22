"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap, Rocket, Award, Code2 } from "lucide-react"
import { TextReveal } from "./text-reveal"

const timelineEvents = [
  {
    year: "2024",
    title: "AI Systems Architect",
    description: "Leading development of autonomous AI agents and LLM-powered applications. Building the future of intelligent systems.",
    icon: Rocket,
    color: "#00ff88",
    tags: ["AI/ML", "LangChain", "System Design"],
  },
  {
    year: "2023",
    title: "Senior Full Stack Developer",
    description: "Architected scalable microservices handling millions of requests. Implemented zero-trust security across the stack.",
    icon: Code2,
    color: "#00d4ff",
    tags: ["Go", "Kubernetes", "AWS"],
  },
  {
    year: "2022",
    title: "Full Stack Developer",
    description: "Built enterprise-grade web applications with React and Node.js. Led migration from monolith to microservices.",
    icon: Briefcase,
    color: "#ff79c6",
    tags: ["React", "Node.js", "PostgreSQL"],
  },
  {
    year: "2021",
    title: "Cybersecurity Certification",
    description: "Earned Certified Ethical Hacker (CEH) certification. Deep-dived into penetration testing and security architecture.",
    icon: Award,
    color: "#f1fa8c",
    tags: ["Security", "PenTest", "OWASP"],
  },
  {
    year: "2020",
    title: "Started Professional Journey",
    description: "First steps into professional development. Built web apps, contributed to open source, and discovered my passion for AI.",
    icon: Code2,
    color: "#8be9fd",
    tags: ["JavaScript", "Python", "Open Source"],
  },
  {
    year: "2019",
    title: "Computer Science Degree",
    description: "Graduated with B.Tech in Computer Science. Focused on algorithms, data structures, and machine learning fundamentals.",
    icon: GraduationCap,
    color: "#50fa7b",
    tags: ["Algorithms", "ML", "Research"],
  },
]

function TimelineEvent({
  event,
  index,
  isInView,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isInView: boolean
}) {
  const isLeft = index % 2 === 0
  const Icon = event.icon

  return (
    <div className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}>
      {/* Content card */}
      <motion.div
        initial={{
          opacity: 0,
          x: isLeft ? -60 : 60,
          rotateY: isLeft ? -10 : 10,
        }}
        animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="w-full md:w-[calc(50%-40px)]"
      >
        <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]">
          {/* Year badge */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs"
            style={{ borderColor: `${event.color}40`, color: event.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: event.color }} />
            {event.year}
          </motion.div>

          <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#00ff88]">
            {event.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-white/60">
            {event.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Hover glow */}
          <div
            className="absolute bottom-0 left-0 h-1/2 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(to top, ${event.color}08, transparent)`,
            }}
          />
        </div>
      </motion.div>

      {/* Center node */}
      <div className="absolute left-0 z-10 flex items-center justify-center md:left-1/2 md:-translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.3 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 bg-black"
          style={{ borderColor: event.color, boxShadow: `0 0 15px ${event.color}40` }}
        >
          <Icon className="h-4 w-4" style={{ color: event.color }} />
        </motion.div>
      </div>
    </div>
  )
}

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section ref={containerRef} className="relative px-6 py-24">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88] blur-[150px]"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-5xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-header">{"// JOURNEY"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            <TextReveal>Evolution Timeline</TextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            From writing my first line of code to architecting AI systems.
            Every chapter shaped the developer I am today.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 md:left-1/2 md:block md:-translate-x-1/2">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#00ff88] via-[#00d4ff] to-[#ff79c6]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Mobile line */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-white/10 md:hidden">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#00ff88] via-[#00d4ff] to-[#ff79c6]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Events */}
          <div className="space-y-12 pl-14 md:space-y-16 md:pl-0">
            {timelineEvents.map((event, index) => (
              <TimelineEvent
                key={event.year}
                event={event}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
