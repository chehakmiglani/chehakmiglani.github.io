import { useEffect, useRef, useState } from 'react'

const reduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export function useInView(opts = { threshold: 0.3 }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { setSeen(true); return }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, opts)
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, seen]
}

/* Text that "decodes" from random glyphs into the final string. */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01ABCDEFabcdef$%&'
export function Scramble({ text, delay = 0, speed = 28, className }) {
  const [out, setOut] = useState(() => (reduced() ? text : text.replace(/\S/g, ' ')))
  useEffect(() => {
    if (reduced()) { setOut(text); return }
    let frame = 0, raf, start
    const total = text.length
    const tick = t => {
      if (!start) start = t
      if (t - start < delay) { raf = requestAnimationFrame(tick); return }
      frame++
      const revealed = Math.floor(frame / (60 / speed) / 1.2)
      let s = ''
      for (let i = 0; i < total; i++) {
        const ch = text[i]
        if (ch === ' ') s += ' '
        else if (i < revealed) s += ch
        else if (i < revealed + 6) s += GLYPHS[(Math.random() * GLYPHS.length) | 0]
        else s += ' '
      }
      setOut(s)
      if (revealed < total) raf = requestAnimationFrame(tick)
      else setOut(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text])
  return <span className={className} aria-label={text}><span aria-hidden="true">{out}</span></span>
}

/* Interactive neural-network field for the hero. */
export function NeuralCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr, nodes = [], raf, visible = true
    const mouse = { x: -9999, y: -9999 }
    const palette = [[167, 139, 250], [94, 234, 212], [240, 171, 252]]

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth; h = canvas.clientHeight
      canvas.width = w * dpr; canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(90, (w * h) / 14000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.6, c: palette[(Math.random() * 3) | 0], p: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const LINK = 130
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy; n.p += 0.02
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        const dx = mouse.x - n.x, dy = mouse.y - n.y, d = Math.hypot(dx, dy)
        if (d < 180) { n.x -= dx * 0.004; n.y -= dy * 0.004 }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${(1 - d / LINK) * 0.22})`
            ctx.lineWidth = 0.7
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 200) {
          ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${(1 - md / 200) * 0.55})`
          ctx.lineWidth = 0.9
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
        const glow = 0.55 + Math.sin(a.p) * 0.35
        ctx.fillStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${glow})`
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill()
      }
    }

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop) }
    const onMove = e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
    const onLeave = () => { mouse.x = mouse.y = -9999 }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    io.observe(canvas)
    if (reduced()) draw(); else loop()
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])
  return <canvas ref={ref} className="neural" aria-hidden="true" />
}

/* Number that counts up when scrolled into view. */
export function Counter({ value, decimals = 0, suffix = '' }) {
  const [ref, seen] = useInView({ threshold: 0.5 })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!seen) return
    if (reduced()) { setN(value); return }
    let raf, start
    const dur = 1600
    const tick = t => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      setN(value * (1 - Math.pow(1 - p, 4)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [seen])
  const shown = decimals ? n.toFixed(decimals) : Math.round(n).toLocaleString('en-US')
  return <span ref={ref}>{shown}{suffix}</span>
}

/* 3D tilt + light glare that follows the pointer. */
export function Tilt({ children, className = '', max = 8, ...rest }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el || reduced()) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${(0.5 - y) * max}deg`)
    el.style.setProperty('--ry', `${(x - 0.5) * max}deg`)
    el.style.setProperty('--gx', `${x * 100}%`)
    el.style.setProperty('--gy', `${y * 100}%`)
  }
  const onLeave = () => {
    const el = ref.current; if (!el) return
    el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg')
  }
  return <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>{children}</div>
}

/* Button that leans toward the cursor. */
export function Magnetic({ as: Tag = 'a', className = '', children, ...rest }) {
  const ref = useRef(null)
  const onMove = e => {
    const el = ref.current; if (!el || reduced()) return
    const r = el.getBoundingClientRect()
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`
  }
  const onLeave = () => { if (ref.current) ref.current.style.transform = '' }
  return <Tag ref={ref} className={`magnetic ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} {...rest}>{children}</Tag>
}

/* Types a role, holds, deletes it, then types the next one. */
export function RoleTyper({ roles }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [phase, setPhase] = useState('type')
  useEffect(() => { setI(0); setText(''); setPhase('type') }, [roles])
  useEffect(() => {
    if (reduced()) { setText(roles[0]); return }
    const word = roles[i % roles.length]
    let t
    if (phase === 'type') {
      if (text.length < word.length) t = setTimeout(() => setText(word.slice(0, text.length + 1)), 55)
      else t = setTimeout(() => setPhase('hold'), 0)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('delete'), 1900)
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 28)
      else { setI(x => x + 1); setPhase('type') }
    }
    return () => clearTimeout(t)
  }, [text, phase, i, roles])
  return (
    <span className="role-typer" aria-live="polite">
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true" className="grad">{text}</span><span className="type-caret" aria-hidden="true" />
    </span>
  )
}

/* Terminal that types its lines once visible. */
export function Typer({ lines, prompt = '$ whoami --verbose' }) {
  const [ref, seen] = useInView({ threshold: 0.4 })
  const full = lines.map(([k, v]) => `${k.padEnd(11)}${v}`)
  const [count, setCount] = useState(0)
  const total = prompt.length + full.reduce((a, l) => a + l.length, 0)
  useEffect(() => {
    if (!seen) return
    if (reduced()) { setCount(total); return }
    let i = 0
    const id = setInterval(() => { i += 2; setCount(Math.min(i, total)); if (i >= total) clearInterval(id) }, 16)
    return () => clearInterval(id)
  }, [seen])
  let left = count
  const take = s => { const t = s.slice(0, Math.max(0, left)); left -= s.length; return t }
  const p = take(prompt)
  return (
    <div ref={ref} className="term glass">
      <div className="term-bar"><i /><i /><i /><span>chehak@portfolio — zsh</span></div>
      <pre>
        <span className="t-prompt">{p}</span>{'\n'}
        {full.map((l, i) => {
          const t = take(l)
          if (!t) return null
          const [k, v] = [t.slice(0, 11), t.slice(11)]
          return <span key={i}><span className="t-key">{k}</span><span className="t-val">{v}</span>{'\n'}</span>
        })}
        {count >= total && <><span className="t-prompt">$ </span><span className="caret" /></>}
      </pre>
    </div>
  )
}
