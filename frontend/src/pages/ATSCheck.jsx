import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/Toast';
import API_BASE_URL from '../api';
import * as pdfjsLib from 'pdfjs-dist';

import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// ─── Common tech keywords / skills dictionary ──────────────────
const SKILL_DICTIONARY = new Set([
    'javascript', 'typescript', 'python', 'java', 'c', 'c++', 'c#', 'go', 'golang', 'rust', 'ruby',
    'php', 'swift', 'kotlin', 'scala', 'r', 'matlab', 'perl', 'dart', 'lua', 'haskell', 'elixir',
    'objective-c', 'assembly', 'fortran', 'cobol', 'groovy', 'clojure', 'erlang',
    'react', 'reactjs', 'react.js', 'angular', 'angularjs', 'vue', 'vuejs', 'vue.js', 'svelte',
    'next.js', 'nextjs', 'nuxt', 'nuxtjs', 'gatsby', 'html', 'html5', 'css', 'css3', 'sass',
    'scss', 'less', 'tailwind', 'tailwindcss', 'bootstrap', 'material-ui', 'mui', 'chakra',
    'styled-components', 'jquery', 'webpack', 'vite', 'parcel', 'rollup', 'babel',
    'redux', 'mobx', 'zustand', 'recoil', 'context api', 'pwa', 'spa',
    'node', 'nodejs', 'node.js', 'express', 'expressjs', 'fastify', 'nest', 'nestjs',
    'django', 'flask', 'fastapi', 'spring', 'spring boot', 'springboot', 'asp.net',
    'rails', 'ruby on rails', 'laravel', 'symfony', 'gin', 'fiber', 'actix',
    'sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'mongo', 'redis', 'elasticsearch',
    'dynamodb', 'cassandra', 'couchdb', 'firebase', 'firestore', 'supabase', 'sqlite',
    'oracle', 'mssql', 'mariadb', 'neo4j', 'graphql', 'prisma', 'sequelize', 'mongoose',
    'typeorm', 'knex',
    'aws', 'amazon web services', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes',
    'k8s', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'cicd', 'github actions',
    'gitlab ci', 'circleci', 'travis ci', 'nginx', 'apache', 'linux', 'unix', 'bash',
    'shell', 'powershell', 'cloudflare', 'vercel', 'netlify', 'heroku', 'digitalocean',
    'ec2', 's3', 'lambda', 'ecs', 'eks', 'fargate', 'cloudformation',
    'git', 'github', 'gitlab', 'bitbucket', 'svn', 'jira', 'confluence', 'trello',
    'agile', 'scrum', 'kanban', 'tdd', 'bdd', 'devops', 'microservices', 'monolith',
    'rest', 'restful', 'rest api', 'rest apis', 'graphql', 'grpc', 'soap', 'websocket',
    'websockets', 'oauth', 'jwt', 'saml', 'sso', 'rbac',
    'jest', 'mocha', 'chai', 'cypress', 'selenium', 'playwright', 'puppeteer',
    'pytest', 'junit', 'unittest', 'rspec', 'testing', 'unit testing', 'integration testing',
    'e2e testing', 'end-to-end testing', 'test-driven', 'qa',
    'machine learning', 'deep learning', 'ai', 'artificial intelligence', 'nlp',
    'natural language processing', 'computer vision', 'tensorflow', 'pytorch', 'keras',
    'scikit-learn', 'sklearn', 'pandas', 'numpy', 'scipy', 'opencv', 'data science',
    'data analysis', 'data engineering', 'etl', 'hadoop', 'spark', 'kafka',
    'airflow', 'tableau', 'power bi', 'looker', 'data visualization', 'statistics',
    'big data', 'data pipeline', 'data warehouse',
    'android', 'ios', 'react native', 'flutter', 'xamarin', 'ionic', 'cordova',
    'mobile development', 'swiftui', 'jetpack compose',
    'figma', 'sketch', 'adobe xd', 'photoshop', 'illustrator', 'ui/ux', 'ux',
    'ui', 'wireframing', 'prototyping', 'responsive design', 'accessibility', 'a11y',
    'leadership', 'communication', 'teamwork', 'problem solving', 'problem-solving',
    'analytical', 'project management', 'mentoring', 'presentation',
    'cybersecurity', 'penetration testing', 'owasp', 'encryption', 'security',
    'vulnerability assessment', 'firewall', 'ids', 'ips', 'siem',
    'api', 'apis', 'sdk', 'cli', 'erp', 'crm', 'saas', 'paas', 'iaas',
    'blockchain', 'web3', 'solidity', 'smart contracts', 'nft',
    'iot', 'embedded', 'rtos', 'firmware',
    'system design', 'distributed systems', 'load balancing', 'caching',
    'cdn', 'dns', 'tcp/ip', 'http', 'https', 'ssl', 'tls',
    'object-oriented', 'oop', 'functional programming', 'design patterns',
    'solid', 'dry', 'clean code', 'clean architecture', 'mvc', 'mvvm',
    'data structures', 'algorithms', 'dsa',
]);

// ─── Extract text from PDF (Worker version) ───────────────────
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        fullText += strings.join(' ') + '\n';
    }
    return fullText.trim();
}

function extractKeywordsFromJD(jdText) {
    const text = jdText.toLowerCase();
    const found = [];
    const multiWordSkills = [...SKILL_DICTIONARY].filter(s => s.includes(' ') || s.includes('/') || s.includes('-') || s.includes('.'));
    for (const skill of multiWordSkills) {
        if (text.includes(skill)) found.push(skill);
    }
    const words = text.replace(/[^a-z0-9#+\-./]/g, ' ').split(/\s+/).filter(Boolean);
    for (const word of words) {
        if (SKILL_DICTIONARY.has(word) && !found.some(f => f.includes(word))) {
            found.push(word);
        }
    }
    return [...new Set(found)];
}

function isKeywordInResume(keyword, resumeText) {
    const lower = resumeText.toLowerCase();
    if (lower.includes(keyword)) return true;
    const aliases = {
        'react': ['reactjs', 'react.js'],
        'node': ['nodejs', 'node.js'],
        'typescript': ['ts'],
        'javascript': ['js'],
        'aws': ['amazon web services'],
        'gcp': ['google cloud'],
    };
    return (aliases[keyword] || []).some(alt => lower.includes(alt));
}

function displayName(skill) {
    const special = { 'javascript': 'JavaScript', 'typescript': 'TypeScript', 'react': 'React', 'nodejs': 'Node.js', 'aws': 'AWS' };
    return special[skill] || skill.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// ─── Component ──────────────────────────────────────────────────
export default function ATSCheck() {
    const toast = useToast();
    const fileInputRef = useRef(null);

    const [fileName, setFileName] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [jd, setJd] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState('');

    const backendUrl = API_BASE_URL;


    // Results
    const [score, setScore] = useState(null);
    const [scoreData, setScoreData] = useState({});
    const [matchedKeywords, setMatchedKeywords] = useState([]);
    const [missingKeywords, setMissingKeywords] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [totalKeywords, setTotalKeywords] = useState(0);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);
            setFileName(file.name);
            toast('Resume uploaded! ✓');
        } else {
            toast('⚠️ Please upload a PDF');
        }
    };

    const runATS = async () => {
        if (!resumeFile || !jd.trim()) {
            toast('⚠️ Resume and JD are required');
            return;
        }

        setIsAnalyzing(true);
        setScore(null);

        try {
            // STEP 1: Parse Locally (Using the provided imports)
            setProgress('📄 Parsing PDF locally...');
            const resumeText = await extractTextFromPDF(resumeFile);

            if (!resumeText || resumeText.length < 50) {
                throw new Error('Could not extract text from PDF. Use a text-based PDF.');
            }

            // STEP 2: Calculate Matches
            setProgress('🔍 Analyzing keywords...');
            const jdKeywords = extractKeywordsFromJD(jd);
            if (jdKeywords.length === 0) throw new Error('No skills found in JD');

            const matched = [];
            const missing = [];
            jdKeywords.forEach(kw => {
                if (isKeywordInResume(kw, resumeText)) matched.push(kw);
                else missing.push(kw);
            });

            const rawScore = Math.round((matched.length / jdKeywords.length) * 100);

            // STEP 3: Sync Result to Backend
            setProgress('💾 Saving to dashboard...');
            const token = localStorage.getItem('token');
            // We use a dedicated "save-result" endpoint instead of file processing
            await fetch(`${backendUrl}/api/ats/save-result`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    resumeName: resumeFile.name,
                    score: rawScore
                })
            });

            // UI Decoration
            let title, desc, color;
            if (rawScore >= 85) { title = '🎯 Excellent!'; desc = 'Highly optimized match.'; color = '#4ade80'; }
            else if (rawScore >= 65) { title = '👍 Good!'; desc = 'Strong candidate.'; color = '#e8d48b'; }
            else { title = '❌ Low Score'; desc = 'Needs more keywords.'; color = '#f87171'; }

            const tips = [{ type: 'TICK', text: `Matched ${matched.length}/${jdKeywords.length} skills.` }];
            missing.slice(0, 3).forEach(kw => tips.push({ type: 'WARN', text: `Add "${displayName(kw)}" to your resume.` }));

            setScore(rawScore);
            setScoreData({ title, desc, color });
            setMatchedKeywords(matched);
            setMissingKeywords(missing);
            setSuggestions(tips);
            setTotalKeywords(jdKeywords.length);
            toast('✅ Analysis Complete & Saved!');

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
                <p className="page-sub">Upload your resume and paste a job description to get an instant match score.</p>

                <div style={{ maxWidth: 800, width: '100%', textAlign: 'left', margin: '0 auto' }}>
                    <motion.label className="ats-upload glass-card" htmlFor="resumeUpload" style={{ padding: '40px', borderRadius: '24px', textAlign: 'center', cursor: 'pointer', display: 'block', marginBottom: '24px' }}>
                        <h3>{fileName ? `✓ ${fileName}` : 'Upload PDF Resume'}</h3>
                        <input type="file" id="resumeUpload" accept=".pdf" ref={fileInputRef} onChange={handleFile} style={{ display: 'none' }} />
                    </motion.label>

                    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>Job Description</p>
                    <textarea className="ats-jd glass-card" value={jd} onChange={(e) => setJd(e.target.value)} style={{ width: '100%', minHeight: '150px', padding: '20px', borderRadius: '16px', color: 'var(--white)', resize: 'vertical' }} />

                    <button className="btn-gold" onClick={runATS} disabled={isAnalyzing} style={{ marginTop: '16px', padding: '16px 32px' }}>
                        {isAnalyzing ? progress : '🔍 Analyze Resume'}
                    </button>

                    <AnimatePresence>
                        {score !== null && (
                            <motion.div className="ats-result show glass-panel" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '40px', padding: '32px', borderRadius: '24px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '32px', marginBottom: '32px' }}>
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
                                <div className="ats-tips">
                                    {suggestions.map((tip, i) => <div className="ats-tip" key={i}><div className="tip-text"><p>{tip.text}</p></div></div>)}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
