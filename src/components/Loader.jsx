import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

export default function Loader() {
  return (
    <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-brand-bg" exit={{ opacity: 0 }} transition={{ duration: 0.8 }} role="status" aria-label="Loading SparanWebs">
      <div className="text-center">
        <motion.img src={logo} alt="" className="mx-auto w-36 drop-shadow-[0_0_24px_rgba(32,213,245,.5)]"
          initial={{ opacity: 0, scale: 0.6, rotate: -8, filter: 'blur(10px)' }} animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }} />
        <motion.p className="mt-4 font-display text-xl font-bold tracking-[.06em] text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>SPARANWEBS</motion.p>
        <div className="mx-auto mt-5 h-[3px] w-36 overflow-hidden rounded bg-brand-border">
          <motion.div className="h-full bg-brand-grad" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.6, ease: 'easeOut' }} />
        </div>
      </div>
    </motion.div>
  )
}
