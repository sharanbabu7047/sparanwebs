import Hero from '../components/Hero'
import Services, { Marquee } from '../components/Services'
import AboutIntro from '../components/AboutIntro'
import Process from '../components/Process'
import Why from '../components/Why'
import Contact from '../components/Contact'
import ProjectGrid from '../components/Projects'
import { Heading } from '../components/Reveal'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <section id="work" className="section">
        <div className="wrap">
          <Heading lead="Websites built by SyntraWebs. Explore our live client builds, personal portfolios, and ongoing projects.">Our work</Heading>
          <ProjectGrid limit={4} />
          <div className="mt-12"><Link to="/work" className="btn">View all projects</Link></div>
        </div>
      </section>
      <AboutIntro />
      <Process />
      <Why />
      <Contact />
    </>
  )
}
