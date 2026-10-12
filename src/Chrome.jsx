import { useEffect, useState } from 'react'
import { Link } from './router.jsx'
import { profile, marquee } from './data.js'

export function Arrow({ dir = 'ne' }) {
  const d = {
    ne: 'M4 12L12 4M5.5 4H12v6.5',
    e: 'M3 8h10M9 4l4 4-4 4',
    w: 'M13 8H3M7 4L3 8l4 4',
    s: 'M8 3v10M4 9l4 4 4-4',
  }[dir]
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Marquee({ items, className = '' }) {
  const row = items.map((t, i) => <span key={i}>{t}<i>•</i></span>)
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  )
}

function useClock(tz) {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id) }, [])
  return t
}

const NAV = [
  ['/#work', 'Work'],
  ['/#myself', 'Myself'],
  ['/#stack', 'Stack'],
  ['/#experience', 'Experience'],
  ['/#research', 'Research'],
  ['/#contact', 'Contact'],
]

export function Dock() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  return (
    <>
      <div className={`menu ${open ? 'open' : ''}`} aria-hidden={!open}>
        <nav>
          {NAV.map(([to, label], i) => (
            <Link key={to} to={to} onNavigate={() => setOpen(false)} style={{ '--i': i }} tabIndex={open ? 0 : -1}>
              <span className="menu-idx">0{i + 1}</span>{label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="dock">
        <Link to="/" className="dock-avatar" aria-label="Home">{profile.short}</Link>
        <div className="dock-text">
          <strong>{profile.name}</strong>
          <Marquee items={marquee} className="dock-marquee" />
        </div>
        {profile.resume && (
          <a className="dock-btn" href={profile.resume} download aria-label="Download résumé">
            <Arrow dir="s" />
          </a>
        )}
        <button className={`dock-btn burger ${open ? 'x' : ''}`} onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
          <span /><span />
        </button>
      </div>
    </>
  )
}

export function Footer() {
  const time = useClock(profile.timezone)
  return (
    <footer id="contact" className="footer">
      <p className="label reveal">// contact · awaiting_input</p>
      <h2 className="display footer-title reveal">Let’s build<br /><span className="dim">something.</span></h2>
      <a className="footer-email reveal" href={`mailto:${profile.email}`}>
        {profile.email} <Arrow />
      </a>
      <div className="footer-grid">
        <div>
          <p className="label">Elsewhere</p>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar <Arrow /></a>
        </div>
        <div>
          <p className="label">Local time · IST</p>
          <p className="mono-big">{time}</p>
        </div>
        <div>
          <p className="label">System status</p>
          <p className="status"><span className="dot" />{profile.status}</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  )
}
