import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ovMatches, ovTracker, ovATS, ovDeadlines, jobs } from '../data/jobs';
import { useToast } from '../components/Toast';
import JobModal from '../components/JobModal';

const chartData = [
    { name: 'Mon', applications: 2 },
    { name: 'Tue', applications: 5 },
    { name: 'Wed', applications: 3 },
    { name: 'Thu', applications: 8 },
    { name: 'Fri', applications: 4 },
    { name: 'Sat', applications: 1 },
    { name: 'Sun', applications: 6 },
];

export default function OverviewDashboard() {
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedJob, setSelectedJob] = useState(null);

    const openJob = (id) => {
        const job = jobs.find(j => j.id === id);
        if (job) setSelectedJob(job);
    };

    const kanbanCols = [
        { label: 'Applied', dot: '#e8d48b', items: ovTracker.filter(x => x.cls === 'applied') },
        { label: 'Interviewing', dot: '#4ecdc4', items: ovTracker.filter(x => x.cls === 'interview' || x.cls === 'review') },
        { label: 'Offered / Rejected', dot: '#a29bfe', items: ovTracker.filter(x => x.cls === 'offered' || x.cls === 'rejected') },
    ];

    return (
        <>
            <div className="ov-body">
                {/* LEFT SIDEBAR NAV */}
                <aside className="ov-leftnav">
                    <div className="ov-leftnav-avatar">RS</div>
                    <div className="ov-leftnav-name">Rahul Sharma</div>
                    <div className="ov-leftnav-sub">B.Tech CSE • 2025</div>
                    <div className="ov-nav-divider"></div>
                    <div className="ov-nav-label">Main Menu</div>

                    <button className="ov-nav-item active">
                        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                        Overview <span className="ov-nav-badge">3 New</span>
                    </button>
                    <button className="ov-nav-item" onClick={() => navigate('/jobs')}>
                        <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                        Job Search
                    </button>
                    <button className="ov-nav-item" onClick={() => toast('Applications page coming soon!')}>
                        <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg>
                        My Applications <span className="ov-nav-badge">12</span>
                    </button>
                    <button className="ov-nav-item" onClick={() => navigate('/ats')}>
                        <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                        ATS Checker
                    </button>
                    <div className="ov-nav-divider"></div>
                    <div className="ov-nav-label">Account</div>
                    <button className="ov-nav-item" onClick={() => navigate('/profile')}>
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                        Profile
                    </button>
                    <button className="ov-nav-item" onClick={() => navigate('/faq')}>
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                        FAQ & Help
                    </button>
                    <button className="ov-nav-item" onClick={() => toast('Settings coming soon!')}>
                        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                        Settings
                    </button>
                </aside>

                {/* CENTER */}
                <main className="ov-center">
                    <div className="ov-greeting fade-in">
                        <h1>Good evening, <em>Rahul</em> 👋</h1>
                        <p>Here's your job search snapshot — 3 new matches since yesterday. Two deadlines expiring soon!</p>
                    </div>

                    {/* STATS */}
                    <div className="ov-stats">
                        {[
                            { cls: 'c1', delta: '+3 new', deltaCls: 'delta-up', iconBg: 'rgba(78,205,196,0.1)', iconBorder: 'rgba(78,205,196,0.25)', stroke: '#4ecdc4', icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>, num: '47', numColor: '#4ecdc4', label: 'Total Matches', sub: 'Based on your skills' },
                            { cls: 'c2', delta: '+2 today', deltaCls: 'delta-up', iconBg: 'rgba(232,212,139,0.1)', iconBorder: 'rgba(232,212,139,0.25)', stroke: '#e8d48b', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /></>, num: '12', numColor: 'var(--gold)', label: 'Jobs Applied', sub: 'Last 30 days' },
                            { cls: 'c3', delta: '2 interviews', deltaCls: 'delta-up', iconBg: 'rgba(162,155,254,0.1)', iconBorder: 'rgba(162,155,254,0.25)', stroke: '#a29bfe', icon: <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>, num: '5', numColor: '#a29bfe', label: 'Active Applications', sub: 'Awaiting response' },
                            { cls: 'c4', delta: '↑ 6pts', deltaCls: 'delta-up', iconBg: 'rgba(255,107,157,0.1)', iconBorder: 'rgba(255,107,157,0.25)', stroke: '#ff6b9d', icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>, num: '78%', numColor: '#ff6b9d', label: 'Avg ATS Score', sub: 'Across 3 resumes' },
                        ].map((s, i) => (
                            <motion.div key={i} className={`ov-sc ${s.cls}`}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                                <span className={`ov-sc-delta ${s.deltaCls}`}>{s.delta}</span>
                                <div className="ov-sc-icon" style={{ background: s.iconBg, borderColor: s.iconBorder }}>
                                    <svg viewBox="0 0 24 24" stroke={s.stroke}>{s.icon}</svg>
                                </div>
                                <div className="ov-sc-num" style={{ color: s.numColor }}>{s.num}</div>
                                <div className="ov-sc-label">{s.label}</div>
                                <div className="ov-sc-sub">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* BEST MATCHES */}
                    <div className="ov-sec-head">
                        <div className="ov-sec-title">🔥 Best <em>Matches</em> For You</div>
                        <button className="ov-view-all" onClick={() => navigate('/jobs')}>View All Jobs →</button>
                    </div>
                    <div className="ov-match-list">
                        {ovMatches.map((m, idx) => (
                            <motion.div key={idx} className="ov-mc" onClick={() => openJob(m.id)}
                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.08 }}>
                                <div className="ov-mc-logo" style={{ borderColor: `${m.col}33`, color: m.col }}>{m.initials}</div>
                                <div className="ov-mc-info">
                                    <div className="ov-mc-title">{m.title}</div>
                                    <div className="ov-mc-company">{m.company} &nbsp;•&nbsp; {m.salary}</div>
                                    <div className="ov-mc-tags">{m.tags.map(t => <span key={t} className="ov-mc-tag">{t}</span>)}</div>
                                </div>
                                <div className="ov-mc-right">
                                    <div>
                                        <div className="ov-mc-pct" style={{ color: m.col }}>{m.match}%</div>
                                        <div className="ov-mc-pct-lbl">Match</div>
                                    </div>
                                    <button className="ov-mc-apply" onClick={(e) => { e.stopPropagation(); toast(`Applied to ${m.company}! ✓`); }}>Apply</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* KANBAN TRACKER */}
                    <div className="ov-sec-head">
                        <div className="ov-sec-title">📋 Application <em>Tracker</em></div>
                        <button className="ov-view-all" onClick={() => toast('Full tracker coming soon!')}>Manage →</button>
                    </div>
                    <div className="ov-kanban">
                        {kanbanCols.map((col, ci) => (
                            <div key={ci} className="ov-kancol">
                                <div className="ov-kancol-head">
                                    <div className="ov-kancol-dot" style={{ background: col.dot, boxShadow: `0 0 5px ${col.dot}88` }}></div>
                                    <div className="ov-kancol-title">{col.label}</div>
                                    <div className="ov-kancol-count">{col.items.length}</div>
                                </div>
                                {col.items.length > 0 ? col.items.map((a, ai) => (
                                    <div key={ai} className={`ov-kan-card ${a.cls}`}>
                                        <div className="ov-kan-co">{a.co}</div>
                                        <div className="ov-kan-role">{a.role}</div>
                                    </div>
                                )) : (
                                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', textAlign: 'center', padding: '12px 0' }}>Empty</div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* RIGHT PANEL */}
                <aside className="ov-rightnav">
                    {/* Deadlines */}
                    <div className="ov-panel-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                            Deadlines & Reminders
                        </div>
                        {ovDeadlines.map((d, i) => (
                            <div key={i} className={`ov-deadline ${d.type}`}>
                                <div className="ov-deadline-icon">{d.icon}</div>
                                <div>
                                    <div className="ov-deadline-co">{d.co}</div>
                                    <div className="ov-deadline-role">{d.role}</div>
                                    <div className="ov-deadline-time">{d.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Skill Gap */}
                    <div className="ov-panel-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>
                            Skill Gap Analysis
                        </div>
                        <div className="ov-skill-gap">
                            <div className="ov-skill-gap-head">
                                <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                Missing for SDE roles in Bangalore
                            </div>
                            <div className="ov-skill-gap-text">You're missing these skills in <strong>60% of SDE-1 roles</strong> you're targeting:</div>
                            <div className="ov-skill-gap-tags">
                                <span className="ov-skill-gap-tag">Docker</span>
                                <span className="ov-skill-gap-tag">Kubernetes</span>
                                <span className="ov-skill-gap-tag">CI/CD</span>
                            </div>
                            <button className="ov-learn-btn" onClick={() => window.open('https://www.youtube.com/results?search_query=docker+kubernetes+tutorial', '_blank')}>🎓 Learn Now on YouTube →</button>
                        </div>
                        <div className="ov-skill-gap" style={{ marginTop: 8 }}>
                            <div className="ov-skill-gap-head">
                                <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                Missing for Data roles
                            </div>
                            <div className="ov-skill-gap-text">Add these to unlock <strong>40% more</strong> Data Science matches:</div>
                            <div className="ov-skill-gap-tags">
                                <span className="ov-skill-gap-tag">Spark</span>
                                <span className="ov-skill-gap-tag">Tableau</span>
                            </div>
                            <button className="ov-learn-btn" onClick={() => window.open('https://www.coursera.org/search?query=apache+spark', '_blank')}>📚 Learn on Coursera →</button>
                        </div>
                    </div>

                    {/* ATS Scores */}
                    <div className="ov-panel-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            Resume ATS Scores
                        </div>
                        {ovATS.map((a, i) => {
                            const col = a.score >= 80 ? '#4ecdc4' : a.score >= 65 ? '#e8d48b' : '#f87171';
                            return (
                                <div key={i} className="ov-ats-item">
                                    <div className="ov-ats-name">{a.name}</div>
                                    <div className="ov-ats-bar-bg"><div className="ov-ats-bar-fill" style={{ width: `${a.score}%`, background: col }}></div></div>
                                    <div className="ov-ats-val" style={{ color: col }}>{a.score}%</div>
                                </div>
                            );
                        })}
                        <button className="ov-ats-check-btn" onClick={() => navigate('/ats')}>+ Check New Resume →</button>
                    </div>

                    {/* Quick Actions */}
                    <div className="ov-panel-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" /></svg>
                            Quick Actions
                        </div>
                        <div className="ov-quick">
                            <div className="ov-qa" onClick={() => navigate('/ats')}><div className="ov-qa-icon">📄</div><div className="ov-qa-label">Update Resume</div></div>
                            <div className="ov-qa" onClick={() => toast('Profile visibility toggled!')}><div className="ov-qa-icon">👁️</div><div className="ov-qa-label">Toggle Visibility</div></div>
                            <div className="ov-qa" onClick={() => navigate('/jobs')}><div className="ov-qa-icon">🔍</div><div className="ov-qa-label">Browse Jobs</div></div>
                            <div className="ov-qa" onClick={() => toast('Mock interview session booked! ✓')}><div className="ov-qa-icon">🎤</div><div className="ov-qa-label">Mock Interview</div></div>
                        </div>
                        <div className="ov-toggle-row">
                            <span className="ov-toggle-label">📧 Email Job Alerts</span>
                            <label className="ov-toggle"><input type="checkbox" defaultChecked /><span className="ov-toggle-slider"></span></label>
                        </div>
                        <div className="ov-toggle-row">
                            <span className="ov-toggle-label">💬 WhatsApp Alerts</span>
                            <label className="ov-toggle"><input type="checkbox" /><span className="ov-toggle-slider"></span></label>
                        </div>
                        <div className="ov-toggle-row">
                            <span className="ov-toggle-label">🔔 Interview Reminders</span>
                            <label className="ov-toggle"><input type="checkbox" defaultChecked /><span className="ov-toggle-slider"></span></label>
                        </div>
                    </div>
                </aside>
            </div>

            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </>
    );
}
