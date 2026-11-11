import { motion, useReducedMotion } from 'framer-motion'

export default function Reveal({ children, delay = 0, className = '' }) {
  const reduced = useReducedMotion()
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export function Heading({ children, lead, as: Tag = 'h2' }) {
  return (
    <Reveal>
      <Tag className="max-w-[20ch] text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.08]">{children}</Tag>
      {lead && <p className="mb-12 mt-5 max-w-[58ch]">{lead}</p>}
    </Reveal>
  )
}
