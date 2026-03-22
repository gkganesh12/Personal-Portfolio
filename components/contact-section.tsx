"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Github, Linkedin, Mail, Twitter, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { playSoundGlobal } from "./sound-toggle"
import { TextReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/gkganesh12" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/ganeshkhetawat/" },
  { name: "Twitter", icon: Twitter, href: "https://x.com/gkganesh01" },
  { name: "Email", icon: Mail, href: "mailto:gkganesh448@gmail.com" },
]

const WEB3FORMS_KEY = "11c7fe9b-92b1-42c2-ac40-9a380c4f34e8"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("sending")

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          from_name: "GANESH.EXE Portfolio",
        }),
      })

      const data = await res.json()
      if (data.success) {
        playSoundGlobal("success")
        setFormState("success")
        setFormData({ name: "", email: "", message: "" })
        setTimeout(() => setFormState("idle"), 4000)
      } else {
        playSoundGlobal("error")
        setFormState("error")
        setTimeout(() => setFormState("idle"), 4000)
      }
    } catch {
      playSoundGlobal("error")
      setFormState("error")
      setTimeout(() => setFormState("idle"), 4000)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
    >
      {/* Multiple animated glows */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88] blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="pointer-events-none absolute left-1/3 top-1/3 h-[400px] w-[400px] rounded-full bg-[#00d4ff] blur-[120px]"
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="section-header">{"// CONTACT_PROTOCOL"}</span>
        </motion.div>

        {/* Main heading with text reveal */}
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3 }}
          className="mb-6 text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <TextReveal delay={0.2}>Ready to build</TextReveal>
          <br />
          <span className="text-[#00ff88]">
            <TextReveal delay={0.5}>something extraordinary?</TextReveal>
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-12 max-w-xl text-white/60"
        >
          Whether you have a project in mind, a problem to solve, or just want
          to discuss the future of technology — my channels are open.
        </motion.p>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mx-auto mb-16 max-w-lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="group relative">
              <label className="mb-1.5 block text-left font-mono text-xs text-white/40">
                {">"} NAME
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/20 focus:border-[#00ff88]/40 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
              />
            </div>

            {/* Email field */}
            <div className="group relative">
              <label className="mb-1.5 block text-left font-mono text-xs text-white/40">
                {">"} EMAIL
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/20 focus:border-[#00ff88]/40 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
              />
            </div>

            {/* Message field */}
            <div className="group relative">
              <label className="mb-1.5 block text-left font-mono text-xs text-white/40">
                {">"} MESSAGE
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 font-mono text-sm text-white outline-none backdrop-blur-sm transition-all duration-300 placeholder:text-white/20 focus:border-[#00ff88]/40 focus:shadow-[0_0_20px_rgba(0,255,136,0.08)]"
              />
            </div>

            {/* Submit button */}
            <MagneticButton strength={0.3}>
              <motion.button
                type="submit"
                disabled={formState === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex w-full items-center justify-center gap-2 rounded-lg border px-6 py-3.5 font-mono text-sm transition-all duration-300 ${
                  formState === "success"
                    ? "border-[#00ff88] bg-[#00ff88]/20 text-[#00ff88]"
                    : formState === "error"
                      ? "border-red-500/50 bg-red-500/10 text-red-400"
                      : "border-[#00ff88]/50 bg-[#00ff88]/10 text-[#00ff88] hover:border-[#00ff88] hover:bg-[#00ff88]/20 hover:shadow-[0_0_30px_rgba(0,255,136,0.2)]"
                }`}
              >
                {formState === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : formState === "success" ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    MESSAGE DELIVERED
                  </>
                ) : formState === "error" ? (
                  <>
                    <AlertCircle className="h-4 w-4" />
                    TRANSMISSION FAILED
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    [ TRANSMIT MESSAGE ]
                  </>
                )}
              </motion.button>
            </MagneticButton>
          </form>
        </motion.div>

        {/* Social links with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center justify-center gap-6"
        >
          {socialLinks.map((link, i) => (
            <MagneticButton key={link.name} as="a" href={link.href} target="_blank" rel="noopener noreferrer" strength={0.4} onClick={() => window.dispatchEvent(new CustomEvent("achievement:social"))}>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 1 + i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.2,
                  borderColor: "rgba(0,255,136,0.5)",
                  boxShadow: "0 0 25px rgba(0,255,136,0.3)",
                }}
                className="flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-white/50 transition-colors hover:text-[#00ff88]"
                aria-label={link.name}
              >
                <link.icon className="h-5 w-5" />
              </motion.div>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-2 font-mono text-xs text-white/40"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
          </span>
          <span>Available for new opportunities</span>
        </motion.div>
      </div>
    </section>
  )
}
