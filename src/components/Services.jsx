import { ArrowRight } from 'lucide-react'
import { SERVICES, TECH } from '../data'
import { useSite } from '../context'
import Reveal, { Heading } from './Reveal'
import TiltCard from './TiltCard'

export function Marquee() {
  const list = [...TECH, ...TECH]
  return (
    <div className="overflow-hidden border-y border-brand-border bg-brand-surface/40 py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-14 font-display text-lg font-semibold text-brand-ocean">{list.map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  )
}

export default function Services() {
  const { goTo } = useSite()
  return (
    <section id="services" className="section">
      <div className="wrap">
        <Heading lead="Choose a service to start a project. We’ll pre-fill your enquiry.">Everything your website needs, <span className="gradient-text">built in-house.</span></Heading>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }, i) => (
            <li key={title}>
              <Reveal delay={(i % 4) * 0.08} className="h-full">
                <TiltCard className="glass h-full rounded-[20px] transition-[border-color,box-shadow] duration-300 hover:border-brand-cyan hover:shadow-[0_0_36px_rgba(32,213,245,.2)]">
                  <button type="button" onClick={() => goTo('contact', title)} className="relative block h-full w-full p-7 text-left">
                    <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-brand-border bg-brand-cyan/10 text-brand-cyan transition duration-500 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-cyan/20 group-hover:shadow-glow"><Icon size={26} /></span>
                    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                    <p className="mb-4 text-[.95rem]">{desc}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-cyan">Start this project <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span>
                  </button>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
