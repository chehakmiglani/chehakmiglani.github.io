// All site content lives here — edit this file to update the portfolio.
// Any list left empty ([]) hides its section automatically.
// Source: Resume, August 2026.

export const profile = {
  name: 'Chehak Miglani',
  title: 'Software Engineer · Full-stack & ML',
  tagline:
    'I build full-stack products and the machine-learning pieces that make them smarter — from Spring Boot, FastAPI and Node backends to React and Vue frontends.',
  location: 'Delhi, India',
  email: 'chehakmiglani.2004@gmail.com',
  github: 'https://github.com/chehakmiglani',
  linkedin: 'https://www.linkedin.com/in/chehak-miglani',
  scholar: 'https://scholar.google.com/citations?user=4_-t85sAAAAJ&hl=en',
  resume: '', // optional: add a link to a hosted PDF, e.g. '/resume.pdf'
}

export const about = [
  'Computer Science graduate from Manipal University Jaipur (B.Tech, CGPA 8.91, Dean’s List).',
  'I’ve shipped real work across three internships — full-stack enterprise Java and React at Infosys, responsive frontends at Nagarro, and backend systems at TechDost. I’ve also published research on ensemble learning for air-quality prediction, and I read, write and speak Japanese (JLPT N4, NAT-Q3).',
]

export const stats = [
  { value: '3', label: 'internships' },
  { value: '8.91', label: 'CGPA' },
  { value: '2×', label: 'hackathon runner-up' },
  { value: 'N3', label: 'level Japanese (NAT-Q3)' },
]

export const skills = [
  { group: 'Languages', items: ['Java', 'JavaScript', 'TypeScript', 'Python', 'PHP', 'C / C++', 'SQL'] },
  { group: 'Web', items: ['React', 'Vue 3', 'Tailwind CSS', 'Node.js', 'Express', 'FastAPI'] },
  { group: 'Backend & data', items: ['Spring Boot', 'Spring Security', 'MySQL', 'MongoDB', 'REST APIs', 'JWT'] },
  { group: 'ML / AI', items: ['scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'OpenAI API (LLM)'] },
  { group: 'Testing & quality', items: ['JUnit', 'Mockito', 'Vitest', 'Playwright', 'SonarQube'] },
  { group: 'Tools', items: ['Git', 'CI/CD', 'Linux', 'Agile / Scrum'] },
]

export const projects = [
  {
    name: 'Oraculum',
    kind: 'AI career intelligence platform',
    description:
      'LLM-powered APIs for resume analysis, career-roadmap generation and cover-letter writing. Processes 100+ resumes a day with 90%+ keyword-extraction accuracy. JWT auth and a CI/CD pipeline cut testing time by 35% and deployment errors by 20%.',
    stack: ['Vue 3', 'TypeScript', 'FastAPI', 'OpenAI', 'PyPDF', 'JWT', 'Vitest', 'Playwright'],
    live: 'https://oraculum-iota.vercel.app',
    code: 'https://github.com/chehakmiglani/oraculum',
  },
  {
    name: 'Rotino',
    kind: 'Food delivery platform',
    description:
      'Full-stack ordering system with role-based auth, stress-tested for 1,000+ concurrent orders, with a 95% payment success rate through the Razorpay sandbox API.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'JWT'],
    live: 'https://rotino-frontend.onrender.com',
    code: 'https://github.com/chehakmiglani/Rotinodelivery',
  },
  {
    name: 'Brahma DMS',
    kind: 'Disaster response & coordination · SAP Hackfest finalist',
    description:
      'Real-time platform integrating drone and quadbot simulation with geospatial visualization. Reduced incident latency by 40% and handles 200+ simultaneous reports.',
    stack: ['PHP', 'MySQL', 'Leaflet.js', 'JavaScript', 'Robotics simulation'],
    live: '',
    code: '',
  },
]

export const experience = [
  {
    role: 'Trainee Intern (Java)',
    company: 'Infosys',
    period: 'Jan — May 2026',
    points: [
      'Worked on a full-stack enterprise project: backend services in Java, Spring Boot and Spring Security on MySQL, with responsive frontends in React and TypeScript.',
      'Wrote clean, testable code with JUnit and Mockito, and kept code-quality standards with SonarQube.',
    ],
  },
  {
    role: 'Web Development Intern',
    company: 'Nagarro',
    period: 'May — Jul 2025',
    points: [
      'Built responsive frontend modules, improving mobile usability by 25% and cutting UI bugs by 10%.',
    ],
  },
  {
    role: 'Backend Intern',
    company: 'TechDost',
    period: 'Jun — Dec 2024',
    points: [
      'Built a Laravel school-management portal (ARP system) for 500+ users; automated PHP/MySQL workflows, cutting manual effort by 60% and admin workload by 30%.',
      'Optimized MySQL queries and error handling, improving API latency by 40%.',
    ],
  },
]

export const education = [
  {
    degree: 'B.Tech, Computer Science',
    school: 'Manipal University Jaipur',
    period: '2022 — 2026',
    detail: 'CGPA 8.91 · Dean’s List (semesters 1, 2 and 4)',
  },
]

// Set to null to hide the paper card.
export const research = {
  title: 'Hybrid Meta-Ensemble Learning for PM10 Concentration Prediction',
  date: 'Apr 2025',
  summary:
    'A hybrid meta-ensemble model (Python, scikit-learn, XGBoost) for PM10 air-quality prediction, achieving 12% lower MAE and 15% lower RMSE than baseline models.',
}

export const achievements = [
  { title: 'Code with Cisco 2025 — 1st Runner-up', detail: 'Smart home automation project.' },
  { title: 'SAP PSGitech Hackfest — Runner-up', detail: 'Disaster management platform using quadbots and drones.' },
  { title: 'Dean’s List', detail: 'Semesters 1, 2 and 4 — GPA above 9.0.' },
  { title: 'Japanese — JLPT N4, NAT-Q3', detail: 'NAT-Q3 (2025) is equivalent to JLPT N3. Perfect score in CBSE Class X Japanese.' },
]

export const certifications = [
  'OOP in Java (Oracle)',
  'DSA & Algorithms (NPTEL)',
  'Database SQL',
  'Software Testing (NPTEL)',
  'Python (NPTEL)',
  'CS50 (edX)',
  'CCNAv7 Enterprise',
  'Red Hat System Administration II',
]
