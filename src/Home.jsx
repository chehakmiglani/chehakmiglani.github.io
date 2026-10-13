import { useEffect, useRef, useState } from 'react'
import { Link } from './router.jsx'
import { Arrow, Marquee } from './Chrome.jsx'
import { NeuralCanvas, Scramble, Counter, Tilt, Magnetic, Typer, RoleTyper } from './fx.jsx'
import { useLang } from './i18n.jsx'

function Eyebrow({ n, children }) {
  return <p className="eyebrow reveal"><span>{n}</span> / {children}</p>
}

function Hero() {
  const { t, c, lang } = useLang()
  return (
    <section className="hero">
      <NeuralCanvas />
      <div className="aurora a1" /><div className="aurora a2" /><div className="aurora a3" />
      <div className="hud hud-tl">DELHI ⇄ 東京<br />28.61°N · 77.21°E</div>
      <div className="hero-vertical" aria-hidden="true" lang="ja">ソフトウェアエンジニア</div>
      <div className="hud hud-tr">EN / 日本語<br />SYS.STATUS <span className="ok">● ONLINE</span></div>

      <div className="hero-inner">
        <span className="pill glass rise" style={{ '--d': '0ms' }}><span className="dot" />{t.status}</span>
        <h1 className="hero-name"><Scramble text={c.profile.name} /></h1>
        <p className="hero-kana rise" style={{ '--d': '600ms' }}>
          <span lang="ja">{c.profile.nameKana}</span>
          <a href="#japanese" className="jp-badge"><span lang="ja">日本語</span> · {lang === 'ja' ? <span lang="ja">N3 相当</span> : 'N3 level'}</a>
        </p>
        <p className="hero-role rise" style={{ '--d': '800ms' }}>
          {t.iam && <span className="iam">{t.iam}</span>}
          <RoleTyper roles={c.roles} />
        </p>
        <p className="lede rise" style={{ '--d': '950ms' }}>{c.hero.sub}</p>
        <div className="hero-ctas rise" style={{ '--d': '1050ms' }}>
          <Magnetic className="btn primary" href="#work">{t.viewWork} <Arrow dir="s" /></Magnetic>
          <Magnetic className="btn ghost" href={`mailto:${c.profile.email}`}>{t.getInTouch}</Magnetic>
        </div>
        <div className="companies rise" style={{ '--d': '1200ms' }}>
          <span className="mono-label">{t.experienceAt}</span>
          {c.companies.map(co => <span key={co} className="co">{co}</span>)}
        </div>
      </div>
      <a href="#stats" className="scroll-hint" aria-label="Scroll down"><span /></a>
    </section>
  )
}

function Stats() {
  const { c } = useLang()
  return (
    <section id="stats" className="section stats">
      {c.stats.map((s, i) => (
        <div key={i} className="stat glass reveal" style={{ '--d': `${i * 80}ms` }}>
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
    <Link to={`/work/${p.slug}`} className="pcard-link" aria-label={p.name}>
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
        <ul className="chips">{p.tags.slice(0, 4).map(tg => <li key={tg}>{tg}</li>)}</ul>
        <div className="glare" />
      </Tilt>
    </Link>
  )
}

function Work() {
  const { t, c } = useLang()
  const projects = c.projects
  const wrap = useRef(null), track = useRef(null)
  const [progress, setProgress] = useState(0)
  const [horizontal, setHorizontal] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)')
    let raf
    const update = () => {
      if (!mq.matches || !wrap.current) return
      const r = wrap.current.getBoundingClientRect()
      const dist = track.current.scrollWidth - window.innerWidth
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, dist)))
      track.current.style.transform = `translate3d(${-p * dist}px,0,0)`
      setProgress(p)
    }
    const layout = () => {
      if (!wrap.current) return
      const on = mq.matches
      setHorizontal(on)
      if (!on) { wrap.current.style.height = ''; track.current.style.transform = ''; return }
      const dist = track.current.scrollWidth - window.innerWidth
      wrap.current.style.height = `${dist + window.innerHeight}px`
      update()
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update) }
    layout()
    const ro = new ResizeObserver(layout); ro.observe(track.current)
    window.addEventListener('resize', layout)
    window.addEventListener('scroll', onScroll, { passive: true })
    mq.addEventListener?.('change', layout)
    return () => {
      ro.disconnect()
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
            <Eyebrow n="02">{t.workEyebrow}</Eyebrow>
            <h2 className="h2 reveal">{t.workTitle[0]}<span className="grad">{t.workTitle[1]}</span></h2>
          </div>
          <div className="work-progress" aria-hidden="true">
            <span className="mono-label">0{Math.min(projects.length, Math.floor(progress * projects.length) + 1)} / 0{projects.length}</span>
            <div className="bar"><i style={{ transform: `scaleX(${horizontal ? Math.max(0.04, progress) : 1})` }} /></div>
          </div>
        </div>
        <div className="work-track" ref={track}>
          {projects.map((p, i) => <ProjectCard key={p.slug} p={p} i={i} />)}
          <a className="pcard-more glass" href={c.profile.github} target="_blank" rel="noreferrer">
            <span className="mono-label">{t.moreOn}</span>
            <strong>GitHub</strong>
            <span className="round"><Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  )
}

function About() {
  const { t, c } = useLang()
  return (
    <section id="about" className="section about">
      <Eyebrow n="03">{t.aboutEyebrow}</Eyebrow>
      <h2 className="statement reveal">
        {c.bio.lines.map((l, i) => <span key={i} className={i === 1 ? 'grad' : ''}>{l} </span>)}
      </h2>
      <div className="about-grid">
        <div className="reveal">
          {c.bio.body.map((b, i) => <p key={i} className="body">{b}</p>)}
        </div>
        <div className="reveal"><Typer key={c.bio.terminal[0][1]} lines={c.bio.terminal} /></div>
      </div>
      <div className="stack-rows">
        <Marquee items={c.stack.slice(0, 12)} className="chips-marquee" />
        <Marquee items={c.stack.slice(12)} reverse className="chips-marquee" />
      </div>
    </section>
  )
}

const LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1']

function Japanese() {
  const { t, c, lang } = useLang()
  const j = c.japan
  return (
    <section id="japanese" className="section japan">
      <Eyebrow n="01">{t.jpEyebrow}</Eyebrow>
      <div className="japan-card glass reveal">
        <div className="japan-kanji" aria-hidden="true">日本語</div>
        <div className="japan-top">
          <div>
            <h2 className="h2">{j.title[0]}<br /><span className="grad">{j.title[1]}</span></h2>
            <p className="japan-sub" lang={lang === 'en' ? 'ja' : 'en'}>{j.sub}</p>
          </div>
          <div className="japan-body">
            {j.body.map((b, i) => <p key={i} className="body">{b}</p>)}
            <ul className="japan-skills">{j.skills.map(s => <li key={s}><span className="tick">✓</span>{s}</li>)}</ul>
          </div>
        </div>

        <div className="ladder" role="img" aria-label="JLPT level: N4 certified, N3 equivalent (NAT 3Q)">
          {LEVELS.map(l => (
            <div key={l} className={`rung ${l === 'N5' || l === 'N4' ? 'done' : ''} ${l === 'N3' ? 'now' : ''}`}>
              <span className="rung-bar" />
              <span className="rung-label">{l}</span>
              {l === 'N4' && <span className="rung-tag">{j.certified}</span>}
              {l === 'N3' && <span className="rung-tag now">{j.current} · NAT 3Q</span>}
            </div>
          ))}
        </div>

        <ol className="jp-timeline">
          {j.timeline.map((e, i) => (
            <li key={i}>
              <span className="mono-label">{e.date}</span>
              <strong>{e.title}</strong>
              <span className="note">{e.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function hash(s) {
  let h = 2166136261
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

function Experience() {
  const { t, c, lang } = useLang()
  return (
    <section id="experience" className="section">
      <Eyebrow n="04">{t.expEyebrow}</Eyebrow>
      <div className="exp-head">
        <h2 className="h2 reveal">{t.expTitle[0]}<span className="grad">{t.expTitle[1]}</span></h2>
        <code className="mono-label reveal">$ git log --graph --career</code>
      </div>
      <ol className="gitlog glass reveal">
        {c.experience.map((e, i) => (
          <li key={i} className={i === 0 ? 'head' : ''}>
            <div className="graph"><span className="node" /></div>
            <div className="commit">
              <p className="commit-line">
                <span className="sha">{hash(e.period + i)}</span>
                {i === 0 && <span className="ref">HEAD → main</span>}
                {i === c.experience.length - 1 && <span className="ref tag">tag: v1.0-graduate</span>}
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
  const { t, c } = useLang()
  const r = c.research
  return (
    <section id="research" className="section research">
      <Eyebrow n="05">{t.researchEyebrow}</Eyebrow>
      <h2 className="h2 reveal">{t.researchTitle[0]}<span className="grad">{t.researchTitle[1]}</span></h2>
      <article className="paper-feature glass reveal">
        <div className="paper-head">
          <div>
            <p className="mono-label">{r.date} · {t.paper}</p>
            <h3>{r.title}</h3>
            <p className="body">{r.summary}</p>
            <ul className="chips">{(r.tools || []).map(x => <li key={x}>{x}</li>)}</ul>
            <a className="btn ghost paper-btn" href={c.profile.scholar} target="_blank" rel="noreferrer">{t.readScholar} <Arrow /></a>
          </div>
          <div className="results">
            <p className="mono-label">{t.keyResults}</p>
            {r.results.map(x => (
              <div key={x.label} className="result">
                <p className="result-num">−<Counter value={x.value} />%</p>
                <p className="result-label">{x.label}</p>
                <p className="mono-label">{x.note}</p>
                <div className="result-bar"><i style={{ '--w': `${100 - x.value}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="ensemble">
          <p className="mono-label">{t.method}</p>
          <ol>
            {r.pipeline.map(([k, v], i) => (
              <li key={k} style={{ '--i': i }}>
                <span className="ens-node">{i === 1 ? <><i /><i /><i /></> : <b />}</span>
                <strong>{k}</strong>
                <span>{v}</span>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </section>
  )
}

function Awards() {
  const { t, c } = useLang()
  return (
    <section id="awards" className="section awards-sec">
      <Eyebrow n="06">{t.awardsEyebrow}</Eyebrow>
      <h2 className="h2 reveal">{t.awardsTitle[0]}<span className="grad">{t.awardsTitle[1]}</span></h2>
      <div className="award-grid">
        {c.awards.map((a, i) => (
          <Tilt key={a.title} className={`award-card glass reveal ${i < 2 ? 'big' : ''}`} max={5} style={{ '--d': `${i * 80}ms` }}>
            <div className="award-top">
              <span className="mono-label">{a.kind}</span>
              <span className="award-idx" aria-hidden="true">0{i + 1}</span>
            </div>
            <p className="award-rank grad">{a.rank}</p>
            <h3>{a.title}</h3>
            <p className="body">{a.detail}</p>
            <div className="glare" />
          </Tilt>
        ))}
      </div>
      <div className="certs reveal">
        <p className="mono-label">{t.certs}</p>
        <ul>{c.certifications.map(x => <li key={x} className="glass">{x}</li>)}</ul>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Japanese />
      <Work />
      <About />
      <Experience />
      <Research />
      <Awards />
    </>
  )
}
