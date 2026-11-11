import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data'
import Reveal from './Reveal'

function Card({ p, i }) {
  const CardMedia = (
    <div className="relative aspect-[16/10] overflow-hidden bg-brand-bg">
      {p.img ? (
        <img
          src={p.img}
          alt={`${p.name} preview`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-6 text-center" style={{ background: `linear-gradient(135deg,#050A12,${p.hue}33)` }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            In Active Development
          </span>
          <span className="text-xs text-brand-muted">Preview available upon launch</span>
        </div>
      )}
    </div>
  )

  return (
    <Reveal delay={i * 0.1}>
      <article className="group [perspective:1200px]">
        <div className="transition-transform duration-500 sm:[transform:rotateY(-5deg)_rotateX(2deg)] group-hover:[transform:none]">
          <div className="overflow-hidden rounded-[14px] border border-brand-border bg-brand-navy shadow-[0_30px_60px_rgba(0,0,0,.5),0_0_30px_rgba(7,139,203,.15)] transition duration-300 group-hover:border-brand-cyan/60 group-hover:shadow-[0_20px_50px_rgba(32,213,245,.2)]">
            <div className="flex items-center gap-1.5 border-b border-brand-border bg-brand-surface px-3.5 py-2.5">
              {[0, 1, 2].map((d) => <i key={d} className="h-2.5 w-2.5 rounded-full bg-brand-border" />)}
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="ml-2 flex-1 truncate rounded-full bg-brand-bg px-3 py-0.5 text-xs not-italic text-brand-muted hover:text-brand-cyan transition-colors" title={`Visit ${p.url}`}>
                  {p.url.replace(/^https?:\/\//, '')}
                </a>
              ) : (
                <em className="ml-2 flex-1 rounded-full bg-brand-bg px-3 py-0.5 text-xs not-italic text-amber-300/80">{p.ongoing ? 'in development' : 'preview'}</em>
              )}
            </div>
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="block cursor-pointer" aria-label={`Open ${p.name} live website`}>
                {CardMedia}
              </a>
            ) : (
              CardMedia
            )}
          </div>
        </div>
        <div className="px-1 pt-5">
          <h3 className="flex flex-wrap items-center gap-3 text-xl font-semibold">
            {p.name}
            {p.ongoing && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-400/10 px-2.5 py-0.5 font-sans text-[.72rem] font-semibold text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Ongoing Project
              </span>
            )}
            {p.demo && <span className="rounded-full border border-brand-cyan px-2.5 py-0.5 font-sans text-[.72rem] font-semibold text-brand-cyan">Demo project</span>}
          </h3>
          <div className="mb-2 mt-1 text-sm text-brand-ocean">{p.category} · {p.stack}</div>
          <p className="mb-4 text-sm leading-relaxed text-brand-muted">{p.desc}</p>
          <div className="flex items-center gap-4">
            {p.url ? (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary !px-5 !py-2 !text-sm">
                Live Website <ArrowUpRight size={17} />
              </a>
            ) : p.ongoing ? (
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3.5 py-1.5 text-xs font-semibold text-amber-300">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" /> In Development
              </span>
            ) : null}
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function ProjectGrid({ category = 'All', limit }) {
  const list = PROJECTS.filter((p) => category === 'All' || p.category === category).slice(0, limit)
  return (
    <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
      {list.map((p, i) => <Card key={p.name} p={p} i={i} />)}
    </div>
  )
}
