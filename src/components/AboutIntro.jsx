import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import ParticleNetwork from './ParticleNetwork'
import Reveal, { Heading } from './Reveal'
import logo from '../assets/logo.png'

export function Mission() {
  return (
    <div className="my-8 border-l-2 border-brand-cyan pl-5">
      <h3 className="mb-1 text-base text-brand-cyan">Our mission</h3>
      <p>To give every business, creator and student a website that looks world-class and works flawlessly.</p>
    </div>
  )
}

export function Visual() {
  return (
    <div className="relative aspect-square max-h-[480px] w-full overflow-hidden rounded-[28px] border border-brand-border shadow-[0_0_60px_rgba(7,139,203,.15)]"
      style={{ background: 'radial-gradient(70% 70% at 50% 40%,rgba(7,139,203,.25),#080F19)' }}>
      <ParticleNetwork count={36} />
      <img src={logo} alt="SparanWebs" className="absolute inset-0 m-auto w-[42%] brightness-110 drop-shadow-[0_0_28px_rgba(32,213,245,.6)]" />
    </div>
  )
}

export default function AboutIntro() {
  return (
    <section id="about-intro" className="section">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <Heading>About <span className="gradient-text">SparanWebs</span></Heading>
          <Reveal className="mt-6">
            <p className="font-display text-[clamp(1.3rem,2.6vw,1.9rem)] font-bold leading-snug text-white">We’re a web studio that turns ideas into powerful digital experiences, combining creative design, modern technology and complete full-stack development.</p>
            <Mission />
            <Link to="/about" className="btn-primary">Know More <ArrowRight size={18} /></Link>
          </Reveal>
        </div>
        <Reveal><Visual /></Reveal>
      </div>
    </section>
  )
}
