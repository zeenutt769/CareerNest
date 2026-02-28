import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../api';

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ovTracker, ovDeadlines } from '../data/jobs';
import { useToast } from '../components/Toast';
import JobModal from '../components/JobModal';
import CountUp from '../components/CountUp';


export default function OverviewDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const [selectedJob, setSelectedJob] = useState(null);
    const [jobsList, setJobsList] = useState([]);
    const [stats, setStats] = useState({ bookmarks: 0, applied: 0, active: 0, avgATS: 0 });
    const [atsHistory, setAtsHistory] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [skillGap, setSkillGap] = useState([]);
    const [profilePicture, setProfilePicture] = useState(user?.profile_picture || '');
    const [isComplete, setIsComplete] = useState(true);
    const [isLoadingStats, setIsLoadingStats] = useState(true);

    const backendUrl = API_BASE_URL;


    React.useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${backendUrl}/api/bookmarks`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setJobsList(data);
                }
            } catch (err) {
                console.error('Failed to fetch bookmarked jobs:', err);
            }
        };

        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${backendUrl}/api/dashboard/stats`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setStats(data.stats);
                    setAtsHistory(data.atsHistory);
                    setChartData(data.chartData);
                    setSkillGap(data.skillGap || []);
                    setIsComplete(data.isComplete);
                    setProfilePicture(data.profile_picture || user?.profile_picture || '');
                }
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setIsLoadingStats(false);
            }
        };

        fetchBookmarks();
        fetchStats();
    }, [backendUrl]);

    // Keep profile picture sync'd with auth context
    useEffect(() => {
        if (user?.profile_picture && !profilePicture) {
            setProfilePicture(user.profile_picture);
        }
    }, [user, profilePicture]);

    const openJob = (id) => {
        const job = jobsList.find(j => j.id === id);
        if (job) setSelectedJob(job);
    };

    const dashboardJobs = jobsList.slice(0, 4);



    return (
        <>
            <div className="ov-body">
                {/* LEFT SIDEBAR NAV */}
                <motion.aside
                    className="ov-leftnav glass-panel"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <div className="ov-leftnav-avatar">
                        {profilePicture ? (
                            <img
                                src={profilePicture}
                                alt={user?.name}
                                referrerPolicy="no-referrer"
                                style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'cover' }}
                            />
                        ) : (
                            user?.name?.substring(0, 2).toUpperCase() || 'U'
                        )}
                    </div>
                    <div className="ov-leftnav-name">{user?.name || 'User'}</div>
                    <div className="ov-leftnav-sub">Student • {new Date().getFullYear()}</div>
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
                </motion.aside>

                {/* CENTER */}
                <main className="ov-center">
                    <div className="ov-greeting fade-in">
                        <h1>Good evening, {user?.name?.split(' ')[0] || 'User'}</h1>
                        <p>
                            Welcome back! You have 0 new matches since yesterday.
                            {!isComplete && " Complete your profile for more matches."}
                        </p>
                    </div>

                    {!isComplete && (
                        <motion.div
                            className="profile-prompt-banner glass-card"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <div className="ppb-icon">
                                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                    <line x1="12" y1="11" x2="12" y2="13" />
                                    <line x1="11" y1="12" x2="13" y2="12" />
                                </svg>
                            </div>
                            <div className="ppb-content">
                                <h3>Complete Your Profile</h3>
                                <p>Unlock personalized job matches and skill gap analysis by adding your skills and target roles.</p>
                            </div>
                            <button className="ppb-btn" onClick={() => navigate('/profile')}>Complete Now →</button>
                        </motion.div>
                    )}

                    {/* STATS */}
                    <div className="ov-stats">
                        {[
                            { cls: 'c1', delta: '0 new', deltaCls: 'delta-neutral', iconBg: 'rgba(78,205,196,0.1)', iconBorder: 'rgba(78,205,196,0.25)', stroke: '#4ecdc4', icon: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>, num: stats.bookmarks, numColor: '#4ecdc4', label: 'Saved Jobs', sub: 'Your bookmarked jobs' },
                            { cls: 'c2', delta: '0 today', deltaCls: 'delta-neutral', iconBg: 'rgba(232,212,139,0.1)', iconBorder: 'rgba(232,212,139,0.25)', stroke: '#e8d48b', icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /></>, num: stats.applied, numColor: 'var(--gold)', label: 'Jobs Applied', sub: 'Last 30 days' },
                            { cls: 'c3', delta: '0 interviews', deltaCls: 'delta-neutral', iconBg: 'rgba(162,155,254,0.1)', iconBorder: 'rgba(162,155,254,0.25)', stroke: '#a29bfe', icon: <><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></>, num: stats.active, numColor: '#a29bfe', label: 'Active Applications', sub: 'Awaiting response' },
                            { cls: 'c4', delta: '0pts', deltaCls: 'delta-neutral', iconBg: 'rgba(255,107,157,0.1)', iconBorder: 'rgba(255,107,157,0.25)', stroke: '#ff6b9d', icon: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>, num: stats.avgATS, suffix: '%', numColor: '#ff6b9d', label: 'Avg ATS Score', sub: stats.avgATS > 0 ? 'Across your resumes' : 'No resumes yet' },
                        ].map((s, i) => (
                            <motion.div key={i} className={`ov-sc glass-card ${s.cls}`}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.1, type: 'spring', stiffness: 120, damping: 14 }}>
                                <span className={`ov-sc-delta ${s.deltaCls}`}>{s.delta}</span>
                                <div className="ov-sc-icon" style={{ background: s.iconBg, borderColor: s.iconBorder }}>
                                    <svg viewBox="0 0 24 24" stroke={s.stroke}>{s.icon}</svg>
                                </div>
                                <div className="ov-sc-num" style={{ color: s.numColor }}>
                                    <CountUp end={s.num} suffix={s.suffix || ''} />
                                </div>
                                <div className="ov-sc-label">{s.label}</div>
                                <div className="ov-sc-sub">{s.sub}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* BEST MATCHES */}
                    <div className="ov-sec-head">
                        <div className="ov-sec-title">Bookmarked Jobs</div>
                        <button className="ov-view-all" onClick={() => navigate('/jobs')}>View All Jobs →</button>
                    </div>
                    <div className="ov-match-list">
                        {dashboardJobs.length > 0 ? dashboardJobs.map((m, idx) => {
                            const initials = m.initials || m.company?.substring(0, 2).toUpperCase();
                            const salary = m.salary || (m.salary_min ? `₹${m.salary_min}K+` : 'Competitive');
                            const matchScore = m.match || 90;
                            const col = m.col || (idx === 0 ? '#4ecdc4' : idx === 1 ? '#e8d48b' : '#a29bfe');
                            const tags = m.tags || [m.job_type, m.work_mode].filter(t => t);

                            const handleApply = async (e, job) => {
                                e.stopPropagation();
                                try {
                                    const token = localStorage.getItem('token');
                                    if (!token) return toast('Please login to apply');

                                    const res = await fetch(`${backendUrl}/api/jobs/apply`, {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Authorization': `Bearer ${token}`
                                        },
                                        body: JSON.stringify({ jobId: job.id })
                                    });

                                    if (res.ok) {
                                        toast(`Applied to ${job.company}! ✓`);
                                        // Refresh stats
                                        const statsRes = await fetch(`${backendUrl}/api/dashboard/stats`, {
                                            headers: { 'Authorization': `Bearer ${token}` }
                                        });
                                        if (statsRes.ok) {
                                            const statsData = await statsRes.json();
                                            setStats(statsData.stats);
                                            setChartData(statsData.chartData);
                                        }
                                    }
                                } catch (err) {
                                    toast('Failed to record application');
                                }
                            };

                            return (
                                <motion.div key={m.id || idx} className="ov-mc glass-card" onClick={() => openJob(m.id)}
                                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                                    style={{ padding: '16px', borderRadius: '16px', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '16px' }}
                                    whileHover={{ scale: 1.02, x: 5 }}>
                                    <div className="ov-mc-logo" style={{ borderColor: `${col}33`, color: col }}>{initials}</div>
                                    <div className="ov-mc-info">
                                        <div className="ov-mc-title">{m.title}</div>
                                        <div className="ov-mc-company">{m.company} &nbsp;•&nbsp; {salary}</div>
                                        <div className="ov-mc-tags">{tags.slice(0, 2).map(t => <span key={t} className="ov-mc-tag">{t}</span>)}</div>
                                    </div>
                                    <div className="ov-mc-right">
                                        <div>
                                            <div className="ov-mc-pct" style={{ color: col }}>{matchScore}%</div>
                                            <div className="ov-mc-pct-lbl">Match</div>
                                        </div>
                                        <button className="ov-mc-apply" onClick={(e) => handleApply(e, m)}>Apply</button>
                                    </div>
                                </motion.div>
                            );
                        }) : (
                            <div className="glass-card" style={{ padding: '30px', textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>
                                No bookmarked jobs yet. Sync and find your first match!
                            </div>
                        )}
                    </div>
                </main>

                {/* RIGHT PANEL */}
                <motion.aside
                    className="ov-rightnav glass-panel"
                    initial={{ x: 250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 20 }}
                >
                    {/* Deadlines */}
                    <div className="ov-panel-card glass-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
                            Deadlines & Reminders
                        </div>
                        {ovDeadlines.length > 0 ? ovDeadlines.map((d, i) => (
                            <div key={i} className={`ov-deadline ${d.type}`}>
                                <div className="ov-deadline-icon">{d.icon}</div>
                                <div>
                                    <div className="ov-deadline-co">{d.co}</div>
                                    <div className="ov-deadline-role">{d.role}</div>
                                    <div className="ov-deadline-time">{d.time}</div>
                                </div>
                            </div>
                        )) : (
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', padding: '10px 0' }}>No upcoming deadlines.</div>
                        )}
                    </div>

                    {/* Skill Gap */}
                    <div className="ov-panel-card glass-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>
                            Skill Gap Analysis
                        </div>
                        {skillGap.length > 0 ? skillGap.map((gap, i) => (
                            <div key={i} className="ov-skill-gap" style={{ marginTop: i > 0 ? 8 : 0 }}>
                                <div className="ov-skill-gap-head">
                                    <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                                    Missing for {gap.role}
                                </div>
                                <div className="ov-skill-gap-text">
                                    {gap.missing.length > 0 ? (
                                        <>You're missing these skills for <strong>{100 - gap.matchPercent}%</strong> of requirements:</>
                                    ) : (
                                        <>You're a <strong>100% match</strong> for this role! Great job.</>
                                    )}
                                </div>
                                <div className="ov-skill-gap-tags">
                                    {gap.missing.map(skill => (
                                        <span key={skill} className="ov-skill-gap-tag">{skill}</span>
                                    ))}
                                </div>
                                {gap.missing.length > 0 && (
                                    <button
                                        className="ov-learn-btn"
                                        onClick={() => window.open(`https://www.youtube.com/results?search_query=${gap.missing[0]}+tutorial`, '_blank')}
                                    >
                                        🎓 Learn {gap.missing[0]} on YouTube →
                                    </button>
                                )}
                            </div>
                        )) : (
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', padding: '10px 0' }}>Complete your profile to see skill gaps.</div>
                        )}
                    </div>

                    {/* ATS Scores */}
                    <div className="ov-panel-card glass-card">
                        <div className="ov-panel-title">
                            <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                            Resume ATS Scores
                        </div>
                        {atsHistory.length > 0 ? atsHistory.map((a, i) => {
                            const col = a.score >= 80 ? '#4ecdc4' : a.score >= 65 ? '#e8d48b' : '#f87171';
                            return (
                                <div key={i} className="ov-ats-item">
                                    <div className="ov-ats-name">{a.name}</div>
                                    <div className="ov-ats-bar-bg"><div className="ov-ats-bar-fill" style={{ width: `${a.score}%`, background: col }}></div></div>
                                    <div className="ov-ats-val" style={{ color: col }}>{a.score}%</div>
                                </div>
                            );
                        }) : (
                            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', padding: '10px 0' }}>No resumes checked.</div>
                        )}
                        <button className="ov-ats-check-btn" onClick={() => navigate('/ats')}>+ Check New Resume →</button>
                    </div>

                    {/* Quick Actions */}
                    <div className="ov-panel-card glass-card">
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
                </motion.aside>
            </div>

            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </>
    );
}
