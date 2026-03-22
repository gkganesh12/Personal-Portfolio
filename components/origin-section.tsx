"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { TextReveal } from "./text-reveal"
import { Parallax } from "./section-reveal"

export function OriginSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const glowX = useTransform(scrollYProgress, [0, 1], ["20%", "80%"])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1.2, 0.8])

  return (
    <section
      id="origin"
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center px-6 py-24"
    >
      {/* Dynamic ambient glow that moves with scroll */}
      <motion.div
        style={{ left: glowX, scale: glowScale }}
        className="pointer-events-none absolute top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-[#00ff88]/5 blur-[100px]"
      />

      <div ref={ref} className="relative z-10 mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.span
            className="section-header"
            animate={isInView ? { opacity: [0, 1] } : {}}
            transition={{ duration: 0.8 }}
          >
            {"// ORIGIN"}
          </motion.span>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            <TextReveal delay={0.3}>Engineer by code.</TextReveal>
            <br />
            <span className="text-white/60">
              <TextReveal delay={0.6}>Builder by nature.</TextReveal>
            </span>
          </h2>

          <Parallax speed={0.2}>
            <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-white/60">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                In the depths of digital systems, I architect solutions that bridge
                human intelligence with machine precision. My journey began not with
                a simple &quot;Hello World,&quot; but with an insatiable curiosity to
                understand the invisible threads that connect our digital world.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Today, I specialize in building autonomous systems, scalable architectures,
                and AI-powered applications that push the boundaries of what&apos;s possible.
                Every line of code is a calculated move in the grand chess game of technology.
              </motion.p>
            </div>
          </Parallax>

          {/* Stats with counting animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-8 sm:grid-cols-4"
          >
            {[
              { label: "Years Active", value: "5+" },
              { label: "Projects Deployed", value: "50+" },
              { label: "Systems Built", value: "100+" },
              { label: "Coffee Consumed", value: "\u221E" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  transition: { type: "spring", stiffness: 400 },
                }}
                className="group text-center sm:text-left"
              >
                <div className="text-2xl font-bold text-[#00ff88] transition-all group-hover:text-shadow-[0_0_20px_rgba(0,255,136,0.5)] sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 font-mono text-xs text-white/40 transition-colors group-hover:text-white/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
