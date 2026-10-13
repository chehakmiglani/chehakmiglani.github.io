import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as en from './data.js'
import ja from './data.ja.js'

// Interface strings. Content (projects, experience…) lives in data.js / data.ja.js.
const UI = {
  en: {
    nav: { work: 'Work', about: 'About', japanese: 'Japanese', experience: 'Experience', research: 'Research', awards: 'Awards', contact: 'Contact' },
    search: 'Search', menu: 'Menu',
    status: 'Open to roles in India & Japan',
    iam: 'I’m a',
    viewWork: 'View my work', getInTouch: 'Get in touch', experienceAt: 'Experience at',
    workEyebrow: 'selected work', workTitle: ['Things I’ve ', 'shipped.'], moreOn: 'more on',
    aboutEyebrow: 'about',
    jpEyebrow: '日本語 · japanese',
    expEyebrow: 'experience', expTitle: ['Commit ', 'history.'],
    researchEyebrow: 'research', researchTitle: ['Published ', 'research.'], keyResults: 'Key results', method: 'Method', tools: 'Tools', awardsEyebrow: 'awards', awardsTitle: ['Wins & ', 'recognition.'], paper: 'Published paper', readScholar: 'Read on Google Scholar', certs: 'Certifications',
    contactEyebrow: 'contact', contactTitle: ['Let’s build something', 'together.'],
    contactLede: 'I’m open to software engineering roles in India and Japan. The fastest way to reach me is email.',
    openMenu: 'Open command menu', elsewhere: 'Elsewhere', localTime: 'Local time · IST', statusLabel: 'Status',
    builtWith: 'Built with React + Vite · hand-coded canvas',
    // case study
    allProjects: 'All projects', caseStudy: 'case_study', role: 'Role', statusK: 'Status', type: 'Type', category: 'Category', stack: 'Stack',
    openLive: 'Open live site', viewSource: 'View source', challenge: 'Challenge', approach: 'Approach', outcome: 'Outcome',
    methodology: 'methodology', metrics: 'Delivery metrics', pipeline: 'execution pipeline', nextProject: 'Next project',
    // palette
    go: 'Go to', placeholder: 'Type a command or search…', noResults: 'No results for', navigate: 'navigate', select: 'select',
    gNav: 'Navigate', gProjects: 'Projects', gContact: 'Contact', gLinks: 'Links', gLang: 'Language',
    copyEmail: 'Copy email address', sendEmail: 'Send an email', copied: 'Email copied to clipboard',
    switchLang: '日本語に切り替え', notFound: ['This page drifted ', 'out of range.'], home: 'Return home',
  },
  ja: {
    nav: { work: '制作実績', about: '自己紹介', japanese: '日本語', experience: '職歴', research: '研究', awards: '受賞', contact: '連絡先' },
    search: '検索', menu: 'メニュー',
    status: 'インド・日本での就職を希望しています',
    iam: '',
    viewWork: '制作実績を見る', getInTouch: 'お問い合わせ', experienceAt: '経験企業',
    workEyebrow: '制作実績', workTitle: ['これまでに', 'つくったもの。'], moreOn: 'もっと見る',
    aboutEyebrow: '自己紹介',
    jpEyebrow: '日本語 · japanese',
    expEyebrow: '職歴', expTitle: ['職歴の', 'コミット履歴。'],
    researchEyebrow: '研究', researchTitle: ['研究', '論文。'], keyResults: '主な成果', method: '手法', tools: '使用技術', awardsEyebrow: '受賞', awardsTitle: ['受賞・', '表彰。'], paper: '論文', readScholar: 'Google Scholar で読む', certs: '資格・修了',
    contactEyebrow: '連絡先', contactTitle: ['一緒に、', 'つくりましょう。'],
    contactLede: 'インド・日本でのソフトウェアエンジニア職を希望しています。ご連絡はメールがいちばん早いです。',
    openMenu: 'コマンドメニュー', elsewhere: 'リンク', localTime: '現地時刻 · IST', statusLabel: 'ステータス',
    builtWith: 'React + Vite で制作 · Canvas は手書きコード',
    allProjects: 'すべてのプロジェクト', caseStudy: 'ケーススタディ', role: '担当', statusK: 'ステータス', type: '種類', category: 'カテゴリ', stack: '使用技術',
    openLive: 'サイトを見る', viewSource: 'ソースコード', challenge: '課題', approach: 'アプローチ', outcome: '成果',
    methodology: '開発手法', metrics: '成果指標', pipeline: '開発プロセス', nextProject: '次のプロジェクト',
    go: '移動：', placeholder: 'コマンドを入力、または検索…', noResults: '該当なし：', navigate: '移動', select: '決定',
    gNav: 'ナビゲーション', gProjects: 'プロジェクト', gContact: '連絡', gLinks: 'リンク', gLang: '言語',
    copyEmail: 'メールアドレスをコピー', sendEmail: 'メールを送る', copied: 'メールアドレスをコピーしました',
    switchLang: 'Switch to English', notFound: ['このページは', '見つかりません。'], home: 'ホームへ戻る',
  },
}

function buildJa() {
  const projects = en.projects.map(p => {
    const o = ja.projects[p.slug] || {}
    return { ...p, ...o, meta: { ...p.meta, ...(o.meta || {}) } }
  })
  const experience = en.experience.map(e => ({ ...e, ...(ja.experience[e.company] || {}) }))
  return { ...en, ...ja, projects, experience, profile: { ...en.profile, ...ja.profile }, research: { ...en.research, ...ja.research } }
}

const CONTENT = { en: { ...en }, ja: buildJa() }

const Ctx = createContext(null)

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang')
    if (q === 'ja' || q === 'en') return q
    const s = localStorage.getItem('lang')
    if (s === 'ja' || s === 'en') return s
  } catch {}
  return 'en'
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang)
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('lang', lang) } catch {}
  }, [lang])
  const value = useMemo(() => ({
    lang, setLang, toggle: () => setLang(l => (l === 'en' ? 'ja' : 'en')),
    t: UI[lang], c: CONTENT[lang],
  }), [lang])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useLang = () => useContext(Ctx)
