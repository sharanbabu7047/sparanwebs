import { Briefcase, User, GraduationCap, PenTool, Layers, Database, LayoutDashboard, Rocket, Search, Code2, LifeBuoy, Smartphone, Cpu, Gauge } from 'lucide-react'

/* ---- EDIT YOUR REAL DETAILS HERE ---- */
export const SITE = {
  name: 'SyntraWebs',
  email: 'syntrawebs@gmail.com',
  instagram: 'syntrawebs',
  formEndpoint: '/api/enquiry',
}

export const SERVICES = [
  { icon: Briefcase, title: 'Business Websites', desc: 'Corporate sites, landing pages and online stores that win trust and enquiries.' },
  { icon: User, title: 'Personal Websites', desc: 'Portfolios and profile sites that show your work and personality.' },
  { icon: GraduationCap, title: 'Student Websites', desc: 'Portfolios, resumes and project showcases that stand out.' },
  { icon: PenTool, title: 'UI/UX Design', desc: 'Interfaces designed around how people actually use them.' },
  { icon: Layers, title: 'Full-Stack Development', desc: 'Frontend, backend and database built together as one system.' },
  { icon: Database, title: 'Backend & Database Development', desc: 'APIs, authentication and data storage that stay fast and secure.' },
  { icon: LayoutDashboard, title: 'Admin Dashboards', desc: 'Manage content, users and data from one clear control panel.' },
  { icon: Rocket, title: 'Deployment & Maintenance', desc: 'Launch, monitor and keep improving after go-live.' },
]

import imgAdvocateSruti from './assets/advocate-sruti.jpg'
import imgSharanBabu from './assets/sharan-babu.jpg'
import imgBillGates from './assets/bill-gates.png'

/* Real client work, live showcases, and ongoing projects. */
export const PROJECTS = [
  {
    name: 'Advocate Sruti',
    category: 'Business',
    stack: 'Modern Web · Responsive · Legal Practice',
    desc: 'Official professional practice website for Advocate Sruti featuring legal service specialisations, client consultation booking, and profile showcase.',
    url: 'https://advocatesruti.in/',
    demo: false,
    ongoing: false,
    hue: '#078BCB',
    img: imgAdvocateSruti,
  },
  {
    name: 'Sharan Babu Portfolio',
    category: 'Personal',
    stack: 'React · Tailwind · Modern UI/UX',
    desc: 'Personal developer and designer portfolio highlighting projects, skills, creative design aesthetics, and career journey.',
    url: 'https://v0-sharanbabu.vercel.app/',
    demo: false,
    ongoing: false,
    hue: '#20D5F5',
    img: imgSharanBabu,
  },
  {
    name: 'Bill Gates Portfolio',
    category: 'Personal',
    stack: 'React · Tailwind · Interactive UI',
    desc: 'Interactive tribute and portfolio showcasing career milestones, philanthropic initiatives, and an impact timeline.',
    url: 'https://billgates-delta.vercel.app/',
    demo: false,
    ongoing: false,
    hue: '#07528C',
    img: imgBillGates,
  },
  {
    name: 'Maharishi Vidya Mandir',
    category: 'Education',
    stack: 'Full-Stack · School Portal · Responsive',
    desc: 'Comprehensive official school web platform for Maharishi Vidya Mandir featuring campus showcase, academics, admissions, and student portal.',
    url: '',
    demo: false,
    ongoing: true,
    hue: '#078BCB',
    img: null,
  },
]

export const STEPS = [
  { icon: Search, title: 'Discover', desc: 'Understand requirements' },
  { icon: PenTool, title: 'Design', desc: 'Create UI/UX' },
  { icon: Code2, title: 'Develop', desc: 'Build frontend and backend' },
  { icon: Rocket, title: 'Launch', desc: 'Test and deploy' },
  { icon: LifeBuoy, title: 'Support', desc: 'Maintain and improve' },
]

export const ADVANTAGES = [
  { icon: PenTool, title: 'Custom design', desc: 'Nothing starts from a stock template. Your layout, structure and code are shaped around your goals.' },
  { icon: Layers, title: 'Complete frontend and backend', desc: 'One team covers design, interface, server, database and APIs, so nothing gets lost between handoffs.' },
  { icon: Smartphone, title: 'Responsive layouts', desc: 'Desktop, tablet and phone each get their own layout decisions, not a shrunken copy.' },
  { icon: Cpu, title: 'Modern technologies', desc: 'React, Tailwind, Node and 3D tooling, chosen because they suit the job.' },
  { icon: Gauge, title: 'Performance optimisation', desc: 'Lean animations, optimised graphics and fast loads, tested before launch.' },
  { icon: LifeBuoy, title: 'Reliable support', desc: 'Clear communication, honest timelines and help after your site goes live.' },
]

export const TECH = ['React', 'Node.js', 'Three.js', 'GSAP', 'Tailwind CSS', 'Framer Motion', 'PostgreSQL', 'REST APIs']
