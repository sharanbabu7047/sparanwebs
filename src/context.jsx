import { createContext, useCallback, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'

const Ctx = createContext(null)
export const useSite = () => useContext(Ctx)

/** Shares the selected project type and a goTo(sectionId, type?) helper that works from any page. */
export function SiteProvider({ children }) {
  const [type, setType] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const reduced = useReducedMotion()

  const goTo = useCallback((id, t) => {
    if (t !== undefined) setType(t)
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    if (pathname !== '/') { nav('/'); setTimeout(scroll, 900) } else scroll()
  }, [pathname, nav, reduced])

  return <Ctx.Provider value={{ type, setType, goTo }}>{children}</Ctx.Provider>
}
