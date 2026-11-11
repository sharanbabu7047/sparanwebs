import { useState } from 'react'
import ProjectGrid from '../components/Projects'
import { Heading } from '../components/Reveal'
import { PROJECTS } from '../data'

export default function WorkPage() {
  const cats = ['All', ...new Set(PROJECTS.map((p) => p.category))]
  const [cat, setCat] = useState('All')
  return (
    <section className="section pt-40">
      <div className="wrap">
        <Heading as="h1" lead="Genuine client builds, featured portfolios, and active projects in development. Select a project for details.">Our <span className="gradient-text">work</span></Heading>
        <div className="mb-10 flex flex-wrap gap-2.5" role="group" aria-label="Filter projects">
          {cats.map((c) => <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`rounded-full border px-4 py-2 text-[.95rem] transition ${cat === c ? 'border-brand-cyan text-white' : 'border-brand-border hover:border-brand-cyan hover:text-white'}`}>{c}</button>)}
        </div>
        <ProjectGrid category={cat} />
      </div>
    </section>
  )
}
