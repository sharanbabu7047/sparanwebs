import { Link } from 'react-router-dom'
import { Instagram, Mail } from 'lucide-react'
import { SERVICES, SITE } from '../data'
import { useSite } from '../context'
import logo from '../assets/logo.png'

export default function Footer() {
  const { goTo } = useSite()
  const a = 'block py-1 text-left transition-colors hover:text-brand-cyan'
  const soc = 'grid h-11 w-11 place-items-center rounded-xl border border-brand-border text-white transition duration-300 hover:-translate-y-1 hover:border-brand-cyan hover:shadow-glow'
  return (
    <footer className="border-t border-brand-border bg-gradient-to-b from-transparent to-brand-deep/10 pb-8 pt-16">
      <div className="wrap">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="mb-4 flex items-center gap-3 font-display text-xl font-bold text-white"><img src={logo} alt="" className="h-11 w-11 object-contain" />SparanWebs</Link>
            <p className="mb-5 max-w-[34ch]">A web development studio building professional full-stack websites for businesses, individuals and students.</p>
            <div className="flex gap-3">
              <a className={soc} href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={20} /></a>
              <a className={soc} href={`mailto:${SITE.email}`} aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <h4 className="mb-3 text-base font-semibold">Navigate</h4>
            <Link className={a} to="/">Home</Link><button className={a} onClick={() => goTo('services')}>Services</button>
            <Link className={a} to="/work">Our Work</Link><Link className={a} to="/about">About</Link><button className={a} onClick={() => goTo('contact')}>Contact</button>
          </nav>
          <div>
            <h4 className="mb-3 text-base font-semibold">Services</h4>
            {SERVICES.slice(0, 6).map((s) => <button key={s.title} className={a} onClick={() => goTo('contact', s.title)}>{s.title}</button>)}
          </div>
          <div>
            <h4 className="mb-3 text-base font-semibold">Contact</h4>
            <a className={a} href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a className={a} href={`https://instagram.com/${SITE.instagram}`} target="_blank" rel="noopener noreferrer">@{SITE.instagram}</a>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-brand-border pt-6 text-sm">
          <span>© {new Date().getFullYear()} SparanWebs. All rights reserved.</span><span>Built to move businesses forward.</span>
        </div>
      </div>
    </footer>
  )
}
