import { Link } from './router.jsx'
import { Arrow } from './Chrome.jsx'
import { Scramble, Tilt } from './fx.jsx'
import { projects } from './data.js'

export default function CaseStudy({ project: p }) {
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const meta = [
    ['Role', p.meta.role],
    ['Status', p.meta.status, true],
    ['Type', p.meta.type],
    ['Category', p.category],
  ]
  return (
    <article className="case" style={{ '--h': p.hue }}>
      <div className="case-aurora" aria-hidden="true" />
      <div className="case-top">
        <Link to="/#work" className="back mono-label"><Arrow dir="w" /> All projects</Link>
        <span className="mono-label">case_study / 0{idx + 1}</span>
      </div>

      <header className="case-hero">
        <div>
          <p className="eyebrow"><span>0{idx + 1}</span> / {p.category.toLowerCase()}</p>
          <h1 className="case-title"><Scramble text={p.name} /></h1>
          <p className="lede">{p.summary}</p>
          <div className="case-actions">
            {p.live && <a className="btn primary" href={p.live} target="_blank" rel="noreferrer">Open live site <Arrow /></a>}
            {p.code && <a className="btn ghost" href={p.code} target="_blank" rel="noreferrer">View source <Arrow /></a>}
          </div>
        </div>
        <dl className="case-meta glass">
          {meta.map(([k, v, live]) => (
            <div key={k}>
              <dt className="mono-label">{k}</dt>
              <dd>{live && <span className="dot" />}{v}</dd>
            </div>
          ))}
          <div className="full">
            <dt className="mono-label">Stack</dt>
            <dd><ul className="chips">{p.tags.map(t => <li key={t}>{t}</li>)}</ul></dd>
          </div>
        </dl>
      </header>

      {p.image && (
        <figure className="showcase reveal">
          <Tilt className="frame" max={4}>
            <div className="frame-bar"><i /><i /><i />{p.live && <span>{p.live.replace('https://', '')}</span>}</div>
            <img src={p.image} alt={`${p.name} interface`} />
            <div className="glare" />
          </Tilt>
          <figcaption className="mono-label">{p.imageNote}</figcaption>
        </figure>
      )}

      <section className="snap reveal">
        {[['01', 'Challenge', p.challenge], ['02', 'Approach', p.approach], ['03', 'Outcome', p.outcome]].map(([n, t, d]) => (
          <div key={t} className="snap-card glass">
            <span className="mono-label">{n} · {t}</span>
            <p>{d}</p>
          </div>
        ))}
      </section>

      <section className="method reveal">
        <div>
          <p className="eyebrow"><span>//</span> methodology</p>
          <p className="method-text">{p.methodology}</p>
        </div>
        <div className="metrics glass">
          <p className="mono-label">Delivery metrics</p>
          <ul>{p.metrics.map(m => <li key={m}><span className="tick">✓</span>{m}</li>)}</ul>
        </div>
      </section>

      <section className="pipeline reveal">
        <p className="eyebrow"><span>//</span> execution pipeline</p>
        <ol>
          {p.flow.map((f, i) => (
            <li key={f} style={{ '--i': i }}>
              <span className="pipe-node">{String(i + 1).padStart(2, '0')}</span>
              <span className="pipe-label">{f}</span>
            </li>
          ))}
        </ol>
      </section>

      <Link to={`/work/${next.slug}`} className="next glass">
        <span className="mono-label">Next project</span>
        <span className="next-name">{next.name} <Arrow dir="e" /></span>
      </Link>
    </article>
  )
}
