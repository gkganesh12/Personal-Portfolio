"use client"

import { motion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-[2px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #00ff88, #00d4ff, #00ff88)",
        boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff88",
      }}
    />
  )
}
