"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TiltCard } from "./tilt-card"
import { TextReveal } from "./text-reveal"

const capabilities = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: "from-[#00ff88]/20 to-[#00d4ff]/10",
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "Go", "PostgreSQL", "MongoDB"],
    gradient: "from-[#00d4ff]/20 to-[#ff79c6]/10",
  },
  {
    category: "AI/ML",
    skills: ["TensorFlow", "PyTorch", "LangChain", "OpenAI API", "RAG Systems"],
    gradient: "from-[#ff79c6]/20 to-[#f1fa8c]/10",
  },
  {
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    gradient: "from-[#f1fa8c]/20 to-[#00ff88]/10",
  },
  {
    category: "Security",
    skills: ["Penetration Testing", "OWASP", "Cryptography", "Zero Trust", "SIEM"],
    gradient: "from-[#8be9fd]/20 to-[#ff79c6]/10",
  },
  {
    category: "Tools",
    skills: ["Git", "Linux", "Vim", "Figma", "Jira"],
    gradient: "from-[#50fa7b]/20 to-[#8be9fd]/10",
  },
]

export function CapabilitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="capabilities"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      {/* Animated ambient glow */}
      <motion.div
        animate={{
          x: ["-10%", "10%", "-10%"],
          y: ["-5%", "5%", "-5%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00ff88]/5 blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-header">{"// CAPABILITIES"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            <TextReveal>Technical Arsenal</TextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            A comprehensive toolkit forged through years of building, breaking, and rebuilding systems.
          </motion.p>
        </motion.div>

        {/* Skills grid with 3D tilt cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.category}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <TiltCard className="h-full">
                <div className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-[#00ff88]/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                  {/* Hover gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${capability.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Category header */}
                    <div className="mb-4 flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="flex h-8 w-8 items-center justify-center rounded border border-[#00ff88]/30 bg-[#00ff88]/10"
                      >
                        <span className="font-mono text-xs text-[#00ff88]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </motion.div>
                      <h3 className="font-mono text-sm font-medium tracking-wider text-white">
                        {capability.category.toUpperCase()}
                      </h3>
                    </div>

                    {/* Skills list */}
                    <div className="flex flex-wrap gap-2">
                      {capability.skills.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.1 + skillIndex * 0.05 + 0.3,
                          }}
                          whileHover={{
                            scale: 1.1,
                            backgroundColor: "rgba(0,255,136,0.15)",
                            borderColor: "rgba(0,255,136,0.5)",
                          }}
                          className="rounded border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Animated border glow on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,255,136,0.1) 0%, transparent 50%, rgba(0,212,255,0.1) 100%)",
                    }}
                  />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-mono text-xs text-[#00ff88]/60"
          >
            ALWAYS LEARNING
          </motion.span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  )
}
