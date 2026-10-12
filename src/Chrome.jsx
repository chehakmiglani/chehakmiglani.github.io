import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, go } from './router.jsx'
import { profile, projects } from './data.js'

export function Arrow({ dir = 'ne' }) {
  const d = {
    ne: 'M4 12L12 4M5.5 4H12v6.5',
    e: 'M3 8h10M9 4l4 4-4 4',
    w: 'M13 8H3M7 4L3 8l4 4',
    s: 'M8 3v10M4 9l4 4 4-4',
  }[dir]
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Marquee({ items, reverse, className = '' }) {
  const row = items.map((t, i) => <span key={i}>{t}</span>)
  return (
    <div className={`marquee ${reverse ? 'rev' : ''} ${className}`} aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  )
}

const SECTIONS = [
  ['work', 'Work'],
  ['about', 'About'],
  ['experience', 'Experience'],
  ['research', 'Research'],
  ['contact', 'Contact'],
]

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      let cur = ''
      for (const [id] of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return active
}

export function Nav({ onPalette }) {
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  const mac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">chehak<span>.</span></Link>
      <nav className="nav-pill glass" aria-label="Sections">
        {SECTIONS.map(([id, label]) => (
          <Link key={id} to={`/#${id}`} className={active === id ? 'on' : ''}>{label}</Link>
        ))}
      </nav>
      <button className="kbd-btn glass" onClick={onPalette} aria-label="Open command menu">
        <span className="hide-sm">Search</span><span className="m-only">Menu</span><kbd>{mac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
      </button>
    </header>
  )
}

export function CommandPalette({ open, setOpen }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const [toast, setToast] = useState('')
  const input = useRef(null)

  const actions = useMemo(() => [
    ...SECTIONS.map(([id, label]) => ({ group: 'Navigate', label: `Go to ${label}`, hint: `#${id}`, run: () => go(`/#${id}`) })),
    ...projects.map(p => ({ group: 'Projects', label: p.name, hint: p.category, run: () => go(`/work/${p.slug}`) })),
    { group: 'Contact', label: 'Copy email address', hint: profile.email, run: () => { navigator.clipboard?.writeText(profile.email); setToast('Email copied to clipboard') } },
    { group: 'Contact', label: 'Send an email', hint: 'mailto', run: () => { window.location.href = `mailto:${profile.email}` } },
    { group: 'Links', label: 'Open GitHub', hint: 'github.com/chehakmiglani', run: () => window.open(profile.github, '_blank') },
    { group: 'Links', label: 'Open LinkedIn', hint: 'linkedin.com/in/chehak-miglani', run: () => window.open(profile.linkedin, '_blank') },
    { group: 'Links', label: 'Open Google Scholar', hint: 'research', run: () => window.open(profile.scholar, '_blank') },
  ], [])

  const list = actions.filter(a => (a.label + a.hint + a.group).toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen(o => !o) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => { if (open) { setQ(''); setI(0); setTimeout(() => input.current?.focus(), 30) } }, [open])
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(''), 1800); return () => clearTimeout(t) }, [toast])

  const run = a => { if (!a) return; setOpen(false); a.run() }
  const onKey = e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setI(x => Math.min(x + 1, list.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setI(x => Math.max(x - 1, 0)) }
    if (e.key === 'Enter') run(list[i])
  }

  let lastGroup = ''
  return (
    <>
      {open && (
        <div className="palette-backdrop" onClick={() => setOpen(false)}>
          <div className="palette glass" role="dialog" aria-label="Command menu" onClick={e => e.stopPropagation()}>
            <div className="palette-input">
              <span className="t-prompt">›</span>
              <input ref={input} value={q} onChange={e => { setQ(e.target.value); setI(0) }} onKeyDown={onKey} placeholder="Type a command or search…" />
              <kbd>esc</kbd>
            </div>
            <ul>
              {list.length === 0 && <li className="empty">No results for “{q}”</li>}
              {list.map((a, idx) => {
                const head = a.group !== lastGroup ? (lastGroup = a.group) : null
                return (
                  <li key={a.label}>
                    {head && <p className="palette-group">{head}</p>}
                    <button className={idx === i ? 'sel' : ''} onMouseEnter={() => setI(idx)} onClick={() => run(a)}>
                      <span>{a.label}</span><small>{a.hint}</small>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span></div>
          </div>
        </div>
      )}
      {toast && <div className="toast glass">{toast}</div>}
    </>
  )
}

export function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const f = e => { ref.current?.style.setProperty('transform', `translate(${e.clientX}px, ${e.clientY}px)`) }
    window.addEventListener('pointermove', f, { passive: true })
    return () => window.removeEventListener('pointermove', f)
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

function useClock(tz) {
  const fmt = () => new Date().toLocaleTimeString('en-GB', { timeZone: tz, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 1000); return () => clearInterval(id) }, [])
  return t
}

export function Footer({ onPalette }) {
  const time = useClock(profile.timezone)
  return (
    <footer id="contact" className="footer">
      <div className="footer-aurora" aria-hidden="true" />
      <p className="eyebrow reveal"><span>05</span> / contact</p>
      <h2 className="footer-title reveal">Let’s build something<br /><span className="grad">that matters.</span></h2>
      <p className="lede reveal">I’m open to software engineering and ML roles. The fastest way to reach me is email.</p>
      <div className="footer-ctas reveal">
        <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email} <Arrow /></a>
        <button className="btn ghost" onClick={onPalette}>Open command menu <kbd>K</kbd></button>
      </div>
      <div className="footer-grid">
        <div>
          <p className="mono-label">Elsewhere</p>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar <Arrow /></a>
        </div>
        <div>
          <p className="mono-label">Local time · IST</p>
          <p className="clock">{time}</p>
        </div>
        <div>
          <p className="mono-label">Status</p>
          <p className="status"><span className="dot" />{profile.status}</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with React + Vite · hand-coded canvas</span>
      </div>
    </footer>
  )
}
