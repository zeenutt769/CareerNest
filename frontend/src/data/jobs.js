export const jobs = [
    { id: 1, date: '20 May, 2025', company: 'Google', title: 'Frontend Engineer', initials: 'GG', accent: 'teal-accent', tags: ['Full-time', 'Entry Level', 'Remote'], salary: '₹45K/mo', salaryN: 45, location: 'Bangalore, IN', desc: 'Build next-gen web interfaces for Google products using React and TypeScript.', req: ['React/TypeScript proficiency', 'CSS/SCSS expertise', 'Git workflow', 'Web performance knowledge'], apply: 'https://careers.google.com' },
    { id: 2, date: '18 May, 2025', company: 'Amazon', title: 'SDE-1 (Backend)', initials: 'AMZ', accent: 'gold-accent', tags: ['Full-time', 'Senior Level', 'On-site'], salary: '₹60K/mo', salaryN: 60, location: 'Hyderabad, IN', desc: 'Work on AWS infrastructure and distributed systems powering millions of daily transactions.', req: ['Java/Python proficiency', 'Data Structures & Algorithms', 'System design basics', 'CS degree or equivalent'], apply: 'https://amazon.jobs' },
    { id: 3, date: '15 May, 2025', company: 'Flipkart', title: 'Data Science Intern', initials: 'FK', accent: 'blue-accent', tags: ['Internship', 'Entry Level', 'Hybrid'], salary: '₹25K/mo', salaryN: 25, location: 'Bangalore, IN', desc: '6-month internship on the Personalization team working with large-scale ML models.', req: ['Python & pandas', 'ML fundamentals', 'Statistics knowledge', 'Jupyter notebooks'], apply: 'https://flipkartcareers.com' },
    { id: 4, date: '12 May, 2025', company: 'Zomato', title: 'React Developer', initials: 'ZM', accent: 'rose-accent', tags: ['Full-time', 'Mid Level', 'Remote'], salary: '₹38K/mo', salaryN: 38, location: 'Delhi, IN', desc: "Build and maintain React apps for Zomato's consumer-facing product used by 50M+ users.", req: ['React/React Native', 'REST APIs', 'Redux state management', 'Mobile-first design'], apply: 'https://careers.zomato.com' },
    { id: 5, date: '10 May, 2025', company: 'Microsoft', title: 'Cloud Solutions Intern', initials: 'MS', accent: 'purple-accent', tags: ['Internship', 'Entry Level', 'Hybrid'], salary: '₹30K/mo', salaryN: 30, location: 'Hyderabad, IN', desc: 'Join the Azure team to build cloud-native solutions alongside senior engineers.', req: ['Azure basics', 'C# or Python', 'REST API knowledge', 'Problem solving'], apply: 'https://careers.microsoft.com' },
    { id: 6, date: '8 May, 2025', company: 'Razorpay', title: 'Full Stack Developer', initials: 'RZP', accent: 'gold-accent', tags: ['Full-time', 'Mid Level', 'Remote'], salary: '₹55K/mo', salaryN: 55, location: 'Bangalore, IN', desc: 'Build payment infrastructure products used by 8M+ businesses. End-to-end feature ownership.', req: ['Node.js & React', 'PostgreSQL/Redis', 'Microservices architecture', 'System design'], apply: 'https://razorpay.com/jobs' },
    { id: 7, date: '5 May, 2025', company: 'Swiggy', title: 'Android Developer', initials: 'SW', accent: 'gold-accent', tags: ['Full-time', 'Senior Level', 'On-site'], salary: '₹65K/mo', salaryN: 65, location: 'Bangalore, IN', desc: 'Lead Android development for the Swiggy Instamart product with end-to-end ownership.', req: ['Kotlin/Java', 'Android Jetpack', 'MVVM architecture', 'Play Store experience'], apply: 'https://careers.swiggy.com' },
    { id: 8, date: '3 May, 2025', company: 'CRED', title: 'UI/UX Designer', initials: 'CR', accent: 'purple-accent', tags: ['Full-time', 'Mid Level', 'Hybrid'], salary: '₹42K/mo', salaryN: 42, location: 'Bangalore, IN', desc: 'Design beautiful financial product experiences. Work in Figma, conduct user research, and ship to millions.', req: ['Figma proficiency', 'UI/UX principles', 'User research', 'Strong portfolio'], apply: 'https://careers.cred.club' },
    { id: 9, date: '1 May, 2025', company: 'Infosys', title: 'Python Developer', initials: 'INF', accent: 'blue-accent', tags: ['Full-time', 'Entry Level', 'On-site'], salary: '₹22K/mo', salaryN: 22, location: 'Pune, IN', desc: "Join Infosys's digital innovation team building automation tools and data pipelines.", req: ['Python proficiency', 'Django/Flask basics', 'SQL knowledge', 'Communication skills'], apply: 'https://infosys.com/careers' },
    { id: 10, date: '28 Apr, 2025', company: 'PhonePe', title: 'DevOps Engineer', initials: 'PP', accent: 'teal-accent', tags: ['Full-time', 'Mid Level', 'Remote'], salary: '₹50K/mo', salaryN: 50, location: 'Bangalore, IN', desc: 'Manage Kubernetes clusters, CI/CD pipelines, and cloud infrastructure for PhonePe.', req: ['Kubernetes & Docker', 'AWS/GCP', 'Terraform', 'Linux expertise'], apply: 'https://phonepe.com/en-in/careers' },
    { id: 11, date: '25 Apr, 2025', company: 'Meesho', title: 'ML Engineer Intern', initials: 'ME', accent: 'green-accent', tags: ['Internship', 'Entry Level', 'Remote'], salary: '₹20K/mo', salaryN: 20, location: 'Bangalore, IN', desc: 'Build recommendation and ranking systems helping 130M+ users discover products.', req: ['Python & TensorFlow', 'ML algorithms', 'Data manipulation', 'Curious mindset'], apply: 'https://meesho.io/jobs' },
    { id: 12, date: '22 Apr, 2025', company: 'Groww', title: 'Backend Developer', initials: 'GR', accent: 'rose-accent', tags: ['Full-time', 'Senior Level', 'Remote'], salary: '₹70K/mo', salaryN: 70, location: 'Bangalore, IN', desc: 'Build real-time trading infrastructure and financial APIs — high-stakes, high-performance systems.', req: ['Go or Java', 'Distributed systems', 'High-performance databases', 'Financial domain knowledge'], apply: 'https://groww.in/p/careers' },
];

export const posts = [
    { author: 'Priya S.', role: 'Placed at Google!', av: 'PS', col: '#4ade80', tag: 'Interview Experience', txt: "Just cleared the Google SDE-1 interview! 4 rounds total — 2 DSA, 1 system design, 1 behavioral. Key tips: practice LeetCode medium for 2 months, focus on trees and graphs.", likes: 142, comments: 38 },
    { author: 'Arjun M.', role: 'Airbnb Bangalore', av: 'AM', col: '#f97316', tag: 'Referral', txt: "I have 2 open referral slots at Airbnb for SDE-1 and Data Analyst roles — both remote-friendly. If you have 0-2 years experience and a solid portfolio, DM me your resume.", likes: 89, comments: 124 },
    { author: 'Sneha K.', role: '4th Year, VJTI Mumbai', av: 'SK', col: '#a855f7', tag: 'Tips & Advice', txt: "My ATS score went from 42% to 87% after using CareerNest's resume checker! It suggested I add \"CI/CD pipelines\" and \"RESTful APIs\" to my header. Got 3 interview calls the very next week.", likes: 203, comments: 45 },
    { author: 'Ravi T.', role: 'SDE-2 at Flipkart', av: 'RT', col: '#3b82f6', tag: 'Tips & Advice', txt: "Stop applying to 100 jobs blindly. Apply to 20 well-targeted roles with customized resumes. I wasted 3 months spray-and-praying. When I switched strategy my callback rate went from 2% to 35%.", likes: 317, comments: 67 },
];

export const faqs = [
    { q: 'Is CareerNest free for students?', a: 'Yes! CareerNest is completely free for students and freshers. Our mission is to democratize access to job opportunities. Core job discovery and the ATS checker are always free.' },
    { q: 'How does the ATS Resume Checker work?', a: 'Our ATS checker uses NLP to extract keywords from your resume and compare them against the job description. It identifies missing skills, suggests improvements, and gives a match score.' },
    { q: 'How do you source job listings?', a: 'We aggregate jobs from LinkedIn, Indeed, Glassdoor, Naukri, and direct company career pages. Our system refreshes every 6 hours.' },
    { q: 'Can I get notifications for new jobs?', a: 'Absolutely! Enable Job Alerts in the Hiring section. Choose daily email digests, WhatsApp notifications, or both.' },
    { q: 'How do I get a referral?', a: 'Visit the Community section to find people working at your target companies, or check the Hiring section for our Alumni Referral Network.' },
    { q: "What makes CareerNest different from Naukri or LinkedIn?", a: 'We are built specifically for students and freshers. Every feature — ATS checker, campus drives, peer community — is designed for someone starting their career.' },
];

export const ovMatches = [
    { initials: 'GG', company: 'Google', title: 'Frontend Engineer', tags: ['Remote', 'Entry Level'], match: 95, salary: '₹45K/mo', col: '#4ecdc4', id: 1 },
    { initials: 'RZP', company: 'Razorpay', title: 'Full Stack Developer', tags: ['Remote', 'Mid Level'], match: 91, salary: '₹55K/mo', col: '#e8d48b', id: 6 },
    { initials: 'MS', company: 'Microsoft', title: 'Cloud Solutions Intern', tags: ['Hybrid', 'Internship'], match: 88, salary: '₹30K/mo', col: '#a29bfe', id: 5 },
    { initials: 'PP', company: 'PhonePe', title: 'DevOps Engineer', tags: ['Remote', 'Mid Level'], match: 83, salary: '₹50K/mo', col: '#4ecdc4', id: 10 },
];

export const ovTracker = [
    { co: 'Amazon', role: 'SDE-1 Backend', status: 'Interview', cls: 'interview', dot: '#4ecdc4' },
    { co: 'Zomato', role: 'React Developer', status: 'Applied', cls: 'applied', dot: '#e8d48b' },
    { co: 'Flipkart', role: 'Data Science Intern', status: 'Under Review', cls: 'review', dot: '#a29bfe' },
    { co: 'Infosys', role: 'Python Developer', status: 'Applied', cls: 'applied', dot: '#e8d48b' },
    { co: 'CRED', role: 'UI/UX Designer', status: 'Rejected', cls: 'rejected', dot: '#f87171' },
];

export const ovATS = [
    { name: 'Resume_v3.pdf', score: 87 },
    { name: 'Resume_frontend.pdf', score: 74 },
    { name: 'Resume_general.pdf', score: 62 },
];

export const ovDeadlines = [
    { type: 'urgent', icon: '🔴', co: 'Google', role: 'Frontend Engineer', time: '⚡ Closes in 18 hours!' },
    { type: 'soon', icon: '🟡', co: 'Razorpay', role: 'Full Stack Developer', time: '⏰ Deadline: Tomorrow 5 PM' },
    { type: 'interview', icon: '🟢', co: 'Amazon', role: 'SDE-1 Backend', time: '📅 Interview: Mar 1, 10:00 AM' },
    { type: 'soon', icon: '🟡', co: 'Microsoft', role: 'Cloud Solutions Intern', time: '⏰ Closes in 3 days' },
];
