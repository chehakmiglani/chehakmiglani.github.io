import { useEffect, useRef, useState } from 'react'
import { Link } from './router.jsx'
import { Arrow, Marquee } from './Chrome.jsx'
import { NeuralCanvas, Scramble, Counter, Tilt, Magnetic, Typer } from './fx.jsx'
import {
  profile, hero, companies, stats, bio, stack, projects, experience, research, recognition, certifications,
} from './data.js'

function Eyebrow({ n, children }) {
  return <p className="eyebrow reveal"><span>{n}</span> / {children}</p>
}

function Hero() {
  return (
    <section className="hero">
      <NeuralCanvas />
      <div className="aurora a1" /><div className="aurora a2" /><div className="aurora a3" />
      <div className="hud hud-tl">28.61°N · 77.21°E<br />DELHI, IN</div>
      <div className="hud hud-tr">SYS.STATUS <span className="ok">● ONLINE</span><br />BUILD v2026.10</div>

      <div className="hero-inner">
        <span className="pill glass rise" style={{ '--d': '0ms' }}><span className="dot" />{profile.status} · {profile.location}</span>
        <h1 className="hero-title">
          <Scramble text={hero.pre} className="line" />
          <Scramble text={hero.accent} delay={500} className="line grad" />
        </h1>
        <p className="lede rise" style={{ '--d': '700ms' }}>{hero.sub}</p>
        <div className="hero-ctas rise" style={{ '--d': '850ms' }}>
          <Magnetic className="btn primary" href="#work">View my work <Arrow dir="s" /></Magnetic>
          <Magnetic className="btn ghost" href={`mailto:${profile.email}`}>Get in touch</Magnetic>
        </div>
        <div className="companies rise" style={{ '--d': '1000ms' }}>
          <span className="mono-label">Experience at</span>
          {companies.map(c => <span key={c} className="co">{c}</span>)}
        </div>
      </div>
      <a href="#stats" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  )
}

function Stats() {
  return (
    <section id="stats" className="section stats">
      {stats.map((s, i) => (
        <div key={s.label} className="stat glass reveal" style={{ '--d': `${i * 80}ms` }}>
          <p className="stat-num"><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} /></p>
          <p className="stat-label">{s.label}</p>
          <p className="mono-label">{s.note}</p>
        </div>
      ))}
    </section>
  )
}

function ProjectCard({ p, i }) {
  return (
    <Link to={`/work/${p.slug}`} className="pcard-link" aria-label={`${p.name} case study`}>
      <Tilt className="pcard glass" style={{ '--h': p.hue }}>
        <div className="pcard-media">
          <div className="pcard-glow" />
          {p.image && <img src={p.image} alt="" loading="lazy" />}
          <span className="pcard-idx">0{i + 1}</span>
        </div>
        <div className="pcard-body">
          <div>
            <p className="mono-label">{p.category}</p>
            <h3>{p.name}</h3>
            <p className="pcard-sum">{p.summary}</p>
          </div>
          <span className="round"><Arrow /></span>
        </div>
        <ul className="chips">{p.tags.slice(0, 4).map(t => <li key={t}>{t}</li>)}</ul>
        <div className="glare" />
      </Tilt>
    </Link>
  )
}

function Work() {
  const wrap = useRef(null), track = useRef(null)
  const [progress, setProgress] = useState(0)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let raf
    const layout = () => {
      const on = mq.matches
      setHorizontal(on)
      if (!on) { wrap.current.style.height = ''; track.current.style.transform = ''; return }
      const dist = track.current.scrollWidth - window.innerWidth
      wrap.current.style.height = `${dist + window.innerHeight}px`
      update()
    }
    const update = () => {
      if (!mq.matches) return
      const r = wrap.current.getBoundingClientRect()
      const dist = track.current.scrollWidth - window.innerWidth
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, dist)))
      track.current.style.transform = `translate3d(${-p * dist}px,0,0)`
      setProgress(p)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    layout()
    window.addEventListener('resize', layout)
    window.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener?.('change', layout)
    const imgs = track.current.querySelectorAll('img')
    imgs.forEach(im => im.addEventListener('load', layout))
    return () => {
      window.removeEventListener('resize', layout)
      window.removeEventListener('scroll', onScroll)
      mq.removeEventListener?.('change', layout)
    }
  }, [])

  return (
    <section id="work" ref={wrap} className={`work ${horizontal ? 'is-h' : ''}`}>
      <div className="work-sticky">
        <div className="work-head">
          <div>
            <Eyebrow n="01">selected work</Eyebrow>
            <h2 className="h2 reveal">Things I’ve <span className="grad">shipped.</span></h2>
          </div>
          <div className="work-progress" aria-hidden="true">
            <span className="mono-label">0{Math.min(projects.length, Math.floor(progress * projects.length) + 1)} / 0{projects.length}</span>
            <div className="bar"><i style={{ transform: `scaleX(${horizontal ? Math.max(0.04, progress) : 1})` }} /></div>
          </div>
        </div>
        <div className="work-track" ref={track}>
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
          <a className="pcard-more glass" href={profile.github} target="_blank" rel="noreferrer">
            <span className="mono-label">more on</span>
            <strong>GitHub</strong>
            <span className="round"><Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section about">
      <Eyebrow n="02">about</Eyebrow>
      <h2 className="statement reveal">
        {bio.lines.map((l, i) => <span key={i} className={i === 1 ? 'grad' : ''}>{l} </span>)}
      </h2>
      <div className="about-grid">
        <div className="reveal">
          {bio.body.map((b, i) => <p key={i} className="body">{b}</p>)}
          <div className="langs">
            <span className="chip-lg glass">English</span>
            <span className="chip-lg glass">日本語 · NAT-Q3</span>
            <span className="chip-lg glass">JLPT N4</span>
          </div>
        </div>
        <div className="reveal"><Typer lines={bio.terminal} /></div>
      </div>
      <div className="stack-rows">
        <Marquee items={stack.slice(0, 12)} className="chips-marquee" />
        <Marquee items={stack.slice(12)} reverse className="chips-marquee" />
      </div>
    </section>
  )
}

function hash(s) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

function Experience() {
  return (
    <section id="experience" className="section">
      <Eyebrow n="03">experience</Eyebrow>
      <div className="exp-head">
        <h2 className="h2 reveal">Commit <span className="grad">history.</span></h2>
        <code className="mono-label reveal">$ git log --graph --career</code>
      </div>
      <ol className="gitlog glass reveal">
        {experience.map((e, i) => (
          <li key={e.company} className={i === 0 ? 'head' : ''}>
            <div className="graph"><span className="node" /></div>
            <div className="commit">
              <p className="commit-line">
                <span className="sha">{hash(e.company)}</span>
                {i === 0 && <span className="ref">HEAD → main</span>}
                {e.company.includes('University') && <span className="ref tag">tag: v1.0-graduate</span>}
                <strong>{e.company}</strong>
                <span className="role">— {e.role}</span>
                <span className="date">{e.period}</span>
              </p>
              <p className="body">{e.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="section">
      <Eyebrow n="04">research & recognition</Eyebrow>
      <div className="research-grid">
        <a className="paper glass reveal" href={profile.scholar} target="_blank" rel="noreferrer">
          <div className="paper-viz" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => <i key={i} style={{ '--v': `${30 + Math.abs(Math.sin(i * 1.7)) * 60}%`, '--i': i }} />)}
          </div>
          <p className="mono-label">{research.date} · Published paper</p>
          <h3>{research.title}</h3>
          <p className="body">{research.summary}</p>
          <span className="link">Read on Google Scholar <Arrow /></span>
        </a>
        <div className="awards">
          {recognition.map(([t, d], i) => (
            <div key={t} className="award glass reveal" style={{ '--d': `${i * 70}ms` }}>
              <span className="mono-label">0{i + 1}</span>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="certs reveal">
        <p className="mono-label">Certifications</p>
        <ul>{certifications.map(c => <li key={c} className="glass">{c}</li>)}</ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Work />
      <About />
      <Experience />
      <Research />
    </>
  )
}
