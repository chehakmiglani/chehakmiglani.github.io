import { useEffect, useState } from 'react'

// Tiny path router. GitHub Pages serves 404.html (a copy of index.html) for
// unknown paths, so /work/<slug> deep links load the app and resolve here.
export function usePath() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])
  return path
}

export function go(to) {
  const [p, hash] = to.split('#')
  if (p && p !== window.location.pathname) {
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView(), 60)
    else window.scrollTo(0, 0)
  } else if (hash) {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  }
}

export function Link({ to, children, ...rest }) {
  return (
    <a
      href={to}
      onClick={e => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
        e.preventDefault()
        go(to)
        rest.onNavigate?.()
      }}
      {...Object.fromEntries(Object.entries(rest).filter(([k]) => k !== 'onNavigate'))}
    >
      {children}
    </a>
  )
}
