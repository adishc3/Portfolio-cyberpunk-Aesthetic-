import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Dithering } from '@paper-design/shaders-react'
import './App.css'

const techItems = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'React',
  'Node.js',
  'HTML',
  'CSS',
  'FastAPI',
  'MySQL',
  'PostgreSQL',
  'Docker',
  'Git',
  'Generative AI',
  'OOP',
  'Data Structures',
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [section, setSection] = useState('hero') // 'hero' or 'projects'
  const containerRef = useRef(null)
  const wheelTimeoutRef = useRef(null)

  // Handle wheel/scroll events to switch between screens
  useEffect(() => {
    const handleWheel = (e) => {
      // Prevent default scroll behavior
      e.preventDefault()

      // Debounce rapid wheel events
      if (wheelTimeoutRef.current) return

      if (e.deltaY > 0 && section === 'hero') {
        // Scroll down: switch to projects
        setSection('projects')
        wheelTimeoutRef.current = setTimeout(() => {
          wheelTimeoutRef.current = null
        }, 800)
      } else if (e.deltaY < 0 && section === 'projects') {
        // Scroll up: switch to hero
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

  // Animation variants for Hero screen
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

  // Animation variants for Projects screen
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

  return (
    <div
      ref={containerRef}
      className={`page-shell ${isDarkMode ? 'shader-page dark' : 'shader-page light'}`}
    >
      {/* Fixed shader background — does NOT animate with the sections */}
      <div className="shader-bg">
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
      </div>

      {/* Hero Screen */}
      <motion.section
        className="hero-screen"
        variants={heroVariants}
        animate={section === 'hero' ? 'active' : 'exit'}
        pointerEvents={section === 'hero' ? 'auto' : 'none'}
      >
        <div className="hero-layout">
          <div className="panel-left">
            <button
              type="button"
              className="theme-toggle"
              onClick={() => setIsDarkMode((value) => !value)}
              aria-label="Toggle theme"
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
            </button>

            <div className="panel-inner">
              <div className="hero-block">
                <h1 className="hero-name">ADISH M</h1>
                <p className="hero-title">Software Developer / AI Engineer</p>
              </div>

              <div className="section-block">
                <span className="section-title">Education</span>
                <p className="section-heading">MCA</p>
                <p className="section-copy">Mar Athanasius College of Engineering</p>
                <p className="section-note">2025 → 2027</p>
              </div>

              <div className="section-block">
                <span className="section-title">Experience</span>
                <p className="section-heading">AI Engineer Intern</p>
                <p className="section-copy">Bheemverse Pvt Ltd</p>
              </div>

              <div className="section-block">
                <span className="section-title">Tech Stack</span>
                <p className="tech-inline">{techItems.join(' • ')}</p>
              </div>

              <button
                type="button"
                className="scroll-hint"
                onClick={() => setSection('projects')}
              >
                SCROLL TO EXPLORE
              </button>
            </div>
          </div>
        </div>

      </motion.section>

      {/* Projects Screen */}
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

              {projects.map((project) => (
                <div key={project.name} className="project-row">
                  <p className="project-label">{project.label}</p>
                  <p className="project-tech">{project.tech}</p>
                  <p className="project-copy">{project.description}</p>
                  <span className="project-divider" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </motion.section>

      {/* Social links — rendered once at root level for reliable clickability */}
      <div className="social-links">
        <a href="https://github.com/adishc3" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.instagram.com/aadiiishhh?igsh=MXZhdGVpOHFkb2xhZQ%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="mailto:adishadhiperalasseri@gmail.com">Email</a>
      </div>
    </div>
  )
}

export default App
