import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useSite } from '../context'
import logo from '../assets/logo.png'

const ITEMS = [
  { t: 'Home', to: '/' },
  { t: 'Services', id: 'services' },
  { t: 'Our Work', id: 'work' },
  { t: 'About', id: 'about-intro' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { goTo } = useSite()
  const location = useLocation()

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30)
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f)
  }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [open])

  const handleHomeClick = (to) => {
    setOpen(false)
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const base = 'relative py-1 font-medium transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-brand-cyan after:transition-transform hover:after:scale-x-100'
  const item = (i, cls = base) => i.to
    ? <NavLink key={i.t} to={i.to} end={i.to === '/'} onClick={() => handleHomeClick(i.to)} className={({ isActive }) => `${cls} ${isActive ? 'text-white after:scale-x-100' : ''}`}>{i.t}</NavLink>
    : <button key={i.t} type="button" onClick={() => { setOpen(false); goTo(i.id) }} className={`${cls} text-left`}>{i.t}</button>

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition duration-300 ${scrolled || open ? 'border-brand-border bg-brand-bg/70 backdrop-blur-xl' : 'border-transparent'}`}>
      <nav aria-label="Main" className="wrap grid h-[76px] grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        <Link to="/" className="flex items-center gap-3 font-display text-xl font-bold text-white" aria-label="SyntraWebs home">
          <img src={logo} alt="SyntraWebs logo" className="h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(32,213,245,0.45)] brightness-110" />SyntraWebs
        </Link>
        <div className="hidden gap-9 md:flex">{ITEMS.map((i) => item(i))}</div>
        <button type="button" onClick={() => goTo('contact')} className="btn-primary hidden justify-self-end !px-5 !py-2.5 md:inline-flex">Let’s Talk</button>
        <button type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center justify-self-end rounded-xl border border-brand-border text-white md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div className="max-h-[calc(100vh-76px)] overflow-y-auto border-t border-brand-border bg-brand-bg/95 px-6 pb-8 pt-4 backdrop-blur-xl md:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.45, ease: [0.7, 0, 0.2, 1] }}>
            <div className="flex flex-col">
              {ITEMS.map((i, k) => (
                <motion.div key={i.t} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + k * 0.05 }} className="border-b border-brand-border">
                  {item(i, 'block w-full py-4 font-display text-2xl font-semibold text-white')}
                </motion.div>
              ))}
            </div>
            <button type="button" onClick={() => { setOpen(false); goTo('contact') }} className="btn-primary mt-6 w-full">Let’s Talk</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
