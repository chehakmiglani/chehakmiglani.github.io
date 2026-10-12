import { Link } from './router.jsx'
import { Arrow, Marquee } from './Chrome.jsx'
import {
  profile, marquee, bio, stack, projects, experience, research, recognition, certifications,
} from './data.js'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-top">
        <div>
          <p className="label">{profile.location}</p>
          <p className="label dim">Working globally</p>
        </div>
        <p className="label hide-sm">Previously at Infosys · Nagarro</p>
        <a className="pill" href={`mailto:${profile.email}`}>Get in touch</a>
      </div>

      <div className="hero-body">
        <p className="label hero-name">{profile.name}</p>
        <h1 className="display hero-title">
          <span className="line"><span>Full</span><span className="dim">—Stack</span><span>&amp;</span></span>
          <span className="line big"><span>ML Engineer</span></span>
        </h1>
      </div>

      <div className="hero-bottom">
        <a href="#work" className="label scroll-cue"><Arrow dir="s" /> Explore work</a>
        <p className="label dim hide-sm">system_status: <span className="ok">operational</span></p>
      </div>
    </section>
  )
}

function ProjectVisual({ p, i }) {
  return (
    <div className="pv" style={{ '--h': p.hue }}>
      <div className="pv-grid" />
      <div className="pv-orb" />
      <span className="pv-name">{p.name}</span>
      {p.image && (
        <div className="pv-shot">
          <div className="frame-bar"><i /><i /><i /></div>
          <img src={p.image} alt={`${p.name} interface`} loading="lazy" />
        </div>
      )}
      <span className="pv-num">0{i + 1}</span>
      <div className="pv-chips">
        {p.meta.stack.map(s => <span key={s}>{s}</span>)}
      </div>
    </div>
  )
}

function Work() {
  return (
    <section id="work" className="section">
      <div className="section-head reveal">
        <h2 className="display">Work</h2>
        <span className="display dim">’26</span>
      </div>
      <div className="work-grid">
        {projects.map((p, i) => (
          <Link key={p.slug} to={`/work/${p.slug}`} className={`card work-card reveal ${i === 2 ? 'wide' : ''}`}>
            <ProjectVisual p={p} i={i} />
            <div className="work-meta">
              <span className="circle"><Arrow dir="e" /></span>
              <strong>{p.name}</strong>
              <span className="work-cat">{p.category}</span>
            </div>
            <Marquee items={p.tags} className="work-tags" />
          </Link>
        ))}
      </div>
      <a className="label more reveal" href={profile.github} target="_blank" rel="noreferrer">
        View all on GitHub <Arrow />
      </a>
    </section>
  )
}

function Myself() {
  return (
    <section id="myself" className="section myself">
      <p className="label reveal">// myself</p>
      <h2 className="statement reveal">
        {bio.lines.map((l, i) => <span key={i} className={i === 1 ? 'dim' : ''}>{l} </span>)}
      </h2>
      <div className="myself-grid">
        <div className="reveal">
          {bio.body.map((b, i) => <p key={i} className="body">{b}</p>)}
        </div>
        <div className="terminal reveal">
          <div className="terminal-bar"><i /><i /><i /><span>chehak@portfolio ~ </span></div>
          <pre>
            <span className="prompt">$ whoami --verbose</span>{'\n'}
            {bio.terminal.map(([k, v]) => (
              <span key={k}><span className="k">{k.padEnd(10)}</span> {v}{'\n'}</span>
            ))}
            <span className="prompt">$ </span><span className="caret" />
          </pre>
        </div>
      </div>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack" className="stack">
      <div className="stack-inner">
        <div className="section-head reveal">
          <h2 className="display">Stack</h2>
          <span className="label">{stack.length} tools · daily drivers</span>
        </div>
        <ul className="stack-grid reveal">
          {stack.map(s => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="section-head reveal">
        <h2 className="display">Experience</h2>
      </div>
      <ol className="exp">
        {experience.map(e => (
          <li key={e.company} className="reveal">
            <span className="label">{e.period}</span>
            <div>
              <h3>{e.company}</h3>
              <p className="label dim">{e.role}</p>
            </div>
            <p className="body">{e.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="section">
      <div className="section-head reveal">
        <h2 className="display">Research</h2>
        <span className="display dim">&amp; wins</span>
      </div>
      <a className="card paper reveal" href={profile.scholar} target="_blank" rel="noreferrer">
        <p className="label">{research.date} · Published paper</p>
        <h3>{research.title}</h3>
        <p className="body">{research.summary}</p>
        <span className="label link">Google Scholar <Arrow /></span>
      </a>
      <div className="pillars">
        {recognition.map(([t, d], i) => (
          <div key={t} className="pillar reveal">
            <span className="label">0{i + 1}</span>
            <h3>{t}</h3>
            <p className="body">{d}</p>
          </div>
        ))}
      </div>
      <div className="certs reveal">
        <p className="label">Certifications</p>
        <ul>{certifications.map(c => <li key={c}>{c}</li>)}</ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={marquee} className="band" />
      <Work />
      <Myself />
      <Stack />
      <Experience />
      <Research />
    </>
  )
}
