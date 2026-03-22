"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  as?: "a" | "button" | "div"
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  strength?: number
}

export function MagneticButton({
  children,
  className = "",
  as = "div",
  href,
  target,
  rel,
  onClick,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = motion.div

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={className}
      data-hover
    >
      {as === "a" ? (
        <a href={href} target={target} rel={rel} onClick={onClick} className="block">
          {children}
        </a>
      ) : as === "button" ? (
        <button onClick={onClick} className="block">
          {children}
        </button>
      ) : (
        children
      )}
    </Component>
  )
}
