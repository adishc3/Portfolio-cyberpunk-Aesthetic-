import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dithering } from '@paper-design/shaders-react'
import './App.css'

const techItems = [
  'Python', 'Java', 'C++', 'JavaScript', 'React', 'Node.js',
  'HTML', 'CSS', 'FastAPI', 'MySQL', 'PostgreSQL', 'Docker',
  'Git', 'Generative AI', 'OOP', 'Data Structures',
]

const projects = [
  {
    name: 'Business Suite ERP',
    label: 'BUSINESS SUITE ERP',
    description: 'Multi-module ERP platform integrating HR, CRM, Tasks, Accounts and AI workflows.',
    tech: 'React • FastAPI • PostgreSQL',
  },
  {
    name: 'LearnAtWill LMS',
    label: 'LEARNATWILL LMS',
    description: 'Full-stack Learning Management System with authentication, course management and deployment on Render.',
    tech: 'React • FastAPI • PostgreSQL • Docker • Render',
  },
  {
    name: 'AI Trivia Game',
    label: 'AI TRIVIA GAME',
    description: 'Real-time multiplayer AI-powered quiz platform.',
    tech: 'Python • Generative AI',
  },
  {
    name: 'WhatToSee',
    label: 'WHATTOSEE',
    description: 'Movie discovery and reminder application.',
    tech: 'React • Node.js • MySQL',
  },
]

// ── Typewriter name chars ──
const nameChars = 'ADISH M'.split('')

// ── Section animation variants ──
const heroVariants = {
  active: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  exit: {
    y: -200,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

const projectsVariants = {
  inactive: {
    y: 200,
    opacity: 0,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
  active: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
}

// ── Typewriter stagger for hero name ──
const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.35 },
  },
}

const nameCharVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

// ── Staggered project rows ──
const projectContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.25 },
  },
}

const projectItemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

// ── Shader parallax ──
const shaderVariants = {
  hero: {
    scale: 1,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
  projects: {
    scale: 1.04,
    transition: { duration: 0.8, ease: 'easeInOut' },
  },
}

// ── Hero content stagger entrance ──
const heroContentVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.7 },
  },
}

const heroChildVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [section, setSection] = useState('hero')
  const [loading, setLoading] = useState(true)
  const containerRef = useRef(null)
  const wheelTimeoutRef = useRef(null)

  // ── Entrance animation delay ──
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  // ── Wheel / scroll handling ──
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      if (wheelTimeoutRef.current) return
      if (e.deltaY > 0 && section === 'hero') {
        setSection('projects')
        wheelTimeoutRef.current = setTimeout(() => {
          wheelTimeoutRef.current = null
        }, 800)
      } else if (e.deltaY < 0 && section === 'projects') {
        setSection('hero')
        wheelTimeoutRef.current = setTimeout(() => {
          wheelTimeoutRef.current = null
        }, 800)
      }
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [section])

  return (
    <div
      ref={containerRef}
      className={`page-shell ${isDarkMode ? 'shader-page dark' : 'shader-page light'}`}
    >
      {/* ── 12. Loading entrance overlay ── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── 2. Fixed shader background with subtle parallax ── */}
      <motion.div
        className="shader-bg"
        variants={shaderVariants}
        animate={section}
      >
        <Dithering
          style={{ width: '100%', height: '100%' }}
          colorBack={isDarkMode ? 'hsl(0, 0%, 0%)' : 'hsl(0, 0%, 96%)'}
          colorFront={isDarkMode ? 'hsl(320, 100%, 70%)' : 'hsl(210, 100%, 70%)'}
          shape="cat"
          type="4x4"
          pxSize={3}
          offsetX={0}
          offsetY={0}
          scale={0.8}
          rotation={0}
          speed={0.14}
        />
      </motion.div>

      {/* ── 1. Section scroll indicator ── */}
      <div className="section-indicator">
        <span className={`indicator-dot ${section === 'hero' ? 'active' : ''}`} />
        <span className={`indicator-dot ${section === 'projects' ? 'active' : ''}`} />
      </div>

      {/* ── Hero Screen ── */}
      <motion.section
        className="hero-screen"
        variants={heroVariants}
        animate={section === 'hero' ? 'active' : 'exit'}
        pointerEvents={section === 'hero' ? 'auto' : 'none'}
      >
        <div className="hero-layout">
          <div className="panel-left">
            {/* ── 4. Theme toggle with rotation animation ── */}
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setIsDarkMode((value) => !value)}
              aria-label="Toggle theme"
            >
              <motion.div
                key={isDarkMode ? 'moon' : 'sun'}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {isDarkMode ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </motion.div>
            </button>

            <div className="panel-inner">
              {/* ── 6. Typewriter hero name ── */}
              <div className="hero-block">
                <motion.h1
                  className="hero-name"
                  variants={nameContainerVariants}
                  initial="hidden"
                  animate={loading ? 'hidden' : 'visible'}
                >
                  {nameChars.map((char, i) => (
                    <motion.span
                      key={i}
                      variants={nameCharVariants}
                      className="hero-name-char"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </motion.h1>
                <motion.p
                  className="hero-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={loading ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
                  transition={{ delay: 0.85, duration: 0.45, ease: 'easeOut' }}
                >
                  Software Developer / AI Engineer
                </motion.p>
              </div>

              {/* Entrance-staggered content */}
              <motion.div
                variants={heroContentVariants}
                initial="hidden"
                animate={loading ? 'hidden' : 'visible'}
              >
                <motion.div variants={heroChildVariants} className="section-block">
                  <span className="section-title">Education</span>
                  <p className="section-heading">MCA</p>
                  <p className="section-copy">Mar Athanasius College of Engineering</p>
                  <p className="section-note">2025 → 2027</p>
                </motion.div>

                <motion.div variants={heroChildVariants} className="section-block">
                  <span className="section-title">Experience</span>
                  <p className="section-heading">AI Engineer Intern</p>
                  <p className="section-copy">Bheemverse Pvt Ltd</p>
                </motion.div>

                <motion.div variants={heroChildVariants} className="section-block">
                  <span className="section-title">Tech Stack</span>
                  <p className="tech-inline">{techItems.join(' • ')}</p>
                </motion.div>
              </motion.div>

              {/* ── 9. Scroll button with pulse ── */}
              <motion.button
                type="button"
                className="scroll-hint"
                onClick={() => setSection('projects')}
                variants={heroChildVariants}
                initial="hidden"
                animate={loading ? 'hidden' : 'visible'}
              >
                SCROLL TO EXPLORE
                <span className="scroll-arrow">↓</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Projects Screen ── */}
      <motion.section
        className="projects-screen"
        variants={projectsVariants}
        animate={section === 'projects' ? 'active' : 'inactive'}
        pointerEvents={section === 'projects' ? 'auto' : 'none'}
      >
        <div className="projects-layout">
          <div className="panel-left">
            <div className="panel-inner">
              <span className="projects-title">PROJECTS</span>

              {/* ── 8. Staggered project rows ── */}
              <motion.div
                variants={projectContainerVariants}
                initial="hidden"
                animate={section === 'projects' ? 'visible' : 'hidden'}
              >
                {projects.map((project) => (
                  <motion.div
                    key={project.name}
                    className="project-row"
                    variants={projectItemVariants}
                  >
                    <p className="project-label">{project.label}</p>
                    <p className="project-tech">{project.tech}</p>
                    <p className="project-copy">{project.description}</p>
                    <span className="project-divider" />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Social links ── */}
      <div className="social-links">
        <a href="https://github.com/adishc3" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.instagram.com/aadiiishhh?igsh=MXZhdGVpOHFkb2xhZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="mailto:adishadhiperalasseri@gmail.com">Email</a>
      </div>
    </div>
  )
}

export default App
