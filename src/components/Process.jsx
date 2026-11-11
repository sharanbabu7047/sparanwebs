import { useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STEPS } from '../data'
import { Heading } from './Reveal'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const ref = useRef(null)
  const [p, setP] = useState(0)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (reduced) { setP(1); return }
    const st = ScrollTrigger.create({ trigger: ref.current, start: 'top 70%', end: 'bottom 55%', scrub: 0.4, onUpdate: (s) => setP(s.progress) })
    const t = setTimeout(() => ScrollTrigger.refresh(), 1200)
    return () => { st.kill(); clearTimeout(t) }
  }, [reduced])

  return (
    <section id="process" className="section">
      <div className="wrap">
        <Heading lead="Five steps from first conversation to ongoing support.">Our development process</Heading>
        <ol ref={ref} className="relative grid grid-cols-5 gap-4 pt-12 max-md:grid-cols-1 max-md:gap-9 max-md:pl-[4.4rem] max-md:pt-0">
          <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-[calc(3rem+33px)] h-[3px] bg-brand-border max-md:bottom-0 max-md:left-8 max-md:right-auto max-md:top-0 max-md:h-auto max-md:w-[3px]">
            <div className="h-full w-[calc(var(--p)*100%)] bg-brand-grad shadow-[0_0_14px_#20D5F5] max-md:h-[calc(var(--p)*100%)] max-md:w-full" style={{ '--p': p }} />
          </div>
          {STEPS.map(({ icon: Icon, title, desc }, i) => {
            const lit = p >= (i + 0.3) / STEPS.length || (p > 0 && i === 0)
            return (
              <li key={title} className="relative text-center max-md:text-left">
                <div className={`relative z-[1] mx-auto mb-5 grid h-[66px] w-[66px] place-items-center rounded-full border-2 bg-brand-bg transition-all duration-500 max-md:absolute max-md:-left-[4.4rem] max-md:top-0 max-md:mx-0 max-md:mb-0 ${lit ? 'scale-110 border-brand-cyan text-brand-cyan shadow-[0_0_26px_#20D5F5,inset_0_0_14px_rgba(32,213,245,.4)]' : 'border-brand-border text-brand-muted'}`}><Icon size={26} /></div>
                <h3 className="mb-1 text-xl font-semibold">{title}</h3>
                <p className="text-[.95rem]">{desc}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
