import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

/** Subtle 3D tilt with a cursor-following cyan glow. */
export default function TiltCard({ children, className = '', ...rest }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const x = useMotionValue(0.5), y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 220, damping: 20 })

  const move = (e) => {
    if (reduced) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    x.set(px); y.set(py)
    ref.current.style.setProperty('--mx', px * 100 + '%')
    ref.current.style.setProperty('--my', py * 100 + '%')
  }
  const leave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className={`group relative overflow-hidden ${className}`} {...rest}>
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(260px circle at var(--mx,50%) var(--my,0%), rgba(32,213,245,.16), transparent 70%)' }} />
      {children}
    </motion.div>
  )
}
