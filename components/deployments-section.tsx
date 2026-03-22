"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import { TiltCard } from "./tilt-card"
import { HolographicCard } from "./holographic-card"
import { TextReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

const projects = [
  {
    id: "001",
    codename: "NEURAL_GUARD",
    title: "AI Threat Detection System",
    description:
      "Real-time cybersecurity platform using machine learning to identify and neutralize threats before they breach the perimeter.",
    tech: ["Python", "TensorFlow", "FastAPI", "Redis"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    accent: "#00ff88",
  },
  {
    id: "002",
    codename: "SYNAPSE",
    title: "Distributed Task Orchestrator",
    description:
      "Scalable microservices architecture for orchestrating complex workflows across multiple cloud providers.",
    tech: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    accent: "#00d4ff",
  },
  {
    id: "003",
    codename: "CIPHER_CHAT",
    title: "End-to-End Encrypted Messenger",
    description:
      "Zero-knowledge proof messaging application with military-grade encryption and self-destructing messages.",
    tech: ["React", "Node.js", "WebSocket", "Signal Protocol"],
    status: "DEPLOYED",
    github: "#",
    demo: "#",
    accent: "#ff79c6",
  },
  {
    id: "004",
    codename: "QUANTUM_PARSE",
    title: "Intelligent Document Processor",
    description:
      "LLM-powered document analysis system that extracts, classifies, and summarizes information from unstructured data.",
    tech: ["Next.js", "LangChain", "OpenAI", "Pinecone"],
    status: "ACTIVE",
    github: "#",
    demo: "#",
    accent: "#f1fa8c",
  },
]

export function DeploymentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
                <div className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,255,136,0.08)]">
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
                    {project.tech.map((tech, i) => (
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
                    <MagneticButton as="a" href={project.github} strength={0.2}>
                      <span className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]">
                        <Github className="h-4 w-4" />
                        <span>SOURCE</span>
                      </span>
                    </MagneticButton>
                    <MagneticButton as="a" href={project.demo} strength={0.2}>
                      <span className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]">
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
    </section>
  )
}
