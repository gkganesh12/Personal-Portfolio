"use client"

import { useState, useEffect } from "react"
import { BootScreen } from "@/components/boot-screen"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { TechMarquee } from "@/components/tech-marquee"
import { OriginSection } from "@/components/origin-section"
import { CapabilitiesSection } from "@/components/capabilities-section"
import { GithubActivity } from "@/components/github-activity"
import { DeploymentsSection } from "@/components/deployments-section"
import { ThinkingLogsSection } from "@/components/thinking-logs-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TimelineSection } from "@/components/timeline-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ParticleField } from "@/components/particle-field"
import { SmoothScroll } from "@/components/smooth-scroll"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionReveal } from "@/components/section-reveal"
import { MatrixRain } from "@/components/matrix-rain"
import { Spotlight } from "@/components/spotlight"
import { CommandPalette } from "@/components/command-palette"
import { KonamiEasterEgg } from "@/components/konami-easter-egg"
import { InteractiveTerminal } from "@/components/interactive-terminal"
import { SoundProvider, SoundToggle } from "@/components/sound-toggle"
import { SectionNav } from "@/components/section-nav"
import { Achievements } from "@/components/achievements"

export default function Home() {
  const [bootState, setBootState] = useState<"booting" | "done">("booting")

  const handleBootComplete = () => {
    setTimeout(() => setBootState("done"), 100)
  }

  return (
    <>
      {/* Boot screen */}
      {bootState === "booting" && <BootScreen onComplete={handleBootComplete} />}

      {/* Main content */}
      {bootState === "done" && (
        <SoundProvider>
        <SmoothScroll>
          <main className="relative min-h-screen bg-black">
            {/* === GLOBAL EFFECTS === */}
            <CustomCursor />
            <ScrollProgress />
            <ParticleField />
            <MatrixRain />
            <Spotlight />
            <CommandPalette />
            <KonamiEasterEgg />
            <InteractiveTerminal />
            <SoundToggle />
            <Achievements />

            {/* === NAVIGATION === */}
            <Navigation />
            <SectionNav />

            {/* === SECTIONS === */}
            <HeroSection />

            <SectionReveal>
              <TechMarquee />
            </SectionReveal>

            <SectionReveal>
              <OriginSection />
            </SectionReveal>

            <SectionReveal>
              <CapabilitiesSection />
            </SectionReveal>

            <SectionReveal>
              <TimelineSection />
            </SectionReveal>

            <SectionReveal>
              <GithubActivity />
            </SectionReveal>

            <SectionReveal>
              <DeploymentsSection />
            </SectionReveal>

            <SectionReveal>
              <ThinkingLogsSection />
            </SectionReveal>

            <SectionReveal>
              <TestimonialsSection />
            </SectionReveal>

            <SectionReveal>
              <ContactSection />
            </SectionReveal>

            {/* === FOOTER === */}
            <Footer />

            {/* Noise texture */}
            <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]">
              <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')]" />
            </div>

            {/* Ctrl+K hint */}
            <div className="fixed bottom-6 left-6 z-[90] hidden items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 font-mono text-xs text-white/30 backdrop-blur-lg md:flex">
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">Ctrl</kbd>
              <span>+</span>
              <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">K</kbd>
              <span className="ml-1">Command</span>
            </div>
          </main>
        </SmoothScroll>
        </SoundProvider>
      )}
    </>
  )
}
