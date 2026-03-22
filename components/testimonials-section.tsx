"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TiltCard } from "./tilt-card"
import { TextReveal } from "./text-reveal"

const testimonials = [
  {
    quote:
      "Ganesh delivered an exceptional AI-powered system that exceeded our expectations. His attention to detail and technical expertise are unmatched.",
    name: "Alex Chen",
    role: "CTO at TechVentures",
    rating: 5,
  },
  {
    quote:
      "Working with Ganesh was a game-changer for our team. He brought innovative solutions to complex problems.",
    name: "Sarah Miller",
    role: "Lead Engineer at DataFlow",
    rating: 5,
  },
  {
    quote:
      "His deep understanding of both frontend and backend systems makes him a rare full-stack talent.",
    name: "Raj Patel",
    role: "VP Engineering at CloudSync",
    rating: 5,
  },
  {
    quote:
      "Ganesh's cybersecurity expertise helped us identify and fix critical vulnerabilities before launch.",
    name: "Maria Garcia",
    role: "CISO at SecureNet",
    rating: 5,
  },
]

function StarRating({ rating, delay }: { rating: number; delay: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: delay + i * 0.05 }}
          className={`text-xs ${i < rating ? "text-[#00ff88]" : "text-white/10"}`}
        >
          ★
        </motion.span>
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="testimonials"
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
        className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00ff88] blur-[100px]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="section-header">{"// ENDORSEMENTS"}</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            <TextReveal>What Others Say</TextReveal>
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="mx-auto mt-4 max-w-xl text-white/60"
          >
            Feedback from collaborators, clients, and colleagues across the
            industry.
          </motion.p>
        </motion.div>

        {/* Desktop grid (2x2) */}
        <div className="hidden gap-6 md:grid md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <TiltCard className="h-full">
                <div className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-0 h-full w-[2px] overflow-hidden">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
                      className="h-full w-full origin-top bg-[#00ff88]/30 transition-colors duration-500 group-hover:bg-[#00ff88]/70"
                    />
                  </div>

                  {/* Rating */}
                  <div className="mb-4">
                    <StarRating rating={testimonial.rating} delay={index * 0.15 + 0.4} />
                  </div>

                  {/* Quote */}
                  <p className="mb-6 font-mono text-sm leading-relaxed text-white/70">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-auto">
                    <p className="font-mono text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-mono text-xs text-white/40">
                      {testimonial.role}
                    </p>
                  </div>

                  {/* Bottom glow on hover */}
                  <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#00ff88]/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Mobile horizontal auto-scrolling carousel */}
        <div className="relative md:hidden">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth pb-4"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {/* Duplicate testimonials for seamless loop effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: (index % testimonials.length) * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="w-[85vw] flex-shrink-0 snap-center"
              >
                <div className="group relative h-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-5 backdrop-blur-sm">
                  {/* Left accent line */}
                  <div className="absolute left-0 top-0 h-full w-[2px] bg-[#00ff88]/40" />

                  {/* Rating */}
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-xs text-[#00ff88]">★</span>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mb-4 font-mono text-sm leading-relaxed text-white/70">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div>
                    <p className="font-mono text-sm font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <p className="font-mono text-xs text-white/40">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="h-1 w-6 rounded-full bg-white/10"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Auto-scroll effect for mobile */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
