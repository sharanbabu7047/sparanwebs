import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ADVANTAGES } from '../data'
import { Heading } from './Reveal'

export default function Why() {
  const [i, setI] = useState(0)
  const A = ADVANTAGES[i], Icon = A.icon
  return (
    <section id="why" className="section">
      <div className="wrap">
        <Heading lead="Select a point to see what it means for your project.">Why choose SyntraWebs?</Heading>
        <div className="grid gap-12 lg:grid-cols-2">
          <ul role="tablist" aria-label="Advantages">
            {ADVANTAGES.map(({ icon: I, title }, k) => (
              <li key={title} className="border-b border-brand-border">
                <button role="tab" aria-selected={i === k} onClick={() => setI(k)} onMouseEnter={() => setI(k)}
                  className={`flex w-full items-center gap-4 px-2 py-4 text-left font-display text-xl font-semibold transition-all duration-300 hover:pl-5 ${i === k ? 'pl-5 text-white' : 'text-brand-muted'}`}>
                  <I size={22} className={i === k ? 'text-brand-cyan' : 'text-brand-ocean'} />{title}
                </button>
              </li>
            ))}
          </ul>
          <div role="tabpanel" aria-live="polite" className="flex min-h-[320px] flex-col justify-center rounded-3xl border border-brand-border p-6 sm:p-10 shadow-[0_0_50px_rgba(7,139,203,.12)]"
            style={{ background: 'radial-gradient(80% 80% at 80% 0%,rgba(7,139,203,.3),#080F19)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl border border-brand-border bg-brand-cyan/10 text-brand-cyan"><Icon size={30} /></span>
                <h3 className="mb-3 text-3xl font-bold">{A.title}</h3>
                <p>{A.desc}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8 h-1 overflow-hidden rounded bg-brand-border"><div className="h-full bg-brand-grad transition-all duration-500" style={{ width: `${((i + 1) / ADVANTAGES.length) * 100}%` }} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
