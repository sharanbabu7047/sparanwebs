import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'

function Shapes() {
  const g = useRef(), ico = useRef(), oct = useRef(), t1 = useRef(), t2 = useRef(), fl = useRef([])
  const mouse = useRef({ x: 0, y: 0 })
  const { size } = useThree()
  const reduced = useReducedMotion()
  const wide = size.width > 900
  const items = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ a: Math.random() * 6, s: 0.2 + Math.random() * 0.4, R: 3.8 + Math.random() * 1.6, y: (Math.random() - 0.5) * 4, box: i % 2 === 1, c: i % 3 ? '#20D5F5' : '#078BCB' })), [])

  useEffect(() => {
    const update = (cx, cy) => {
      mouse.current.x = (cx / innerWidth) * 2 - 1
      mouse.current.y = (cy / innerHeight) * 2 - 1
    }
    const onMouseMove = (e) => update(e.clientX, e.clientY)
    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        update(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  useFrame((st) => {
    if (reduced) return
    const t = st.clock.elapsedTime
    ico.current.rotation.set(t * 0.3, t * 0.4, 0)
    oct.current.rotation.set(0, -t * 0.8, t * 0.5)
    t1.current.rotation.z = t * 0.5; t2.current.rotation.z = -t * 0.4
    items.forEach((u, i) => { const m = fl.current[i]; if (!m) return; const a = u.a + t * u.s; m.position.set(Math.cos(a) * u.R, u.y + Math.sin(t * 2 + u.a) * 0.4, Math.sin(a) * u.R); m.rotation.x = t * 0.6; m.rotation.y = t * 0.9 })
    g.current.rotation.y += (mouse.current.x * 0.8 - g.current.rotation.y) * 0.05
    g.current.rotation.x += (mouse.current.y * 0.6 - g.current.rotation.x) * 0.05
  })

  return (
    <group ref={g} position={[wide ? 3.4 : 0, 0, 0]} scale={wide ? 0.9 : 0.65}>
      <mesh ref={ico}><icosahedronGeometry args={[3, 1]} /><meshBasicMaterial color="#078BCB" wireframe transparent opacity={0.45} /></mesh>
      <mesh ref={oct}><octahedronGeometry args={[1.5]} /><meshBasicMaterial color="#20D5F5" wireframe transparent opacity={0.6} /></mesh>
      <mesh ref={t1} rotation={[1.2, 0.3, 0]}><torusGeometry args={[4, 0.015, 8, 140]} /><meshBasicMaterial color="#20D5F5" /></mesh>
      <mesh ref={t2} rotation={[0.4, 1.1, 0]}><torusGeometry args={[3.5, 0.015, 8, 140]} /><meshBasicMaterial color="#078BCB" /></mesh>
      {items.map((u, i) => (
        <mesh key={i} ref={(el) => (fl.current[i] = el)}>
          {u.box ? <boxGeometry args={[0.5, 0.5, 0.5]} /> : <tetrahedronGeometry args={[0.45]} />}
          <meshBasicMaterial color={u.c} wireframe transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  )
}

class Safe extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? null : this.props.children }
}

export default function HeroScene() {
  const ref = useRef(null)
  const [vis, setVis] = useState(true)
  useEffect(() => { const io = new IntersectionObserver((e) => setVis(e[0].isIntersecting)); io.observe(ref.current); return () => io.disconnect() }, [])
  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      <Safe>
        <Canvas frameloop={vis ? 'always' : 'never'} dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 50 }} gl={{ alpha: true, antialias: true }}>
          <Shapes />
        </Canvas>
      </Safe>
    </div>
  )
}
