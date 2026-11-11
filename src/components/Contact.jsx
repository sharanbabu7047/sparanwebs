import { useState } from 'react'
import { Instagram, Mail, Send } from 'lucide-react'
import { SERVICES, SITE } from '../data'
import { useSite } from '../context'
import Reveal, { Heading } from './Reveal'

const RULES = {
  name: (v) => v.trim().length > 1 || 'Enter your name.',
  email: (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) || 'Enter a valid email address.',
  type: (v) => !!v || 'Choose a project type.',
  message: (v) => v.trim().length >= 50 || 'Describe your project in at least 50 characters.',
}

export default function Contact() {
  const { type, setType } = useSite()
  const [v, setV] = useState({ name: '', email: '', message: '', _gotcha: '' })
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState({ s: 'idle', m: '' })
  const values = { ...v, type }
  const errs = Object.fromEntries(Object.keys(RULES).map((k) => { const r = RULES[k](values[k]); return [k, r === true ? '' : r] }))
  const show = (k) => (touched[k] ? errs[k] : '')
  const bind = (k) => ({ id: `f-${k}`, name: k, 'aria-invalid': !!show(k), 'aria-describedby': `e-${k}`, onBlur: () => setTouched((t) => ({ ...t, [k]: true })) })
  const set = (k) => (e) => setV((s) => ({ ...s, [k]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, type: true, message: true })
    const bad = Object.keys(errs).find((k) => errs[k])
    if (bad) { document.getElementById(`f-${bad}`)?.focus(); return }
    if (v._gotcha) return
    if (!SITE.formEndpoint) {
      const msg = encodeURIComponent(`Hi SparanWebs!\n\nName: ${v.name}\nEmail: ${v.email}\nProject Type: ${type}\n\nMessage:\n${v.message}`)
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Project Enquiry: ${type} - ${v.name}`)}&body=${msg}`
      setStatus({ s: 'ok', m: 'Opening your email client to send your enquiry…' })
      return
    }
    setStatus({ s: 'sending', m: 'Sending…' })
    try {
      const targetUrl = SITE.formEndpoint
      const r = await fetch(targetUrl, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(values) })
      if (!r.ok) {
        const errData = await r.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to submit enquiry.')
      }
      setV({ name: '', email: '', message: '', _gotcha: '' }); setType(''); setTouched({})
      setStatus({ s: 'ok', m: 'Message sent! We’ll reply within one working day.' })
    } catch (err) {
      console.error('Submission error:', err)
      setStatus({
        s: 'error',
        m: err.message === 'Failed to fetch'
          ? 'Cannot connect to the email service. Please check your internet connection and try again.'
          : (err.message || 'Message not sent. Check your connection and try again.')
      })
    }
  }

  const Err = ({ k }) => <span id={`e-${k}`} className="min-h-[1.1em] text-sm text-sky-200">{show(k)}</span>
  const label = 'grid gap-1.5 text-[.95rem] font-medium text-white'
  const links = [
    { icon: Mail, t: 'Email', s: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Instagram, t: 'Instagram', s: `@${SITE.instagram}`, href: `https://instagram.com/${SITE.instagram}` },
  ]

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Heading lead="Have an idea? Let’s turn it into something extraordinary.">Your Idea Deserves More Than Just a Website</Heading>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <form onSubmit={submit} noValidate aria-label="Contact form" className="glass grid gap-4 rounded-3xl p-5 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className={label}>
                  <span className="flex items-center gap-1">Name <span className="text-red-400 font-semibold" title="Required">*</span></span>
                  <input className="field" autoComplete="name" value={v.name} onChange={set('name')} {...bind('name')} />
                  <Err k="name" />
                </label>
                <label className={label}>
                  <span className="flex items-center gap-1">Email <span className="text-red-400 font-semibold" title="Required">*</span></span>
                  <input className="field" type="email" autoComplete="email" value={v.email} onChange={set('email')} {...bind('email')} />
                  <Err k="email" />
                </label>
              </div>
              <label className={label}>
                <span className="flex items-center gap-1">Project type <span className="text-red-400 font-semibold" title="Required">*</span></span>
                <select className="field" value={type} onChange={(e) => setType(e.target.value)} {...bind('type')}>
                  <option value="">Choose a project type</option>
                  {SERVICES.map((s) => <option key={s.title}>{s.title}</option>)}<option>Something else</option>
                </select>
                <Err k="type" />
              </label>
              <label className={label}>
                <span className="flex items-center gap-1">Project description <span className="text-red-400 font-semibold" title="Required">*</span></span>
                <textarea className="field" rows={5} value={v.message} onChange={set('message')} {...bind('message')} placeholder="Tell us about your project, goals, key requirements and timeline (at least 50 characters)..." />
                <div className="flex items-center justify-between text-xs text-brand-muted">
                  <Err k="message" />
                  <span className={v.message.trim().length >= 50 ? 'text-brand-cyan' : 'text-brand-muted'}>
                    {v.message.trim().length}/50 characters
                  </span>
                </div>
              </label>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" value={v._gotcha} onChange={set('_gotcha')} />
              <button type="submit" className="btn-primary" disabled={status.s === 'sending'}><Send size={18} /> Send Message</button>
              <p role="status" className={`min-h-[1.4em] ${status.s === 'error' ? 'text-sky-200' : 'text-brand-cyan'}`}>{status.m}</p>
            </form>
          </Reveal>
          <Reveal delay={0.1} className="grid content-start gap-4">
            {links.map(({ icon: I, t, s, href }) => (
              <a key={t} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                className="glass flex items-center gap-4 rounded-2xl p-5 text-white transition duration-300 hover:translate-x-1.5 hover:border-brand-cyan">
                <I size={26} className="text-brand-cyan" /><div><strong>{t}</strong><small className="block text-brand-muted">{s}</small></div>
              </a>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
