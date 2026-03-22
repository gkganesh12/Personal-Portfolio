"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

function Particles({ count = 600 }) {
  const mesh = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const { viewport } = useThree()

  const [positions, originalPositions, speeds, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const originalPositions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20
      const y = (Math.random() - 0.5) * 20
      const z = (Math.random() - 0.5) * 10

      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
      originalPositions[i * 3] = x
      originalPositions[i * 3 + 1] = y
      originalPositions[i * 3 + 2] = z
      speeds[i] = Math.random() * 0.5 + 0.1
      sizes[i] = Math.random() * 2 + 0.5
    }

    return [positions, originalPositions, speeds, sizes]
  }, [count])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const time = state.clock.elapsedTime
    const geometry = mesh.current.geometry
    const posArray = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const speed = speeds[i]

      posArray[i3] = originalPositions[i3] + Math.sin(time * speed + i) * 0.3
      posArray[i3 + 1] = originalPositions[i3 + 1] + Math.cos(time * speed + i * 0.5) * 0.3
      posArray[i3 + 2] = originalPositions[i3 + 2] + Math.sin(time * speed * 0.5 + i * 0.3) * 0.2

      const dx = posArray[i3] - mouse.current.x * viewport.width * 0.5
      const dy = posArray[i3 + 1] - mouse.current.y * viewport.height * 0.5
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 2) {
        const force = (2 - dist) * 0.15
        posArray[i3] += (dx / dist) * force
        posArray[i3 + 1] += (dy / dist) * force
      }
    }

    geometry.attributes.position.needsUpdate = true
    mesh.current.rotation.y = time * 0.02
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00ff88"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingGrid() {
  const ref = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    const vertices: number[] = []
    const gridSize = 20
    const divisions = 20

    for (let i = 0; i <= divisions; i++) {
      const pos = (i / divisions) * gridSize - gridSize / 2
      vertices.push(pos, -5, -gridSize / 2, pos, -5, gridSize / 2)
      vertices.push(-gridSize / 2, -5, pos, gridSize / 2, -5, pos)
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
    return geo
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#00ff88" transparent opacity={0.05} />
    </lineSegments>
  )
}

export function ParticleField() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Pause when scrolled past the hero
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 1.5)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Particles count={600} />
        <FloatingGrid />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
