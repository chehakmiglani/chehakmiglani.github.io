import { useEffect, useState } from 'react'
import { usePath, Link } from './router.jsx'
import { useLang } from './i18n.jsx'
import Home from './Home.jsx'
import CaseStudy from './CaseStudy.jsx'
import { Nav, CommandPalette, CursorGlow, Footer } from './Chrome.jsx'

function useReveal(key) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in)')
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach(e => io.observe(e))
    return () => io.disconnect()
  }, [key])
}

export default function App() {
  const { t, c, lang } = useLang()
  const path = usePath().replace(/\/+$/, '') || '/'
  const match = path.match(/^\/work\/([\w-]+)$/)
  const project = match && c.projects.find(p => p.slug === match[1])
  const [palette, setPalette] = useState(false)
  useReveal(path + lang)

  useEffect(() => {
    document.title = project ? `${project.name} — ${c.profile.name}` : `${c.profile.name} — ${c.profile.role}`
  }, [project, c])

  let page
  if (project) page = <CaseStudy slug={project.slug} />
  else if (path === '/') page = <Home />
  else page = (
    <section className="notfound">
      <p className="mono-label">error 404 · route_not_found</p>
      <h1 className="h2">{t.notFound[0]}<span className="grad">{t.notFound[1]}</span></h1>
      <Link to="/" className="btn primary">{t.home}</Link>
    </section>
  )

  return (
    <>
      <CursorGlow />
      <Nav onPalette={() => setPalette(true)} />
      <main key={path}>{page}</main>
      <Footer onPalette={() => setPalette(true)} />
      <CommandPalette open={palette} setOpen={setPalette} />
    </>
  )
}
