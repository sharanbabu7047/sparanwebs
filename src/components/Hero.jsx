import { lazy, Suspense, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronsUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleNetwork from './ParticleNetwork'
import { useSite } from '../context'

const HeroScene = lazy(() => import('./HeroScene'))
const HEADLINE = 'We Build Websites That Make Businesses Move Forward'
const WORDS = HEADLINE.split(' ')
let seen = false

export default function Hero() {
  const { goTo } = useSite()
  const reduced = useReducedMotion()
  const base = seen ? 0.05 : 0.35

  useEffect(() => { seen = true }, [])

  const fade = (d) => reduced ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { delay: base + d, duration: 0.7, ease: 'easeOut' } }

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-28"
      style={{ background: 'radial-gradient(60% 55% at 78% 45%,rgba(7,139,203,.26),transparent 70%),radial-gradient(45% 40% at 10% 100%,rgba(7,82,140,.35),transparent 70%)' }}>
      <Suspense fallback={null}><HeroScene /></Suspense>
      <ParticleNetwork count={60} interactive />
      <div className="wrap relative grid items-center gap-8 lg:grid-cols-[1.2fr_.8fr]">
        <div>
          <h1 aria-label={HEADLINE} className="text-[clamp(2.1rem,5.5vw,5.2rem)] font-extrabold leading-[1.08] tracking-tight">
            {WORDS.map((w, i) => (
              <motion.span key={i} aria-hidden="true" className={`mr-[.22em] inline-block ${i >= WORDS.length - 2 ? 'gradient-text' : ''}`}
                initial={reduced ? false : { opacity: 0, y: 40, rotateX: -20 }} animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: base + 0.08 + i * 0.05, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}>{w}</motion.span>
            ))}
          </h1>
          <motion.p className="mb-8 mt-5 max-w-[46ch] text-base sm:text-xl text-brand-muted" {...fade(0.3)}>From ambitious ideas to powerful digital experiences. We design, develop and deliver websites that make an impact.</motion.p>
          <motion.div className="flex flex-wrap gap-3.5 sm:gap-4" {...fade(0.45)}>
            <button type="button" onClick={() => goTo('contact')} className="btn-primary">Start Your Project</button>
            <Link to="/work" className="btn">Explore Our Work</Link>
          </motion.div>
        </div>
        <div className="pointer-events-none relative order-first min-h-[220px] sm:min-h-[260px] lg:order-none lg:min-h-[440px]" aria-hidden="true">
          <div className="absolute inset-0 m-auto aspect-square w-3/4 rounded-full bg-[radial-gradient(circle,rgba(32,213,245,.2),transparent_70%)] blur-2xl" />
        </div>
      </div>
      <button type="button" onClick={() => goTo('services')} aria-label="Scroll to services" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-brand-cyan">
        <motion.span className="block" animate={reduced ? {} : { y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronsUp size={28} /></motion.span>
      </button>
    </section>
  )
}
