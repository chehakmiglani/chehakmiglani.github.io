import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, go } from './router.jsx'
import { useLang } from './i18n.jsx'

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
  const row = items.map((x, i) => <span key={i}>{x}</span>)
  return (
    <div className={`marquee ${reverse ? 'rev' : ''} ${className}`} aria-hidden="true">
      <div className="marquee-track">{row}{row}</div>
    </div>
  )
}

const SECTION_IDS = ['japanese', 'work', 'about', 'experience', 'research', 'awards', 'contact']

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => {
      let cur = ''
      for (const id of SECTION_IDS) {
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

export function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="lang-switch glass" role="group" aria-label="Language">
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')} aria-pressed={lang === 'en'}>EN</button>
      <button className={lang === 'ja' ? 'on' : ''} onClick={() => setLang('ja')} aria-pressed={lang === 'ja'} lang="ja">日本語</button>
      <span className="lang-thumb" style={{ transform: lang === 'ja' ? 'translateX(100%)' : 'none' }} />
    </div>
  )
}

export function Nav({ onPalette }) {
  const { t } = useLang()
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
        {SECTION_IDS.map(id => (
          <Link key={id} to={`/#${id}`} className={`${active === id ? 'on' : ''} ${id === 'japanese' ? 'jp-link' : ''}`}>{t.nav[id]}</Link>
        ))}
      </nav>
      <div className="nav-right">
        <LangSwitch />
        <button className="kbd-btn glass" onClick={onPalette} aria-label={t.openMenu}>
          <span className="hide-sm">{t.search}</span><span className="m-only">{t.menu}</span><kbd>{mac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>
        </button>
      </div>
    </header>
  )
}

export function CommandPalette({ open, setOpen }) {
  const { t, c, toggle } = useLang()
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const [toast, setToast] = useState('')
  const input = useRef(null)

  const actions = useMemo(() => [
    { group: t.gLang, label: t.switchLang, hint: 'EN ⇄ 日本語', run: toggle },
    ...SECTION_IDS.map(id => ({ group: t.gNav, label: `${t.go} ${t.nav[id]}`, hint: `#${id}`, run: () => go(`/#${id}`) })),
    ...c.projects.map(p => ({ group: t.gProjects, label: p.name, hint: p.category, run: () => go(`/work/${p.slug}`) })),
    { group: t.gContact, label: t.copyEmail, hint: c.profile.email, run: () => { navigator.clipboard?.writeText(c.profile.email); setToast(t.copied) } },
    { group: t.gContact, label: t.sendEmail, hint: 'mailto', run: () => { window.location.href = `mailto:${c.profile.email}` } },
    { group: t.gLinks, label: 'GitHub', hint: 'github.com/chehakmiglani', run: () => window.open(c.profile.github, '_blank') },
    { group: t.gLinks, label: 'LinkedIn', hint: 'linkedin.com/in/chehak-miglani', run: () => window.open(c.profile.linkedin, '_blank') },
    { group: t.gLinks, label: 'Google Scholar', hint: 'research', run: () => window.open(c.profile.scholar, '_blank') },
  ], [t, c])

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
  useEffect(() => { if (!toast) return; const x = setTimeout(() => setToast(''), 1800); return () => clearTimeout(x) }, [toast])

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
          <div className="palette glass" role="dialog" aria-label={t.openMenu} onClick={e => e.stopPropagation()}>
            <div className="palette-input">
              <span className="t-prompt">›</span>
              <input ref={input} value={q} onChange={e => { setQ(e.target.value); setI(0) }} onKeyDown={onKey} placeholder={t.placeholder} />
              <kbd>esc</kbd>
            </div>
            <ul>
              {list.length === 0 && <li className="empty">{t.noResults} “{q}”</li>}
              {list.map((a, idx) => {
                const head = a.group !== lastGroup ? (lastGroup = a.group) : null
                return (
                  <li key={a.group + a.label}>
                    {head && <p className="palette-group">{head}</p>}
                    <button className={idx === i ? 'sel' : ''} onMouseEnter={() => setI(idx)} onClick={() => run(a)}>
                      <span>{a.label}</span><small>{a.hint}</small>
                    </button>
                  </li>
                )
              })}
            </ul>
            <div className="palette-foot"><span><kbd>↑</kbd><kbd>↓</kbd> {t.navigate}</span><span><kbd>↵</kbd> {t.select}</span></div>
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
  const [x, setX] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setX(fmt()), 1000); return () => clearInterval(id) }, [])
  return x
}

export function Footer({ onPalette }) {
  const { t, c } = useLang()
  const time = useClock(c.profile.timezone)
  return (
    <footer id="contact" className="footer">
      <div className="footer-aurora" aria-hidden="true" />
      <p className="eyebrow reveal"><span>07</span> / {t.contactEyebrow}</p>
      <h2 className="footer-title reveal">{t.contactTitle[0]}<br /><span className="grad">{t.contactTitle[1]}</span></h2>
      <p className="lede reveal">{t.contactLede}</p>
      <div className="footer-ctas reveal">
        <a className="btn primary" href={`mailto:${c.profile.email}`}>{c.profile.email} <Arrow /></a>
        <button className="btn ghost" onClick={onPalette}>{t.openMenu} <kbd>K</kbd></button>
      </div>
      <div className="footer-grid">
        <div>
          <p className="mono-label">{t.elsewhere}</p>
          <a href={c.profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
          <a href={c.profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          <a href={c.profile.scholar} target="_blank" rel="noreferrer">Google Scholar <Arrow /></a>
        </div>
        <div>
          <p className="mono-label">{t.localTime}</p>
          <p className="clock">{time}</p>
        </div>
        <div>
          <p className="mono-label">{t.statusLabel}</p>
          <p className="status"><span className="dot" />{c.profile.status}</p>
        </div>
      </div>
      <div className="footer-base">
        <span>© {new Date().getFullYear()} {c.profile.name}</span>
        <span>{t.builtWith}</span>
      </div>
    </footer>
  )
}
