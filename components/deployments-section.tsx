"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import ReactDOM from "react-dom"
import { ExternalLink, Github, X } from "lucide-react"
import { HolographicCard } from "./holographic-card"
import { TextReveal } from "./text-reveal"
import { MagneticButton } from "./magnetic-button"
import { GlitchText } from "./glitch-text"

interface Project {
  id: string
  codename: string
  title: string
  description: string
  fullDescription: string
  features: string[]
  techStack: string[]
  tech: string[]
  status: string
  github: string
  demo: string
  live: string
  accent: string
}

const projects: Project[] = [
  {
    id: "001",
    codename: "CYBER_SENTINEL",
    title: "CyberSentinel",
    description:
      "Enterprise-grade cybersecurity platform with AI-powered threat detection designed for SMBs.",
    fullDescription:
      "CyberSentinel is a comprehensive cybersecurity platform that combines AI-driven threat detection with enterprise security best practices, tailored for small and medium businesses. It provides real-time monitoring, automated threat response, and security posture assessment to protect organizations from evolving cyber threats.",
    features: [
      "AI-powered real-time threat detection and alerting",
      "Automated incident response playbooks",
      "Security posture dashboard with risk scoring",
      "Designed specifically for SMB infrastructure",
    ],
    techStack: ["TypeScript", "React", "Node.js", "AI/ML", "Docker", "Redis"],
    tech: ["TypeScript", "React", "AI/ML", "Node.js"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/CyberSentinel",
    demo: "",
    live: "",
    accent: "#00ff88",
  },
  {
    id: "002",
    codename: "GANESH_XPLOIT",
    title: "GaneshXploit AI IDE",
    description:
      "AI-powered IDE for security researchers and red-teamers with exploit templates and vulnerability scanning.",
    fullDescription:
      "GaneshXploit is a specialized AI-powered integrated development environment built for security researchers and red-team operators. It features built-in exploit templates, automated vulnerability scanning, intelligent code suggestions for security tools, and a streamlined workflow for penetration testing and security research.",
    features: [
      "AI-assisted exploit development and code generation",
      "Built-in vulnerability scanning engine",
      "Pre-loaded exploit templates and payloads",
      "Integrated terminal with security toolchain",
    ],
    techStack: ["TypeScript", "React", "AI/ML", "Node.js", "Python", "WebSocket"],
    tech: ["TypeScript", "AI/ML", "React", "Python"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/GaneshXploit-AI-IDE",
    demo: "",
    live: "",
    accent: "#ff79c6",
  },
  {
    id: "003",
    codename: "NIRVANA",
    title: "Nirvana - Alert Intelligence",
    description:
      "A lightweight layer on top of monitoring tools that reduces alert noise and prevents missed critical alerts.",
    fullDescription:
      "Nirvana is an intelligent alerting layer that sits on top of existing monitoring infrastructure. It uses smart deduplication, correlation, and prioritization to cut through alert noise, ensuring critical incidents are never missed while reducing on-call fatigue. It makes every alert actionable with automated context enrichment.",
    features: [
      "Intelligent alert deduplication and correlation",
      "Priority-based routing to prevent alert fatigue",
      "Automated context enrichment for faster triage",
      "Seamless integration with existing SIEM and monitoring tools",
    ],
    techStack: ["TypeScript", "React", "Node.js", "Redis", "PostgreSQL", "Docker"],
    tech: ["TypeScript", "React", "Node.js", "Redis"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/Nirvana",
    demo: "",
    live: "",
    accent: "#00d4ff",
  },
  {
    id: "004",
    codename: "HEALTH_PORTAL",
    title: "Healthcare Portal",
    description:
      "Comprehensive digital healthcare management system for patients, doctors, and administrators.",
    fullDescription:
      "A full-stack healthcare management platform enabling seamless interaction between patients, doctors, and hospital administrators. Features include appointment scheduling, medical records management, prescription tracking, and role-based dashboards for each user type.",
    features: [
      "Multi-role system: patients, doctors, and admins",
      "Appointment scheduling with calendar integration",
      "Medical records and prescription management",
      "Role-based dashboards with analytics",
    ],
    techStack: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "JWT"],
    tech: ["JavaScript", "React", "Node.js", "MongoDB"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/healthCarePortal",
    demo: "",
    live: "",
    accent: "#50fa7b",
  },
  {
    id: "005",
    codename: "THERMAL_DETECT",
    title: "Thermal Threat Detection",
    description:
      "Deep learning and NLP-powered system for thermal threat detection and analysis.",
    fullDescription:
      "An advanced threat detection system that combines thermal imaging analysis with deep learning models and NLP for comprehensive threat assessment. The system processes thermal data streams in real-time, identifies potential threats, and generates natural language reports for security operators.",
    features: [
      "Real-time thermal image analysis with deep learning",
      "NLP-powered threat report generation",
      "Multi-sensor data fusion pipeline",
      "Automated alerting and threat classification",
    ],
    techStack: ["Python", "TensorFlow", "OpenCV", "NLP", "Flask", "Docker"],
    tech: ["Python", "TensorFlow", "NLP", "OpenCV"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/thermal-threat-detection",
    demo: "",
    live: "",
    accent: "#f1fa8c",
  },
  {
    id: "006",
    codename: "ACHIEVEMENTS_3D",
    title: "3D Achievements Museum",
    description:
      "An immersive 3D virtual museum showcasing achievements, certifications, and projects using Three.js.",
    fullDescription:
      "A fully interactive 3D virtual museum built with React Three Fiber where visitors can walk through exhibits of achievements, certifications, and project showcases. Features realistic lighting, physics-based interactions, and an immersive first-person navigation experience.",
    features: [
      "Immersive 3D environment with first-person navigation",
      "Interactive exhibit displays with hover effects",
      "Realistic lighting and shadow rendering",
      "Responsive design with WebGL fallbacks",
    ],
    techStack: ["TypeScript", "React", "Three.js", "React Three Fiber", "Drei", "Vite"],
    tech: ["TypeScript", "Three.js", "React", "R3F"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/achivements-3d",
    demo: "",
    live: "",
    accent: "#bd93f9",
  },
  {
    id: "007",
    codename: "MANIMAALA",
    title: "ManiMaala E-Commerce",
    description:
      "Complete e-commerce solution with authentication, product management, cart, wishlist, orders, and payments.",
    fullDescription:
      "ManiMaala is a production-ready e-commerce platform featuring full user authentication, product catalog with search and filters, shopping cart, wishlist, order management, and integrated payment processing. Built with a modern TypeScript stack for performance and maintainability.",
    features: [
      "Full authentication with role-based access",
      "Product catalog with search, filters, and categories",
      "Shopping cart and wishlist management",
      "Order tracking and payment integration",
    ],
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "Stripe", "Tailwind"],
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/ManiMaala-E-Com-Store",
    demo: "",
    live: "",
    accent: "#ff79c6",
  },
  {
    id: "008",
    codename: "FAKE_NEWS_AI",
    title: "Fake News Detector",
    description:
      "AI-powered fake news detection using NLP and machine learning with a Streamlit web interface.",
    fullDescription:
      "An intelligent fake news detection system that leverages natural language processing and machine learning models to analyze news articles and classify them as real or fake. Features a user-friendly Streamlit interface for real-time analysis and model explainability.",
    features: [
      "NLP-based text analysis and feature extraction",
      "Multiple ML models with ensemble predictions",
      "Interactive Streamlit web interface",
      "Model explainability and confidence scoring",
    ],
    techStack: ["Python", "Scikit-learn", "NLP", "Streamlit", "Pandas", "NLTK"],
    tech: ["Python", "NLP", "Scikit-learn", "Streamlit"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/Fake_News_Detector",
    demo: "",
    live: "",
    accent: "#8be9fd",
  },
  {
    id: "009",
    codename: "PRIVACY_GEN",
    title: "Privacy-Preserving Data Generator",
    description:
      "Generates realistic synthetic tabular data with Differential Privacy for sensitive domains.",
    fullDescription:
      "A privacy-first synthetic data generation tool that produces realistic tabular datasets while guaranteeing differential privacy. Designed for healthcare, finance, and other sensitive domains where real data cannot be shared. The generator preserves statistical properties while ensuring individual records cannot be re-identified.",
    features: [
      "Differential privacy guarantees with configurable epsilon",
      "Statistical property preservation in synthetic data",
      "Support for multiple tabular data formats",
      "Built for healthcare and financial compliance",
    ],
    techStack: ["Python", "PyTorch", "Differential Privacy", "Pandas", "NumPy", "Scikit-learn"],
    tech: ["Python", "PyTorch", "Privacy", "ML"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/Privacy-Preserving-Synthetic-Data-Generator",
    demo: "",
    live: "",
    accent: "#00ff88",
  },
  {
    id: "010",
    codename: "XRAY_DECIDE",
    title: "X-Ray Decision Transparency",
    description:
      "Production-grade decision transparency system providing visibility into multi-step algorithmic systems.",
    fullDescription:
      "X-Ray Decision Transparency System provides 'why' visibility into complex, multi-step algorithmic decision-making processes. It traces decision paths, logs reasoning at each step, and presents human-readable explanations — essential for compliance, debugging, and building trust in automated systems.",
    features: [
      "End-to-end decision path tracing",
      "Human-readable explanation generation",
      "Multi-step algorithm audit logging",
      "Compliance-ready reporting dashboard",
    ],
    techStack: ["TypeScript", "React", "Node.js", "GraphQL", "PostgreSQL", "D3.js"],
    tech: ["TypeScript", "React", "GraphQL", "D3.js"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/X-Ray-Decision-Transparency-System",
    demo: "",
    live: "",
    accent: "#f1fa8c",
  },
  {
    id: "011",
    codename: "SWARM_SCOPE",
    title: "SwarmScope",
    description:
      "Swarm intelligence monitoring and analysis platform for distributed agent systems.",
    fullDescription:
      "SwarmScope is a monitoring and analysis tool for swarm-based distributed systems. It provides real-time visualization of agent behaviors, communication patterns, and emergent swarm intelligence metrics, enabling researchers and developers to understand and optimize multi-agent systems.",
    features: [
      "Real-time swarm agent monitoring",
      "Communication pattern visualization",
      "Emergent behavior detection and analysis",
      "Configurable agent simulation parameters",
    ],
    techStack: ["Python", "Flask", "WebSocket", "D3.js", "NumPy", "Redis"],
    tech: ["Python", "Flask", "WebSocket", "D3.js"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/SwarmScope",
    demo: "",
    live: "",
    accent: "#00d4ff",
  },
  {
    id: "012",
    codename: "VIBE_CTX",
    title: "Vibe Context - VS Code Extension",
    description:
      "VS Code/Cursor extension that captures and preserves coding intent during development sessions.",
    fullDescription:
      "Gk's Vibe Context is a developer productivity extension for VS Code and Cursor that captures your coding context and intent as you work. It preserves the 'why' behind code changes, making it easier to resume work after breaks and share context with teammates.",
    features: [
      "Automatic coding intent capture",
      "Session-based context preservation",
      "Seamless VS Code and Cursor integration",
      "Context sharing for team collaboration",
    ],
    techStack: ["TypeScript", "VS Code API", "Node.js", "JSON", "Markdown"],
    tech: ["TypeScript", "VS Code API", "Node.js"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/Gk-s-Vibe-context",
    demo: "",
    live: "",
    accent: "#bd93f9",
  },
  {
    id: "013",
    codename: "CANCER_PREDICT",
    title: "Breast Cancer Prediction Model",
    description:
      "Training and fine-tuning a Decision Tree Classifier to predict breast cancer outcomes.",
    fullDescription:
      "A machine learning project focused on predicting breast cancer diagnosis outcomes using a fine-tuned Decision Tree Classifier. The model is trained on clinical data with feature engineering, cross-validation, and hyperparameter optimization to achieve high accuracy in classifying malignant vs benign tumors.",
    features: [
      "Decision Tree Classifier with hyperparameter tuning",
      "Feature importance analysis and selection",
      "Cross-validation for robust performance metrics",
      "Jupyter notebook with full analysis pipeline",
    ],
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
    tech: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/Breast_cancer_Prediction_model",
    demo: "",
    live: "",
    accent: "#50fa7b",
  },
  {
    id: "014",
    codename: "AI_CHATBOT",
    title: "AI Chatbot",
    description:
      "Full-stack AI chatbot application built with Flask backend and React frontend.",
    fullDescription:
      "A conversational AI chatbot featuring a Flask-powered backend for NLP processing and a React frontend for a smooth chat experience. The bot handles multi-turn conversations, maintains context, and provides intelligent responses across various topics.",
    features: [
      "Multi-turn conversation with context retention",
      "Flask REST API for NLP processing",
      "React-based responsive chat interface",
      "Real-time message streaming",
    ],
    techStack: ["JavaScript", "React", "Flask", "Python", "NLP", "REST API"],
    tech: ["JavaScript", "React", "Flask", "Python"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/ai-chatbot-by-GK",
    demo: "",
    live: "",
    accent: "#8be9fd",
  },
  {
    id: "015",
    codename: "WEB_CRAWLER",
    title: "Google Search Web Crawler",
    description:
      "Production-ready Python app for digital marketing that crawls Google search results and sends HTML email reports.",
    fullDescription:
      "A production-grade web crawler designed for digital marketing teams. It crawls Google search results for specified keywords, extracts relevant data, and automatically compiles and sends beautifully formatted HTML email reports — automating competitive analysis and SEO monitoring.",
    features: [
      "Automated Google search result crawling",
      "Keyword-based competitive analysis",
      "HTML email report generation and delivery",
      "Configurable scheduling and keyword lists",
    ],
    techStack: ["Python", "BeautifulSoup", "Requests", "SMTP", "HTML", "Cron"],
    tech: ["Python", "BeautifulSoup", "SMTP", "HTML"],
    status: "ACTIVE",
    github: "https://github.com/gkganesh12/web-crawler",
    demo: "",
    live: "",
    accent: "#ff79c6",
  },
  {
    id: "016",
    codename: "SMS_GUARD",
    title: "SMS Spam Detection",
    description:
      "Machine learning project for detecting SMS spam using Naive Bayes and SVM classifiers.",
    fullDescription:
      "An ML-powered SMS spam detection system that classifies text messages as spam or legitimate using Naive Bayes and Support Vector Machine algorithms. Features comprehensive text preprocessing, TF-IDF vectorization, and model comparison to select the best performing classifier.",
    features: [
      "Naive Bayes and SVM classifier comparison",
      "TF-IDF text vectorization pipeline",
      "Comprehensive text preprocessing",
      "Performance metrics and confusion matrix analysis",
    ],
    techStack: ["Python", "Scikit-learn", "NLTK", "Pandas", "Jupyter", "Matplotlib"],
    tech: ["Python", "Scikit-learn", "NLTK", "Jupyter"],
    status: "DEPLOYED",
    github: "https://github.com/gkganesh12/Sms-Spam-Detection",
    demo: "",
    live: "",
    accent: "#f1fa8c",
  },
]

// ---------------------------------------------------------------------------
// Modal overlay
// ---------------------------------------------------------------------------

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 40,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  // Stop Lenis smooth scroll while modal is open
  useEffect(() => {
    const lenis = (window as any).__lenis
    if (lenis) lenis.stop()
    // Prevent body scroll as fallback
    document.body.style.overflow = "hidden"
    return () => {
      if (lenis) lenis.start()
      document.body.style.overflow = ""
    }
  }, [])

  // Close on Escape key
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  return ReactDOM.createPortal(
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onWheel={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-2xl max-h-[85dvh] overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-[#0a0a0f] p-4 sm:p-6 md:p-8 shadow-2xl"
        style={{
          boxShadow: `0 0 80px ${project.accent}15, 0 0 30px ${project.accent}08`,
        }}
      >
        {/* Accent top border */}
        <div
          className="absolute left-0 top-0 h-[2px] w-full rounded-t-xl"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors hover:border-white/30 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ID + Codename */}
        <div className="mb-1 flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: project.accent }}>
            [{project.id}]
          </span>
          <span className="font-mono text-xs tracking-wider text-white/40">
            {project.codename}
          </span>
        </div>

        {/* Title with GlitchText */}
        <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
          <GlitchText>{project.title}</GlitchText>
        </h3>

        {/* Status badge */}
        <div className="mb-6 flex items-center gap-2">
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
          <span
            className="rounded border px-2 py-0.5 font-mono text-xs"
            style={{
              color: project.accent,
              borderColor: `${project.accent}40`,
              backgroundColor: `${project.accent}10`,
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Full description */}
        <p className="mb-6 text-sm leading-relaxed text-white/70">
          {project.fullDescription}
        </p>

        {/* Key features */}
        <div className="mb-6">
          <h4 className="mb-3 font-mono text-xs tracking-widest text-white/40">
            // KEY FEATURES
          </h4>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className="flex items-start gap-2 text-sm text-white/60"
              >
                <span
                  className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: project.accent }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Tech stack tags */}
        <div className="mb-8">
          <h4 className="mb-3 font-mono text-xs tracking-widest text-white/40">
            // TECH STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="rounded border px-3 py-1 font-mono text-xs transition-colors"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}30`,
                  backgroundColor: `${project.accent}10`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <MagneticButton as="a" href={project.github} target="_blank" rel="noopener noreferrer" strength={0.2}>
              <span className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:border-white/20 hover:text-[#00ff88]">
                <Github className="h-4 w-4" />
                <span>SOURCE CODE</span>
              </span>
            </MagneticButton>
          )}
          {project.live && (
            <MagneticButton as="a" href={project.live} target="_blank" rel="noopener noreferrer" strength={0.2}>
              <span className="flex items-center gap-2 rounded border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs text-white/60 transition-colors hover:border-white/20 hover:text-[#00ff88]">
                <ExternalLink className="h-4 w-4" />
                <span>LIVE DEMO</span>
              </span>
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------

export function DeploymentsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeProject, setActiveProject] = useState<Project | null>(null)

  const closeModal = useCallback(() => setActiveProject(null), [])

  return (
    <section
      id="deployments"
      ref={ref}
      className="relative min-h-screen px-6 py-24"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-[#00ff88] opacity-[0.05] blur-[100px]" />

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
            Real projects from my GitHub. Each deployment represents a
            problem solved and skills sharpened in the field.
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
                <div
                  onClick={() => setActiveProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      setActiveProject(project)
                    }
                  }}
                  className="group relative h-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,255,136,0.08)]"
                >
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
                      <span
                        className="inline-flex h-2 w-2 rounded-full"
                        style={{ backgroundColor: project.accent }}
                      />
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
                    {project.tech.map((tech) => (
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
                    {project.github && (
                      <MagneticButton
                        as="a"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        strength={0.2}
                      >
                        <span
                          className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-4 w-4" />
                          <span>SOURCE</span>
                        </span>
                      </MagneticButton>
                    )}
                    {project.demo && (
                      <MagneticButton
                        as="a"
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        strength={0.2}
                      >
                        <span
                          className="flex items-center gap-2 font-mono text-xs text-white/50 transition-colors hover:text-[#00ff88]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>DEPLOY</span>
                        </span>
                      </MagneticButton>
                    )}
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
          <MagneticButton as="a" href="https://github.com/gkganesh12?tab=repositories" target="_blank" rel="noopener noreferrer" strength={0.3}>
            <span className="inline-flex items-center gap-2 font-mono text-sm text-white/50 transition-colors hover:text-[#00ff88]">
              <span>{"[ VIEW ALL DEPLOYMENTS ON GITHUB \u2192"}</span>
              <span>{"]"}</span>
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {activeProject && (
          <ProjectModal project={activeProject} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  )
}
