import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { SiteProvider } from './context'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'

const TITLES = { '/': 'SparanWebs – Premium Web Development Studio', '/work': 'Our Work – SparanWebs', '/about': 'About – SparanWebs' }

export default function App() {
  const loc = useLocation()
  const reduced = useReducedMotion()
  const [loading, setLoading] = useState(true)
  const mounted = useRef(false)

  useEffect(() => { const t = setTimeout(() => setLoading(false), reduced ? 0 : 500); return () => clearTimeout(t) }, [reduced])
  useEffect(() => { document.title = TITLES[loc.pathname] || TITLES['/'] }, [loc.pathname])
  useEffect(() => { mounted.current = true }, [])

  return (
    <SiteProvider>
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main key={loc.pathname} initial={reduced ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -24 }} transition={{ duration: 0.4 }}>
          <Routes location={loc}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
      {mounted.current && !reduced && (
        <motion.div key={'wipe' + loc.pathname} aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]"
          style={{ background: 'linear-gradient(100deg,#050A12 40%,#07528C,#20D5F5 60%,#050A12 62%)' }}
          initial={{ x: '-110%' }} animate={{ x: '110%' }} transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }} />
      )}
    </SiteProvider>
  )
}
