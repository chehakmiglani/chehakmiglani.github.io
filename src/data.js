// All site content lives here — edit this file to update the portfolio.
// Source: Resume, August 2026.

export const profile = {
  name: 'Chehak Miglani',
  short: 'CM',
  role: 'Software Engineer · Full-stack & ML',
  location: 'Delhi, India',
  timezone: 'Asia/Kolkata',
  nameKana: 'チェハク・ミグラニ',
  status: 'Open to roles in India & Japan',
  email: 'chehakmiglani.2004@gmail.com',
  github: 'https://github.com/chehakmiglani',
  linkedin: 'https://www.linkedin.com/in/chehak-miglani',
  scholar: 'https://scholar.google.com/citations?user=4_-t85sAAAAJ&hl=en',
  resume: '', // optional: put a PDF in /public and set e.g. '/resume.pdf' — a download button appears in the dock
}

// The hero types and cycles through these roles.
export const roles = ['Full-stack engineer', 'Backend developer (Java · Spring Boot)', 'AI / ML builder', 'Japanese-speaking engineer']

export const hero = {
  sub: 'I build products end to end, from idea to production, across Spring Boot, React and FastAPI. Comfortable working in English and Japanese.',
}

// The dedicated Japanese section.
export const japan = {
  title: ['Ready to work', 'in Japan.'],
  sub: '日本で働く準備ができています。',
  body: [
    'Japanese is a big part of who I am. I’ve passed JLPT N4 and NAT 3Q (equivalent to N3), and I can read, write and hold conversations in Japanese, including in a work setting.',
    'I’m looking for software development and web engineering roles, and I’m flexible about working in Japan.',
  ],
  skills: ['Reading', 'Writing', 'Conversation', 'Work in Japanese'],
  current: 'Current level',
  certified: 'Certified',
  timeline: [
    { date: '2020', title: 'CBSE Class X Japanese', note: 'Perfect score (100%) award' },
    { date: '2024.06', title: 'JLPT N4', note: 'Passed' },
    { date: '2024.06', title: 'NAT 4Q', note: 'Passed' },
    { date: '2025.06', title: 'NAT 3Q', note: 'Passed · equivalent to JLPT N3' },
  ],
}

export const companies = ['Infosys', 'Nagarro', 'TechDost', 'Manipal University']

// Counters on the home page. `value` animates up from 0.
export const stats = [
  { value: 3, suffix: '', label: 'internships shipped', note: 'Infosys · Nagarro · TechDost' },
  { value: 1000, suffix: '+', label: 'concurrent orders', note: 'Rotino load test' },
  { value: 100, suffix: '+', label: 'resumes / day', note: 'Oraculum in production' },
  { value: 8.91, suffix: '', label: 'CGPA', note: 'Dean’s List ×3', decimals: 2 },
]

export const marquee = [
  'Full-stack systems',
  'LLM applications',
  'Spring Boot',
  'React & Vue',
  'Machine learning',
  '日本語 · N3',
]

export const bio = {
  lines: [
    'I build full-stack products,',
    'and the ML pieces',
    'that make them smarter.',
  ],
  body: [
    'Computer Science graduate from Manipal University Jaipur (CGPA 8.91, Dean’s List). Three internships taught me the whole stack: enterprise Java and React at Infosys, responsive frontends at Nagarro, and backend systems at TechDost.',
    'I’ve published research on ensemble learning for air-quality prediction, and I read, write and speak Japanese.',
  ],
  terminal: [
    ['location', 'Delhi, India'],
    ['education', 'B.Tech CSE · MUJ · 8.91'],
    ['focus', 'full-stack · LLM apps · ML'],
    ['languages', 'English · 日本語 (NAT-Q3)'],
    ['status', 'open to work'],
  ],
}

export const stack = [
  'Java', 'TypeScript', 'Python', 'JavaScript', 'React', 'Vue 3',
  'Spring Boot', 'FastAPI', 'Node.js', 'Express', 'MySQL', 'MongoDB',
  'scikit-learn', 'XGBoost', 'Pandas', 'OpenAI API', 'JUnit', 'Playwright',
  'Tailwind CSS', 'PHP', 'C / C++', 'Git', 'Linux', 'CI/CD',
]

export const projects = [
  {
    slug: 'oraculum',
    name: 'Oraculum',
    category: 'AI Career Platform',
    tags: ['Vue 3', 'TypeScript', 'FastAPI', 'OpenAI', 'JWT', 'Playwright'],
    hue: 262,
    image: '/work/oraculum.jpg',
    imageNote: 'Live site · oraculum-iota.vercel.app',
    summary:
      'AI career intelligence platform. It analyses resumes, generates career roadmaps and writes cover letters, all powered by LLMs.',
    meta: { role: 'Full-stack + AI integration', status: 'Live', type: 'AI platform', stack: ['Vue 3', 'FastAPI', 'OpenAI'] },
    live: 'https://oraculum-iota.vercel.app',
    code: 'https://github.com/chehakmiglani/oraculum',
    challenge: 'Job seekers rarely get specific feedback on how their resume reads to a recruiter or an ATS.',
    approach: 'LLM-powered FastAPI services that parse a resume, extract keywords, and generate tailored roadmaps and cover letters.',
    outcome: '100+ resumes processed daily with 90%+ keyword-extraction accuracy.',
    methodology:
      'The backend is a set of focused FastAPI services: PyPDF handles parsing, the OpenAI API handles analysis and generation, and JWT secures every route. The client is Vue 3 + TypeScript. A Vitest + Playwright suite runs in CI on every change, which cut testing time by 35% and deployment errors by 20%.',
    metrics: ['100+ resumes processed daily', '90%+ keyword-extraction accuracy', '35% less testing time', '20% fewer deployment errors'],
    flow: ['Resume parsing', 'LLM analysis', 'Roadmaps & cover letters', 'JWT auth', 'CI/CD & deploy'],
  },
  {
    slug: 'rotino',
    name: 'Rotino',
    category: 'Food Delivery',
    tags: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    hue: 28,
    image: '/work/rotino.jpg',
    imageNote: 'Interface illustration',
    summary:
      'Full-stack food ordering platform with role-based access and integrated payments.',
    meta: { role: 'Full-stack developer', status: 'Live', type: 'Web platform', stack: ['React', 'Node.js', 'MongoDB'] },
    live: 'https://rotino-frontend.onrender.com',
    code: 'https://github.com/chehakmiglani/Rotinodelivery',
    challenge: 'Ordering systems must stay correct under bursts of traffic, so every order and every payment has to land exactly once.',
    approach: 'A MERN stack with role-based JWT auth for customers and admins, and Razorpay for payments.',
    outcome: 'Stress-tested at 1,000+ concurrent orders with a 95% payment success rate.',
    methodology:
      'A React + Tailwind frontend talks to an Express/Node API backed by MongoDB. Roles separate the customer and admin flows, and payments run through the Razorpay sandbox API. Before deploying on Render, the system was load-tested with bursts of concurrent orders.',
    metrics: ['1,000+ concurrent orders', '95% payment success rate', 'Role-based access control', 'Deployed on Render'],
    flow: ['Data modelling', 'Auth & roles', 'Ordering flow', 'Payments', 'Load testing & deploy'],
  },
  {
    slug: 'brahma-dms',
    name: 'Brahma DMS',
    category: 'Disaster Response',
    tags: ['PHP', 'MySQL', 'Leaflet.js', 'JavaScript', 'Robotics sim'],
    hue: 188,
    image: '/work/brahma.jpg',
    imageNote: 'Interface illustration',
    summary:
      'Real-time disaster response platform that coordinates simulated drones and quadbots on a live map.',
    meta: { role: 'Full-stack developer', status: 'SAP Hackfest finalist', type: 'Hackathon build', stack: ['PHP', 'MySQL', 'Leaflet.js'] },
    live: '',
    code: '',
    challenge: 'During a disaster, incident reports arrive faster than responders can coordinate them, and location context gets lost.',
    approach: 'A geospatial dashboard that plots incoming reports on a live map and dispatches simulated drones and quadbots to them.',
    outcome: '40% lower incident latency, with 200+ simultaneous reports handled.',
    methodology:
      'A PHP/MySQL backend stores incidents. A JavaScript + Leaflet.js frontend renders them in real time, and a robotics simulation layer handles drone and quadbot dispatch. It was built under hackathon time limits and presented as an SAP Hackfest finalist.',
    metrics: ['200+ simultaneous reports', '40% lower incident latency', 'Real-time geospatial view', 'Drone + quadbot simulation'],
    flow: ['Incident intake', 'Geospatial mapping', 'Robot simulation', 'Dispatch & coordination', 'Live demo'],
  },
]

export const experience = [
  {
    company: 'Infosys',
    role: 'Trainee Intern (Java)',
    period: 'Jan — May 2026',
    text: 'Full-stack enterprise project: backend services in Java, Spring Boot and Spring Security on MySQL, with React + TypeScript frontends. Tested with JUnit and Mockito; code quality tracked in SonarQube.',
  },
  {
    company: 'Nagarro',
    role: 'Web Development Intern',
    period: 'May — Jul 2025',
    text: 'Built responsive frontend modules, improving mobile usability by 25% and cutting UI bugs by 10%.',
  },
  {
    company: 'TechDost',
    role: 'Backend Intern',
    period: 'Jun — Dec 2024',
    text: 'Built a Laravel school-management portal for 500+ users. Automated PHP/MySQL workflows (60% less manual effort) and tuned queries for 40% lower API latency.',
  },
  {
    company: 'Manipal University Jaipur',
    role: 'B.Tech, Computer Science',
    period: '2022 — 2026',
    text: 'CGPA 8.91. Dean’s List in semesters 1, 2 and 4 (GPA above 9.0).',
  },
]

export const research = {
  title: 'Hybrid Meta-Ensemble Learning for PM10 Concentration Prediction',
  date: 'Apr 2025',
  summary: 'A hybrid meta-ensemble model for predicting PM10 air-quality concentration. Several base learners are combined by a meta-learner, which produced more accurate forecasts than any single baseline model.',
  results: [
    { value: 12, label: 'lower MAE', note: 'vs. baseline models' },
    { value: 15, label: 'lower RMSE', note: 'vs. baseline models' },
  ],
  pipeline: [
    ['Data', 'Pandas · NumPy'],
    ['Base learners', 'scikit-learn · XGBoost'],
    ['Meta-learner', 'stacked ensemble'],
    ['Forecast', 'PM10 concentration'],
  ],
  tools: ['Python', 'scikit-learn', 'XGBoost', 'Pandas', 'NumPy'],
}

// Awards section. `kind` groups the cards.
export const awards = [
  { kind: 'Hackathon', title: 'Code with Cisco 2025', rank: '1st Runner-up', detail: 'Smart home automation project.' },
  { kind: 'Hackathon', title: 'SAP PSGitech Hackfest', rank: 'Runner-up', detail: 'Brahma DMS: disaster management with drones and quadbots.' },
  { kind: 'Academic', title: 'Dean’s List', rank: '3 semesters', detail: 'Semesters 1, 2 and 4, with a GPA above 9.0.' },
  { kind: 'Language', title: 'CBSE Class X Japanese', rank: '100%', detail: 'Award for a perfect score in the board exam.' },
]

export const certifications = [
  'OOP in Java — Oracle', 'DSA & Algorithms — NPTEL', 'Software Testing — NPTEL', 'Python — NPTEL',
  'CS50 — edX', 'CCNAv7 Enterprise', 'Red Hat System Admin II', 'Database SQL',
]
