"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { ExternalLink, Github, X } from "lucide-react"
import { HolographicCard } from "./holographic-card"
import { TextReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"
import { GlitchText } from "./glitch-text"

interface Project {
  id: string
  codename: string
  title: string
  description: string
  fullDescription: string
  features: string[]
  techStack: string[]
  tech: string[]
  status: string
  github: string
  demo: string
  live: string
  accent: string
}

const projects: Project[] = [
  {
    id: "001",
    codename: "NEURAL_GUARD",
    title: "AI Threat Detection System",
    description:
      "Real-time cybersecurity platform using machine learning to identify and neutralize threats before they breach the perimeter.",
    fullDescription:
      "NEURAL_GUARD is a next-generation cybersecurity platform that leverages deep learning models trained on millions of threat vectors to detect anomalies in real time. It integrates seamlessly with existing SIEM infrastructure and provides automated incident response playbooks. The system continuously retrains on new attack patterns, keeping defences ahead of evolving threats.",
    features: [
      "Real-time anomaly detection with sub-100ms response time",
      "Automated incident response and threat quarantine",
      "Adaptive ML pipeline that retrains on emerging attack vectors",
      "Dashboard with live threat map and severity heatmaps",
    ],
    techStack: ["Python", "TensorFlow", "FastAPI", "Redis", "Kafka", "Docker"],
    tech: ["Python", "TensorFlow", "FastAPI", "Redis"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    live: "#",
    accent: "#00ff88",
  },
  {
    id: "002",
    codename: "SYNAPSE",
    title: "Distributed Task Orchestrator",
    description:
      "Scalable microservices architecture for orchestrating complex workflows across multiple cloud providers.",
    fullDescription:
      "SYNAPSE is a cloud-agnostic workflow engine designed to orchestrate thousands of concurrent tasks across AWS, GCP, and Azure. It uses a DAG-based execution model with automatic retry logic, dead-letter queues, and real-time observability. Built for teams that need reliable, high-throughput task pipelines without vendor lock-in.",
    features: [
      "DAG-based workflow definition with visual editor",
      "Multi-cloud execution with automatic failover",
      "Built-in observability: traces, metrics, and structured logs",
      "Horizontal auto-scaling based on queue depth",
    ],
    techStack: ["Go", "Kubernetes", "gRPC", "PostgreSQL", "Prometheus", "Terraform"],
    tech: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    live: "#",
    accent: "#00d4ff",
  },
  {
    id: "003",
    codename: "CIPHER_CHAT",
    title: "End-to-End Encrypted Messenger",
    description:
      "Zero-knowledge proof messaging application with military-grade encryption and self-destructing messages.",
    fullDescription:
      "CIPHER_CHAT provides a fully end-to-end encrypted communication channel where even the server operators cannot read message content. It implements the Signal Protocol with additional layers of forward secrecy and post-quantum key exchange. Messages can be set to self-destruct, and the app leaves zero forensic traces on device storage.",
    features: [
      "Double-ratchet encryption with post-quantum key exchange",
      "Self-destructing messages with configurable TTL",
      "Zero-knowledge authentication — no phone number required",
      "Decentralised relay nodes for metadata resistance",
    ],
    techStack: ["React", "Node.js", "WebSocket", "Signal Protocol", "libsodium", "SQLite"],
    tech: ["React", "Node.js", "WebSocket", "Signal Protocol"],
    status: "DEPLOYED",
    github: "#",
    demo: "#",
    live: "#",
    accent: "#ff79c6",
  },
  {
    id: "004",
    codename: "QUANTUM_PARSE",
    title: "Intelligent Document Processor",
    description:
      "LLM-powered document analysis system that extracts, classifies, and summarizes information from unstructured data.",
    fullDescription:
      "QUANTUM_PARSE ingests PDFs, scanned images, and handwritten notes, then uses a combination of OCR, vision transformers, and large language models to extract structured data. It supports custom extraction schemas, multi-language documents, and can process thousands of pages per minute. The output feeds directly into downstream analytics or database pipelines.",
    features: [
      "Multi-format ingestion: PDF, images, handwriting, and emails",
      "Custom extraction schemas with drag-and-drop field mapping",
      "Batch processing at 2,000+ pages per minute",
      "RAG-powered Q&A over uploaded document corpora",
    ],
    techStack: ["Next.js", "LangChain", "OpenAI", "Pinecone", "Tesseract", "Supabase"],
    tech: ["Next.js", "LangChain", "OpenAI", "Pinecone"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    live: "#",
    accent: "#f1fa8c",
  },
]

// ---------------------------------------------------------------------------
// Modal overlay
// ---------------------------------------------------------------------------

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 40,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  // Stop Lenis smooth scroll while modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (lenis) lenis.stop()
    // Prevent body scroll as fallback
    document.body.style.overflow = "hidden"
    return () => {
      if (lenis) lenis.start()
      document.body.style.overflow = ""
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0a0a0f]/95 p-8 shadow-2xl backdrop-blur-xl"
        style={{
          boxShadow: `0 0 80px ${project.accent}15, 0 0 30px ${project.accent}08`,
        }}
      >
        {/* Accent top border */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-white/30 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ID + Codename */}
        <div className="mb-1 flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: project.accent }}>
            [{project.id}]
          </span>
          <span className="font-mono text-xs tracking-wider text-white/40">
            {project.codename}
          </span>
        </div>

        {/* Title with GlitchText */}
        <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          <GlitchText>{project.title}</GlitchText>
        </h3>

        {/* Status badge */}
        <div className="mb-6 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: project.accent }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
          </span>
          <span
            className="rounded border px-2 py-0.5 font-mono text-xs"
            style={{
              color: project.accent,
              borderColor: `${project.accent}40`,
              backgroundColor: `${project.accent}10`,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Full description */}
        <p className="mb-6 text-sm leading-relaxed text-white/70">
          {project.fullDescription}
        </p>

        {/* Key features */}
        <div className="mb-6">
          <h4 className="mb-3 font-mono text-xs tracking-widest text-white/40">
            // KEY FEATURES
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack tags */}
        <div className="mb-8">
          <h4 className="mb-3 font-mono text-xs tracking-widest text-white/40">
            // TECH STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded border px-3 py-1 font-mono text-xs transition-colors"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}30`,
                  backgroundColor: `${project.accent}10`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <MagneticButton as="a" href={project.github} strength={0.2}>
            <span className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:border-white/20 hover:text-[#00ff88]">
              <Github className="h-4 w-4" />
              <span>SOURCE CODE</span>
            </span>
          </MagneticButton>
          <MagneticButton as="a" href={project.live} strength={0.2}>
            <span className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:border-white/20 hover:text-[#00ff88]">
              <ExternalLink className="h-4 w-4" />
              <span>LIVE DEMO</span>
            </span>
          </MagneticButton>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function DeploymentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <section
      id="deployments"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.03, 0.08, 0.03],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00ff88] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-header">{"// DEPLOYMENTS"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            <TextReveal>Mission Files</TextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            A selection of classified operations. Each project represents a
            solved problem and lessons learned in the field.
          </motion.p>
        </motion.div>

        {/* Projects grid with 3D tilt */}
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: index % 2 === 0 ? -5 : 5 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <HolographicCard className="h-full">
                <div
                  onClick={() => setActiveProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveProject(project)
                    }
                  }}
                  className="group relative h-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,255,136,0.08)]"
                >
                  {/* Animated top border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                    className="absolute left-0 top-0 h-[1px] w-full origin-left"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${project.accent}40, transparent)`,
                    }}
                  />

                  {/* Top row: ID and Status */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs" style={{ color: project.accent }}>
                        [{project.id}]
                      </span>
                      <span className="font-mono text-xs tracking-wider text-white/40">
                        {project.codename}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span
                          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                          style={{ backgroundColor: project.accent }}
                        />
                        <span
                          className="relative inline-flex h-2 w-2 rounded-full"
                          style={{ backgroundColor: project.accent }}
                        />
                      </span>
                      <span className="font-mono text-xs" style={{ color: project.accent }}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-[#00ff88]">
                    {project.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-white/60">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-xs text-white/70 transition-colors hover:border-white/20"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <MagneticButton
                      as="a"
                      href={project.github}
                      strength={0.2}
                    >
                      <span
                        className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-4 w-4" />
                        <span>SOURCE</span>
                      </span>
                    </MagneticButton>
                    <MagneticButton
                      as="a"
                      href={project.demo}
                      strength={0.2}
                    >
                      <span
                        className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>DEPLOY</span>
                      </span>
                    </MagneticButton>
                  </div>

                  {/* Decorative corner with glow */}
                  <div className="absolute right-0 top-0 h-20 w-20 overflow-hidden">
                    <div
                      className="absolute right-[-40px] top-[-40px] h-20 w-20 rotate-45 border-b transition-colors duration-500 group-hover:border-[#00ff88]/30"
                      style={{ borderColor: `${project.accent}20`, backgroundColor: `${project.accent}05` }}
                    />
                  </div>

                  {/* Bottom glow on hover */}
                  <div
                    className="absolute bottom-0 left-0 h-1/2 w-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(to top, ${project.accent}08, transparent)`,
                    }}
                  />
                </div>
              </HolographicCard>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <MagneticButton as="a" href="#" strength={0.3}>
            <span className="inline-flex items-center gap-2 font-mono text-sm text-white/50 transition-colors hover:text-[#00ff88]">
              <span>{"[ VIEW ALL DEPLOYMENTS \u2192"}</span>
              <span>{"]"}</span>
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
