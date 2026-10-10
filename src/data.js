// All site content lives here — edit this file to update the portfolio.
// Any list left empty ([]) hides its section automatically.
// NOTE: placeholder content from the Feb 2026 resume — to be replaced with the latest resume.

export const profile = {
  name: 'Chehak Miglani',
  title: 'Software Engineer · Data & ML',
  tagline:
    'I build full-stack products and the machine-learning pieces that make them smarter — from FastAPI and Node backends to React and Vue frontends.',
  location: 'Delhi, India',
  email: 'chehakmiglani.2004@gmail.com',
  github: 'https://github.com/chehakmiglani',
  linkedin: 'https://www.linkedin.com/in/chehak-miglani',
  scholar: 'https://scholar.google.com/citations?user=4_-t85sAAAAJ',
  resume: '', // optional: add a link to a hosted PDF, e.g. '/resume.pdf'
}

export const about = [
  'B.Tech Computer Science student at Manipal University Jaipur (CGPA 8.91, Dean’s List), graduating May 2026.',
  'I’ve shipped production work across four internships — frontend performance at Nagarro, ML-backed dashboards at SDC, backend systems at TechDost, and enterprise Java at Infosys. I also published research on ensemble learning for air-quality prediction.',
]

export const stats = [
  { value: '4', label: 'internships' },
  { value: '8.91', label: 'CGPA' },
  { value: '2×', label: 'hackathon runner-up' },
  { value: '1', label: 'research paper' },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'Java', 'C / C++', 'SQL', 'PHP'] },
  { group: 'Frontend', items: ['React', 'Vue 3', 'Tailwind', 'React Query', 'Leaflet.js', 'HTML / CSS'] },
  { group: 'Backend', items: ['FastAPI', 'Node.js', 'Express', 'Laravel', 'JWT auth', 'REST APIs'] },
  { group: 'Data & ML', items: ['scikit-learn', 'XGBoost', 'Neural networks', 'Pandas', 'NumPy', 'Matplotlib', 'OpenAI API'] },
  { group: 'Data stores', items: ['MySQL', 'MongoDB'] },
  { group: 'Tooling', items: ['Git', 'Linux', 'Vitest', 'Playwright', 'CI/CD', 'Agile'] },
]

export const projects = [
  {
    name: 'Oraculum',
    kind: 'AI career intelligence platform',
    description:
      'Chat, resume analysis, career-roadmap generation and cover-letter writing powered by OpenAI. Handles 100+ resumes a day with 90%+ keyword-extraction accuracy, behind JWT auth and a Vitest + Playwright CI pipeline that cut testing time by 35%.',
    stack: ['Vue 3', 'TypeScript', 'FastAPI', 'OpenAI', 'PyPDF', 'JWT', 'Playwright'],
    live: 'https://oraculum-iota.vercel.app',
    code: 'https://github.com/chehakmiglani/oraculum',
    featured: true,
  },
  {
    name: 'Rotino',
    kind: 'On-demand food delivery',
    description:
      'Full-stack ordering system with role-based auth and Razorpay sandbox payments. Stress-tested to 1,000+ concurrent orders at a 95% transaction success rate.',
    stack: ['React', 'Tailwind', 'Node.js', 'Express', 'MongoDB', 'Razorpay'],
    live: 'https://rotino-frontend.onrender.com',
    code: 'https://github.com/chehakmiglani/Rotinodelivery',
    featured: true,
  },
  {
    name: 'Brahma DMS',
    kind: 'Disaster response & coordination · SAP Hackfest finalist',
    description:
      'Real-time disaster coordination combining drone and quadbot simulation with geospatial maps. Cut incident-reporting latency by 40% and handles 200+ simultaneous reports.',
    stack: ['PHP', 'MySQL', 'Leaflet.js', 'JavaScript', 'Robotics sim'],
    live: '',
    code: '',
    featured: true,
  },
]

export const experience = [
  {
    role: 'Trainee Intern (Java)',
    company: 'Infosys',
    period: 'Jan 2026 — Present',
    points: [
      'Enterprise Java training across OOP, data structures, REST and Agile practice.',
      'Built backend mini-projects with API integration and MySQL connectivity; took part in peer code reviews.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Nagarro',
    period: 'May — Jul 2025',
    points: [
      'Built responsive frontend modules that improved mobile usability by 25%.',
      'Optimized component rendering, cutting average page load by 1.3s.',
    ],
  },
  {
    role: 'Software Developer Intern',
    company: 'SDC',
    period: 'Jan — May 2025',
    points: [
      'Built ML-integrated web apps that raised prediction accuracy 18%, serving dashboards for 200+ users.',
      'Automated PHP/MySQL workflows — 60% less manual effort; reports in 5 min instead of 15.',
    ],
  },
  {
    role: 'Backend Intern',
    company: 'TechDost',
    period: 'Jun — Dec 2024',
    points: [
      'Delivered an ARP system for 500+ users, reducing admin workload by 30%.',
      'Tuned MySQL queries and error handling: 40% lower API latency, 25% higher throughput.',
    ],
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science',
    school: 'Manipal University Jaipur',
    period: '2022 — 2026',
    detail: 'CGPA 8.91 · Dean’s List · DSA, ML, AI, DBMS, Image Processing, Software Testing',
  },
]

// Set to null to hide the paper card.
export const research = {
  title: 'Hybrid Meta-Ensemble Learning for PM10 Concentration Prediction',
  date: 'Apr 2025',
  summary:
    'A hybrid meta-ensemble model for PM10 air-quality forecasting that achieved 12% lower MAE and 15% lower RMSE than baseline models.',
}

export const achievements = [
  { title: 'Code with Cisco 2025 — Runner-up', detail: 'Smart home automation project.' },
  { title: 'SAP PSGitech Hackfest — Runner-up', detail: 'Disaster management platform using drones and quadbots.' },
  { title: 'Dean’s List', detail: 'Semesters 1, 2 and 4 — GPA above 9.0.' },
  { title: 'Japanese — JLPT N4, NAT Q3', detail: 'Perfect score in CBSE Class 10 Japanese.' },
]

export const certifications = [
  'CS50 (edX)',
  'Python (NPTEL)',
  'DSA & Algorithms (NPTEL)',
  'Software Testing (NPTEL)',
  'OOP in Java (Oracle)',
  'CCNAv7 Enterprise',
  'Red Hat System Administration II',
  'Database SQL',
]
