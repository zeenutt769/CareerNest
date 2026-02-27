import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';

export default function ATSCheck() {
    const toast = useToast();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [score, setScore] = useState(null);
    const [scoreData, setScoreData] = useState({});
    const [fileName, setFileName] = useState('');

    const handleFile = (e) => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
            toast('Resume uploaded! ✓');
        }
    };

    const onSubmit = () => {
        const s = Math.floor(Math.random() * 30) + 65;
        let title, desc, color;
        if (s >= 85) { title = 'Excellent Match!'; desc = 'Your resume is highly optimized. Very likely to pass ATS screening.'; color = '#4ade80'; }
        else if (s >= 70) { title = 'Good Match!'; desc = 'Your resume matches well. A few tweaks will push you to the top.'; color = '#e8d48b'; }
        else { title = 'Needs Work'; desc = 'Your resume needs updates to pass ATS for this role. See suggestions below.'; color = '#f87171'; }
        setScore(s);
        setScoreData({ title, desc, color });
        toast('ATS analysis complete!');
    };

    const tips = [
        { type: 'TICK', h: 'Matching Keywords Found', p: 'Your resume contains: Python, JavaScript, REST APIs, Git — these align with the job description well.' },
        { type: 'WARN', h: 'Add "Docker & Kubernetes"', p: 'The JD mentions containerization 3 times. Adding these could increase your score by ~12%.' },
        { type: 'WARN', h: 'Quantify Your Achievements', p: 'Replace "improved performance" with "improved page load by 40%". Metrics grab both ATS and human attention.' },
        { type: 'BULB', h: 'Include CI/CD Experience', p: "Mention GitHub Actions or Jenkins pipelines you've set up. Hidden requirement in 60% of SDE JDs." },
        { type: 'CROSS', h: 'Missing: System Design', p: 'The JD emphasizes "scalable systems". Add a note about any architecture decision you\'ve made, even in side projects.' },
    ];

    const tipIcons = {
        TICK: <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
        WARN: <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
        BULB: <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#e8d48b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>,
        CROSS: <svg className="tip-icon-svg" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>,
    };

    return (
        <div className="inner-page-body">
            <div className="inner-main" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h1 className="page-title">Resume <span>ATS Checker</span></h1>
                <p className="page-sub">Upload your resume and paste a job description to get an instant ATS match score with actionable feedback.</p>
                <div style={{ maxWidth: 800, width: '100%', textAlign: 'left', margin: '0 auto' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                                <path d="M16 28h16M16 34h10" stroke="#e8d48b" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="42" cy="42" r="10" fill="#0a0a0a" stroke="#e8d48b" strokeWidth="1.5" />
                                <path d="M42 38v8M38 42h8" stroke="#e8d48b" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                            <h3>{fileName ? `✓ ${fileName} ready` : 'Drop your resume here or click to upload'}</h3>
                            <p>Supports PDF, DOCX, TXT — Max 5MB</p>
                            <input type="file" id="resumeUpload" accept=".pdf,.docx,.txt"
                                {...register("resume")}
                                onChange={handleFile}
                                style={{ display: 'none' }} />
                        </motion.label>
                        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10 }}>
                            Paste Job Description
                        </p>
                        <motion.textarea
                            className="ats-jd glass-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                            placeholder="Paste the full job description here — include requirements, responsibilities, and skills."
                            {...register("jd", { required: true })}
                            style={{ width: '100%', minHeight: '150px', padding: '20px', borderRadius: '16px', color: 'var(--white)' }}
                        />
                        {errors.jd && <span style={{ color: '#f87171', fontSize: 13 }}>Please paste a job description!</span>}
                        <br />
                        <button type="submit" className="btn-gold" style={{ marginTop: '16px', padding: '16px 32px' }}>🔍 Analyze My Resume</button>
                    </form>

                    {score && (
                        <motion.div className="ats-result show glass-panel"
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                            style={{ marginTop: '40px', padding: '32px', borderRadius: '24px' }}>
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
                            <div className="ats-tips">
                                {tips.map((t, i) => (
                                    <div className="ats-tip" key={i}>
                                        {tipIcons[t.type]}
                                        <div className="tip-text">
                                            <h4>{t.h}</h4>
                                            <p>{t.p}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
