import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Connected-node particle network (2D canvas). Pauses when off-screen. */
export default function ParticleNetwork({ count = 70, interactive = false }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cv = ref.current, c = cv.getContext('2d')
    let w = 0, h = 0, mx = -999, my = -999, vis = true, raf
    const n = innerWidth < 700 ? Math.round(count * 0.5) : count
    const pts = Array.from({ length: n }, () => ({ x: Math.random() * 600, y: Math.random() * 600, vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 }))
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); w = r.width; h = r.height; cv.width = w * d; cv.height = h * d; c.setTransform(d, 0, 0, d, 0, 0) }
    size()
    const ro = new ResizeObserver(size); ro.observe(cv)
    const io = new IntersectionObserver((e) => { vis = e[0].isIntersecting }); io.observe(cv)
    const mm = (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top }
    if (interactive) addEventListener('mousemove', mm)

    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!vis || !w) return
      c.clearRect(0, 0, w, h)
      for (const p of pts) {
        if (!reduced) { p.x += p.vx; p.y += p.vy }
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        const dm = Math.hypot(p.x - mx, p.y - my)
        if (dm < 130 && !reduced) { p.x += ((p.x - mx) / dm) * 1.4; p.y += ((p.y - my) / dm) * 1.4 }
        c.globalAlpha = 0.85; c.fillStyle = '#20D5F5'; c.beginPath(); c.arc(p.x, p.y, 1.8, 0, 7); c.fill()
      }
      for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y)
        if (d < 135) { c.globalAlpha = (1 - d / 135) * 0.5; c.strokeStyle = i % 3 ? '#078BCB' : '#20D5F5'; c.beginPath(); c.moveTo(pts[i].x, pts[i].y); c.lineTo(pts[j].x, pts[j].y); c.stroke() }
      }
    }
    loop()
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); removeEventListener('mousemove', mm) }
  }, [count, interactive, reduced])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />
}
