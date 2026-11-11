import { useLayoutEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSite } from '../context'
import { Mission, Visual } from '../components/AboutIntro'
import Reveal from '../components/Reveal'

gsap.registerPlugin(ScrollTrigger)
const STATEMENT = 'We turn ideas into powerful digital experiences by combining creative design, modern technology and complete full-stack development.'
const PILLARS = [
  ['Who we are', 'A web studio that designs and builds every site from scratch.'],
  ['What we do', 'Design, frontend, backend and deployment under one roof.'],
  ['Our vision', 'A site that feels world-class for every business, creator and student.'],
  ['Our approach', 'Listen first, design with intent, ship fast and keep improving.'],
]

export default function AboutPage() {
  const { goTo } = useSite()
  const ref = useRef(null)
  const reduced = useReducedMotion()
  useLayoutEffect(() => {
    if (reduced) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.word', { opacity: 0.18 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top 80%', end: 'bottom 45%', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section className="section pt-40">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Reveal><h1 className="mb-8 text-[clamp(2.4rem,5.5vw,4.4rem)] font-bold leading-[1.05]">About <span className="gradient-text">SparanWebs</span></h1></Reveal>
          <p ref={ref} className="font-display text-[clamp(1.5rem,3.2vw,2.4rem)] font-bold leading-tight text-white" aria-label={STATEMENT}>
            {STATEMENT.split(' ').map((w, i) => <span key={i} aria-hidden="true" className="word mr-[.25em] inline-block">{w}</span>)}
          </p>
          <Mission />
          <div className="grid gap-5 sm:grid-cols-2">
            {PILLARS.map(([t, d]) => <div key={t} className="border-l-2 border-brand-ocean pl-4"><h3 className="mb-1 text-base font-semibold">{t}</h3><p className="text-[.95rem]">{d}</p></div>)}
          </div>
          <div className="mt-9"><button type="button" className="btn-primary" onClick={() => goTo('contact')}>Start Your Project</button></div>
        </div>
        <Visual />
      </div>
    </section>
  )
}
