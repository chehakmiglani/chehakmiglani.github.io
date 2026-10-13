import { Link } from './router.jsx'
import { Arrow } from './Chrome.jsx'
import { Scramble, Tilt } from './fx.jsx'
import { useLang } from './i18n.jsx'

export default function CaseStudy({ slug }) {
  const { t, c } = useLang()
  const projects = c.projects
  const p = projects.find(x => x.slug === slug)
  const idx = projects.indexOf(p)
  const next = projects[(idx + 1) % projects.length]
  const meta = [
    [t.role, p.meta.role],
    [t.statusK, p.meta.status, true],
    [t.type, p.meta.type],
    [t.category, p.category],
  ]
  return (
    <article className="case" style={{ '--h': p.hue }}>
      <div className="case-aurora" aria-hidden="true" />
      <div className="case-top">
        <Link to="/#work" className="back mono-label"><Arrow dir="w" /> {t.allProjects}</Link>
        <span className="mono-label">{t.caseStudy} / 0{idx + 1}</span>
      </div>

      <header className="case-hero">
        <div>
          <p className="eyebrow"><span>0{idx + 1}</span> / {p.category}</p>
          <h1 className="case-title"><Scramble text={p.name} /></h1>
          <p className="lede">{p.summary}</p>
          <div className="case-actions">
            {p.live && <a className="btn primary" href={p.live} target="_blank" rel="noreferrer">{t.openLive} <Arrow /></a>}
            {p.code && <a className="btn ghost" href={p.code} target="_blank" rel="noreferrer">{t.viewSource} <Arrow /></a>}
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
            <dt className="mono-label">{t.stack}</dt>
            <dd><ul className="chips">{p.tags.map(x => <li key={x}>{x}</li>)}</ul></dd>
          </div>
        </dl>
      </header>

      {p.image && (
        <figure className="showcase reveal">
          <Tilt className="frame" max={4}>
            <div className="frame-bar"><i /><i /><i />{p.live && <span>{p.live.replace('https://', '')}</span>}</div>
            <img src={p.image} alt={p.name} />
            <div className="glare" />
          </Tilt>
          <figcaption className="mono-label">{p.imageNote}</figcaption>
        </figure>
      )}

      <section className="snap reveal">
        {[['01', t.challenge, p.challenge], ['02', t.approach, p.approach], ['03', t.outcome, p.outcome]].map(([n, k, d]) => (
          <div key={n} className="snap-card glass">
            <span className="mono-label">{n} · {k}</span>
            <p>{d}</p>
          </div>
        ))}
      </section>

      <section className="method reveal">
        <div>
          <p className="eyebrow"><span>//</span> {t.methodology}</p>
          <p className="method-text">{p.methodology}</p>
        </div>
        <div className="metrics glass">
          <p className="mono-label">{t.metrics}</p>
          <ul>{p.metrics.map(m => <li key={m}><span className="tick">✓</span>{m}</li>)}</ul>
        </div>
      </section>

      <section className="pipeline reveal">
        <p className="eyebrow"><span>//</span> {t.pipeline}</p>
        <ol>
          {p.flow.map((f, i) => (
            <li key={i}>
              <span className="pipe-node">{String(i + 1).padStart(2, '0')}</span>
              <span className="pipe-label">{f}</span>
            </li>
          ))}
        </ol>
      </section>

      <Link to={`/work/${next.slug}`} className="next glass">
        <span className="mono-label">{t.nextProject}</span>
        <span className="next-name">{next.name} <Arrow dir="e" /></span>
      </Link>
    </article>
  )
}
