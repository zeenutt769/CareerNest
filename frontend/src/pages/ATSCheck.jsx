import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/Toast';

// ─── Tip icon map ───────────────────────────────────────────────
const tipIcons = {
    TICK: (
        <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    ),
    WARN: (
        <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
    ),
    BULB: (
        <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#e8d48b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>
    ),
    CROSS: (
        <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
    ),
    STAR: (
        <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    ),
};

function displayName(skill) {
    const special = {
        'javascript': 'JavaScript', 'typescript': 'TypeScript', 'nodejs': 'Node.js',
        'node.js': 'Node.js', 'node': 'Node.js', 'reactjs': 'React', 'react.js': 'React',
        'react': 'React', 'angular': 'Angular', 'vuejs': 'Vue.js', 'vue.js': 'Vue.js',
        'vue': 'Vue', 'nextjs': 'Next.js', 'next.js': 'Next.js', 'nuxtjs': 'Nuxt',
        'mongodb': 'MongoDB', 'mongo': 'MongoDB', 'postgresql': 'PostgreSQL',
        'postgres': 'PostgreSQL', 'mysql': 'MySQL', 'redis': 'Redis',
        'docker': 'Docker', 'kubernetes': 'Kubernetes', 'k8s': 'Kubernetes',
        'aws': 'AWS', 'gcp': 'GCP', 'azure': 'Azure', 'ci/cd': 'CI/CD',
        'graphql': 'GraphQL', 'rest api': 'REST API', 'rest apis': 'REST APIs',
        'html': 'HTML', 'html5': 'HTML5', 'css': 'CSS', 'css3': 'CSS3',
        'sql': 'SQL', 'nosql': 'NoSQL', 'git': 'Git', 'github': 'GitHub',
        'gitlab': 'GitLab', 'jwt': 'JWT', 'oauth': 'OAuth', 'oop': 'OOP',
        'dsa': 'DSA', 'api': 'API', 'apis': 'APIs', 'sdk': 'SDK',
        'tensorflow': 'TensorFlow', 'pytorch': 'PyTorch', 'firebase': 'Firebase',
        'flutter': 'Flutter', 'django': 'Django', 'flask': 'Flask', 'fastapi': 'FastAPI',
        'express': 'Express', 'expressjs': 'Express', 'tailwindcss': 'Tailwind CSS',
        'tailwind': 'Tailwind CSS', 'sass': 'Sass', 'scss': 'SCSS',
        'python': 'Python', 'java': 'Java', 'c++': 'C++', 'c#': 'C#',
        'go': 'Go', 'golang': 'Go', 'rust': 'Rust', 'ruby': 'Ruby',
        'php': 'PHP', 'swift': 'Swift', 'kotlin': 'Kotlin', 'dart': 'Dart',
        'figma': 'Figma', 'jira': 'JIRA', 'agile': 'Agile', 'scrum': 'Scrum',
        'linux': 'Linux', 'bash': 'Bash', 'nginx': 'Nginx',
        'jest': 'Jest', 'cypress': 'Cypress', 'selenium': 'Selenium',
        'webpack': 'Webpack', 'vite': 'Vite', 'babel': 'Babel',
        'redux': 'Redux', 'prisma': 'Prisma', 'mongoose': 'Mongoose',
        'elasticsearch': 'Elasticsearch', 'kafka': 'Kafka', 'spark': 'Spark',
        'hadoop': 'Hadoop', 'terraform': 'Terraform', 'ansible': 'Ansible',
        'jenkins': 'Jenkins', 'heroku': 'Heroku', 'vercel': 'Vercel',
    };
    return special[skill] || skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ATSCheck() {
    const toast = useToast();
    const fileInputRef = useRef(null);

    const [fileName, setFileName] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [jd, setJd] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState('');

    const backendUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

    // Results
    const [score, setScore] = useState(null);
    const [scoreData, setScoreData] = useState({});
    const [matchedKeywords, setMatchedKeywords] = useState([]);
    const [missingKeywords, setMissingKeywords] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [totalKeywords, setTotalKeywords] = useState(0);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                toast('⚠️ Please upload a PDF file');
                return;
            }
            setResumeFile(file);
            setFileName(file.name);
            toast('Resume uploaded! ✓');
        }
    };

    const runATS = async () => {
        if (!resumeFile) { toast('⚠️ Upload your resume first'); return; }
        if (!jd.trim()) { toast('⚠️ Paste a job description'); return; }

        setIsAnalyzing(true);
        setScore(null);
        setProgress('🚀 Sending to server...');

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('jd', jd);

            const res = await fetch(`${backendUrl}/api/ats/analyze`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || 'Analysis failed');
            }

            const data = await res.json();
            const rawScore = data.score;

            let title, desc, color;
            if (rawScore >= 85) {
                title = '🎯 Excellent Match!';
                desc = 'Your resume is highly optimized for this role. Very likely to pass ATS screening.';
                color = '#4ade80';
            } else if (rawScore >= 65) {
                title = '👍 Good Match!';
                desc = 'Your resume matches well. Add a few missing skills to push it to the top.';
                color = '#e8d48b';
            } else if (rawScore >= 40) {
                title = '⚠️ Needs Improvement';
                desc = 'Your resume is missing several key skills. See suggestions below to improve.';
                color = '#f59e0b';
            } else {
                title = '❌ Low Match';
                desc = 'Your resume needs significant updates to pass ATS for this role.';
                color = '#f87171';
            }

            // Generate suggestions from missing keywords
            const tips = [];
            tips.push({ type: 'TICK', text: `Your resume matches ${data.matched.length} out of ${data.total} key skills.` });

            data.missing.slice(0, 5).forEach(kw => {
                tips.push({ type: 'WARN', text: `Consider adding "${displayName(kw)}" to your resume to increase your visibility.` });
            });

            if (data.missing.length > 5) {
                tips.push({ type: 'BULB', text: `...and ${data.missing.length - 5} more skills are missing. focus on the high impact ones.` });
            }

            tips.push({ type: 'STAR', text: 'Pro tip: Use exact wording from the JD for better ATS matching.' });

            setScore(rawScore);
            setScoreData({ title, desc, color });
            setMatchedKeywords(data.matched);
            setMissingKeywords(data.missing);
            setSuggestions(tips);
            setTotalKeywords(data.total);
            toast('✅ ATS analysis complete & saved!');

        } catch (err) {
            console.error('ATS Error:', err);
            toast(`❌ Error: ${err.message}`);
        } finally {
            setIsAnalyzing(false);
            setProgress('');
        }
    };

    return (
        <div className="inner-page-body">
            <div className="inner-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h1 className="page-title">Resume <span>ATS Checker</span></h1>
                <p className="page-sub">Upload your resume and paste a job description to get an instant ATS match score powered by our backend engine.</p>

                <div style={{ maxWidth: 800, width: '100%', textAlign: 'left', margin: '0 auto' }}>
                    {/* ── Upload Area ── */}
                    <motion.label
                        className="ats-upload glass-card"
                        htmlFor="resumeUpload"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                        style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', cursor: 'pointer', display: 'block', marginBottom: '24px' }}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(30,30,30,0.7)' }}
                    >
                        <svg className="ats-upload-icon" viewBox="0 0 56 56" fill="none" style={{ width: 56, height: 56, marginBottom: 16, opacity: 0.7, margin: '0 auto' }}>
                            <rect x="8" y="4" width="32" height="42" rx="4" stroke="#e8d48b" strokeWidth="2" />
                            <path d="M28 4v12h12" stroke="#e8d48b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="42" cy="42" r="10" fill="#0a0a0a" stroke="#e8d48b" strokeWidth="1.5" />
                        </svg>
                        <h3>{fileName ? `✓ ${fileName} ready` : 'Drop your resume here or click to upload'}</h3>
                        <p>Supports PDF — Max 5MB</p>
                        <input type="file" id="resumeUpload" accept=".pdf" ref={fileInputRef} onChange={handleFile} style={{ display: 'none' }} />
                    </motion.label>

                    {/* ── Job Description ── */}
                    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Job Description</p>
                    <motion.textarea
                        className="ats-jd glass-card"
                        placeholder="Paste the full job description here..."
                        value={jd}
                        onChange={(e) => setJd(e.target.value)}
                        style={{ width: '100%', minHeight: '150px', padding: '20px', borderRadius: '16px', color: 'var(--white)', resize: 'vertical' }}
                    />

                    <button className="btn-gold" onClick={runATS} disabled={isAnalyzing} style={{ marginTop: '16px', padding: '16px 32px' }}>
                        {isAnalyzing ? progress || 'Analyzing...' : '🔍 Analyze My Resume'}
                    </button>

                    {/* ── Results ── */}
                    <AnimatePresence>
                        {score !== null && (
                            <motion.div className="ats-result show glass-panel"
                                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                                style={{ marginTop: '40px', padding: '32px', borderRadius: '24px' }}
                            >
                                <div className="ats-score-row" style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
                                    <div className="score-circle" style={{ background: `conic-gradient(${scoreData.color} 0deg ${score * 3.6}deg, rgba(255,255,255,0.07) ${score * 3.6}deg)` }}>
                                        <div className="score-inner">
                                            <div className="score-num">{score}</div>
                                            <div className="score-pct">/ 100</div>
                                        </div>
                                    </div>
                                    <div className="score-info">
                                        <h3>{scoreData.title}</h3>
                                        <p>{scoreData.desc}</p>
                                    </div>
                                </div>

                                {/* Skills Grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                                    <div>
                                        <h4 style={{ color: '#4ade80', fontSize: 13, marginBottom: 10 }}>✅ Matched</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                            {matchedKeywords.map(kw => <span key={kw} style={{ padding: '2px 10px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, fontSize: 11, color: '#4ade80' }}>{displayName(kw)}</span>)}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#f87171', fontSize: 13, marginBottom: 10 }}>❌ Missing</h4>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                                            {missingKeywords.map(kw => <span key={kw} style={{ padding: '2px 10px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 10, fontSize: 11, color: '#f87171' }}>{displayName(kw)}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="ats-tips">
                                    {suggestions.map((tip, i) => (
                                        <div className="ats-tip" key={i}>
                                            {tipIcons[tip.type] || tipIcons.BULB}
                                            <div className="tip-text"><p>{tip.text}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
