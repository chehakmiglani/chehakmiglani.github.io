import { Link } from './router.jsx'
import { Arrow } from './Chrome.jsx'
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
      <div className="case-top">
        <Link to="/#work" className="label back"><Arrow dir="w" /> Return to work</Link>
        <span className="label dim">Case study / 0{idx + 1}</span>
      </div>

      <header className="case-hero">
        <div className="case-glow" aria-hidden="true" />
        <div className="case-title">
          <h1 className="display">{p.name}</h1>
          <p className="body lead">{p.summary}</p>
        </div>
        <aside className="case-side">
          <div className="card case-meta">
            <dl>
              {meta.map(([k, v, live]) => (
                <div key={k}>
                  <dt className="label">{k}</dt>
                  <dd>{live && <span className="dot" />}{v}</dd>
                </div>
              ))}
            </dl>
            <p className="label">Core stack</p>
            <ul className="chips">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="case-actions">
            {p.live && <a className="cta" href={p.live} target="_blank" rel="noreferrer">Open live site <Arrow /></a>}
            {p.code && <a className="cta ghost" href={p.code} target="_blank" rel="noreferrer">Inspect repository <Arrow /></a>}
          </div>
        </aside>
      </header>

      {p.image && (
        <figure className="showcase reveal">
          <div className="frame">
            <div className="frame-bar"><i /><i /><i />{p.live && <span>{p.live.replace('https://', '')}</span>}</div>
            <img src={p.image} alt={`${p.name} interface`} />
          </div>
          <figcaption className="label">{p.imageNote}</figcaption>
        </figure>
      )}

      <section className="card snapshot reveal">
        <p className="label">System snapshot</p>
        <div className="snap-grid">
          {[['◐', 'Challenge', p.challenge], ['◇', 'Approach', p.approach], ['◎', 'Outcome', p.outcome]].map(([ic, t, d]) => (
            <div key={t}>
              <h3><span className="ic">{ic}</span>{t}</h3>
              <p className="body">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="method reveal">
        <div>
          <p className="label">Methodology</p>
          <p className="method-text">{p.methodology}</p>
        </div>
        <div className="card metrics">
          <p className="label">Delivery metrics</p>
          <ul>{p.metrics.map(m => <li key={m}><span className="dot" />{m}</li>)}</ul>
        </div>
      </section>

      <section className="flow">
        <p className="label center reveal">Execution flow</p>
        <ol>
          {p.flow.map((f, i) => (
            <li key={f} className="reveal" style={{ '--d': `${i * 80}ms` }}>
              <span className="node" />
              <span className="flow-pill"><b>0{i + 1}</b>{f}</span>
            </li>
          ))}
        </ol>
      </section>

      <Link to={`/work/${next.slug}`} className="next">
        <span className="label">Next case study</span>
        <span className="display">{next.name} <Arrow dir="e" /></span>
      </Link>
    </article>
  )
}
