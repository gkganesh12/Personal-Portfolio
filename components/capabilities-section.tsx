"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useMemo } from "react"
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

const radarData = [
  { label: "Frontend", value: 92 },
  { label: "Backend", value: 88 },
  { label: "AI/ML", value: 85 },
  { label: "DevOps", value: 80 },
  { label: "Security", value: 78 },
  { label: "Database", value: 82 },
]

function getHexagonPoints(cx: number, cy: number, radius: number, numSides: number): string {
  const points: string[] = []
  for (let i = 0; i < numSides; i++) {
    const angle = (Math.PI * 2 * i) / numSides - Math.PI / 2
    points.push(`${cx + radius * Math.cos(angle)},${cy + radius * Math.sin(angle)}`)
  }
  return points.join(" ")
}

function RadarChart({ isInView }: { isInView: boolean }) {
  const size = 380
  const cx = size / 2
  const cy = size / 2
  const maxRadius = 140
  const numAxes = radarData.length
  const gridLevels = [0.25, 0.5, 0.75, 1.0]

  const axes = useMemo(() => {
    return radarData.map((d, i) => {
      const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2
      return {
        ...d,
        angle,
        endX: cx + maxRadius * Math.cos(angle),
        endY: cy + maxRadius * Math.sin(angle),
        labelX: cx + (maxRadius + 28) * Math.cos(angle),
        labelY: cy + (maxRadius + 28) * Math.sin(angle),
        dataX: cx + (maxRadius * d.value) / 100 * Math.cos(angle),
        dataY: cy + (maxRadius * d.value) / 100 * Math.sin(angle),
      }
    })
  }, [cx, cy, maxRadius, numAxes])

  const dataPoints = axes.map((a) => `${a.dataX},${a.dataY}`).join(" ")
  const zeroPoints = axes.map(() => `${cx},${cy}`).join(" ")

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex justify-center"
    >
      <TiltCard className="inline-block">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]"
          >
            {/* Glow filter for data points */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowStrong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Concentric hexagon grid lines */}
            {gridLevels.map((level) => (
              <polygon
                key={level}
                points={getHexagonPoints(cx, cy, maxRadius * level, numAxes)}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            ))}

            {/* Axis lines from center to each vertex */}
            {axes.map((axis, i) => (
              <line
                key={`axis-${i}`}
                x1={cx}
                y1={cy}
                x2={axis.endX}
                y2={axis.endY}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Animated data polygon */}
            <motion.polygon
              initial={{ points: zeroPoints }}
              animate={isInView ? { points: dataPoints } : { points: zeroPoints }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
              fill="rgba(0,255,136,0.15)"
              stroke="#00ff88"
              strokeWidth="2"
              filter="url(#glow)"
            />

            {/* Data point dots with glow */}
            {axes.map((axis, i) => (
              <motion.circle
                key={`dot-${i}`}
                initial={{ cx: cx, cy: cy, opacity: 0 }}
                animate={
                  isInView
                    ? { cx: axis.dataX, cy: axis.dataY, opacity: 1 }
                    : { cx: cx, cy: cy, opacity: 0 }
                }
                transition={{ duration: 1.2, delay: 0.5 + i * 0.05, ease: [0.215, 0.61, 0.355, 1] }}
                r="4"
                fill="#00ff88"
                filter="url(#glowStrong)"
              />
            ))}

            {/* Axis labels */}
            {axes.map((axis, i) => {
              const isTop = axis.angle < -Math.PI / 4 && axis.angle > -3 * Math.PI / 4
              const isBottom = axis.angle > Math.PI / 4 && axis.angle < 3 * Math.PI / 4
              const isLeft = Math.cos(axis.angle) < -0.1
              const isRight = Math.cos(axis.angle) > 0.1

              let textAnchor: string = "middle"
              if (isLeft) textAnchor = "end"
              if (isRight) textAnchor = "start"

              let dy = "0.35em"
              if (isTop) dy = "0.8em"
              if (isBottom) dy = "-0.2em"

              return (
                <motion.text
                  key={`label-${i}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                  x={axis.labelX}
                  y={axis.labelY}
                  textAnchor={textAnchor}
                  dy={dy}
                  fill="rgba(255,255,255,0.7)"
                  fontSize="11"
                  fontFamily="monospace"
                >
                  {axis.label}
                </motion.text>
              )
            })}

            {/* Value labels near data points */}
            {axes.map((axis, i) => {
              const offsetX = (axis.dataX - cx) * 0.15
              const offsetY = (axis.dataY - cy) * 0.15
              return (
                <motion.text
                  key={`value-${i}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 0.5 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 + i * 0.05 }}
                  x={axis.dataX + offsetX}
                  y={axis.dataY + offsetY}
                  textAnchor="middle"
                  dy="0.35em"
                  fill="#00ff88"
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {axis.value}
                </motion.text>
              )
            })}
          </svg>

          {/* Subtle label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.4 } : {}}
            transition={{ delay: 1.6 }}
            className="mt-2 text-center font-mono text-[10px] uppercase tracking-widest text-white/40"
          >
            Skill Proficiency
          </motion.p>
        </div>
      </TiltCard>
    </motion.div>
  )
}

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

        {/* Radar Chart */}
        <div className="mb-12">
          <RadarChart isInView={isInView} />
        </div>

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
