import { useEffect, useState } from 'react'
import {
  profile, about, stats, skills, projects, experience,
  research, achievements, certifications,
} from './data.js'

const NAV = [
  ['work', 'Work'],
  ['experience', 'Experience'],
  ['skills', 'Skills'],
  ['research', 'Research'],
  ['contact', 'Contact'],
]

function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return document.documentElement.dataset.theme ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    } catch { return 'light' }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch {}
  }, [theme])
  return [theme, () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))]
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 9L9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function Section({ id, label, children }) {
  return (
    <section id={id} className="section reveal">
      <h2 className="section-label"><span>{label}</span></h2>
      {children}
    </section>
  )
}

export default function App() {
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach(e => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">cm<span>.</span></a>
        <nav aria-label="Sections">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">{profile.title}</p>
          <h1>
            Hi, I’m <em>Chehak</em>.<br />
            I build software that <em>thinks</em> a little.
          </h1>
          <p className="lede">{profile.tagline}</p>
          <div className="hero-links">
            <a className="btn primary" href="#work">See my work</a>
            <a className="btn" href={`mailto:${profile.email}`}>Get in touch</a>
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
          </div>
          <dl className="stats">
            {stats.map(s => (
              <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>
            ))}
          </dl>
        </section>

        <Section id="about" label="About">
          <div className="about">
            {about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Section>

        <Section id="work" label="Selected work">
          <div className="projects">
            {projects.map((p, i) => (
              <article key={p.name} className="project">
                <span className="index">0{i + 1}</span>
                <div className="project-body">
                  <h3>{p.name}</h3>
                  <p className="kind">{p.kind}</p>
                  <p>{p.description}</p>
                  <ul className="tags">{p.stack.map(t => <li key={t}>{t}</li>)}</ul>
                  {(p.live || p.code) && (
                    <div className="project-links">
                      {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live site <Arrow /></a>}
                      {p.code && <a href={p.code} target="_blank" rel="noreferrer">Source <Arrow /></a>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <a className="text-link more" href={`${profile.github}?tab=repositories`} target="_blank" rel="noreferrer">
            More on GitHub <Arrow />
          </a>
        </Section>

        <Section id="experience" label="Experience">
          <ol className="timeline">
            {experience.map(e => (
              <li key={e.company}>
                <div className="when">{e.period}</div>
                <div>
                  <h3>{e.role} <span>· {e.company}</span></h3>
                  <ul>{e.points.map((pt, i) => <li key={i}>{pt}</li>)}</ul>
                </div>
              </li>
            ))}
          </ol>
          <div className="edu">
            <div className="when">2022 — 2026</div>
            <div>
              <h3>B.Tech, Computer Science <span>· Manipal University Jaipur</span></h3>
              <p>CGPA 8.91 · Dean’s List · DSA, ML, AI, DBMS, Image Processing, Software Testing</p>
            </div>
          </div>
        </Section>

        <Section id="skills" label="Skills">
          <div className="skills">
            {skills.map(s => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <ul className="tags">{s.items.map(i => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="research" label="Research & recognition">
          <a className="paper" href={profile.scholar} target="_blank" rel="noreferrer">
            <span className="when">{research.date} · Paper</span>
            <h3>{research.title} <Arrow /></h3>
            <p>{research.summary}</p>
          </a>
          <div className="awards">
            {achievements.map(a => (
              <div key={a.title}><h3>{a.title}</h3><p>{a.detail}</p></div>
            ))}
          </div>
          <p className="certs"><span>Certifications</span>{certifications.join('  ·  ')}</p>
        </Section>

        <section id="contact" className="contact reveal">
          <p className="eyebrow">Contact</p>
          <h2>Let’s build something <em>together</em>.</h2>
          <p className="lede">I’m open to full-time software engineering and ML roles. The fastest way to reach me is email.</p>
          <a className="email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="hero-links">
            <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a className="text-link" href={profile.scholar} target="_blank" rel="noreferrer">Google Scholar <Arrow /></a>
            {profile.resume && <a className="text-link" href={profile.resume} target="_blank" rel="noreferrer">Résumé <Arrow /></a>}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Chehak Miglani</span>
        <span>Built with React + Vite</span>
      </footer>
    </>
  )
}
