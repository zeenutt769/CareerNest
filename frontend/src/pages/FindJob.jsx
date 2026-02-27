import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';
import JobModal from '../components/JobModal';
import { useToast } from '../components/Toast';

export default function FindJob() {
    const navigate = useNavigate();
    const toast = useToast();
    const [searchInput, setSearchInput] = useState('');
    const [salaryMax, setSalaryMax] = useState(80);
    const [sortBy, setSortBy] = useState('latest');
    const [selectedJob, setSelectedJob] = useState(null);
    const [bookmarks, setBookmarks] = useState({});
    const [filters, setFilters] = useState({
        ft: true, pt: true, intern: false, proj: false, vol: false,
        fd: true, flex: true, shift: false, dist: false, remote: false,
        fresh: true, mid: true, senior: false,
    });

    const filteredJobs = useMemo(() => {
        let result = jobs.filter(j => {
            if (searchInput) {
                const q = searchInput.toLowerCase();
                if (!j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q)) return false;
            }
            return true;
        });
        if (sortBy === 'salary') result = [...result].sort((a, b) => b.salaryN - a.salaryN);
        if (sortBy === 'company') result = [...result].sort((a, b) => a.company.localeCompare(b.company));
        return result;
    }, [searchInput, sortBy]);

    const salaryPct = ((salaryMax - 20) / (200 - 20) * 100).toFixed(1);

    const toggleBM = (id) => {
        setBookmarks(prev => {
            const next = { ...prev, [id]: !prev[id] };
            toast(next[id] ? 'Job saved' : 'Removed from saved');
            return next;
        });
    };

    return (
        <div className="page active" id="findjob" style={{ position: 'relative' }}>
            <div className="glow-bg"></div>
            {/* SEARCH BAR */}
            <motion.div
                className="d-searchbar glass-panel"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                style={{ padding: '16px 48px', margin: '0 48px', borderRadius: '24px', position: 'relative', top: '24px', zIndex: 100, display: 'flex', gap: '12px', alignItems: 'center' }}
            >
                <div className="search-box glass-card" style={{ flex: 1, maxWidth: 210 }}>
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                    <input type="text" placeholder="Job title or skill..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                </div>
                <button className="filter-pill" onClick={() => toast('Filter: Mumbai · Bangalore · Remote · Hyderabad')}>
                    <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    Work Location <span>▾</span>
                </button>
                <button className="filter-pill" onClick={() => toast('Filter: Fresher · Mid Level · Senior')}>
                    <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                    Experience <span>▾</span>
                </button>
                <button className="filter-pill glass-card" onClick={() => toast('Filter: Per Month / Per Year')} style={{ padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                    Per Month <span>▾</span>
                </button>
                <div className="salary-pill glass-card" style={{ padding: '12px 20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div>
                        <div className="salary-label">Salary Range</div>
                        <div className="salary-val">₹20K – ₹{salaryMax * 2}K</div>
                    </div>
                    <input
                        type="range" className="salary-slider" min="20" max="200" value={salaryMax}
                        onChange={(e) => setSalaryMax(Number(e.target.value))}
                        style={{ background: `linear-gradient(to right, var(--gold) ${salaryPct}%, rgba(255,255,255,0.12) ${salaryPct}%)` }}
                    />
                </div>
            </motion.div>

            {/* MAIN */}
            <div className="d-main" style={{ marginTop: '24px' }}>
                {/* SIDEBAR */}
                <motion.aside
                    className="d-sidebar glass-panel"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                    <div className="sidebar-promo">
                        <h4>Get your best career start with <span>CareerNest</span></h4>
                        <button className="sidebar-promo-btn" onClick={() => navigate('/ats')}>Check ATS Score →</button>
                    </div>
                    <div className="filter-section">
                        <div className="filter-title">Working Schedule</div>
                        {[['ft', 'Full time'], ['pt', 'Part time'], ['intern', 'Internship'], ['proj', 'Project work'], ['vol', 'Volunteering']].map(([k, l]) => (
                            <div className="filter-option" key={k}>
                                <input type="checkbox" id={k} checked={filters[k]} onChange={() => setFilters(p => ({ ...p, [k]: !p[k] }))} />
                                <label htmlFor={k}>{l}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filter-section">
                        <div className="filter-title">Employment Type</div>
                        {[['fd', 'Full day'], ['flex', 'Flexible schedule'], ['shift', 'Shift work'], ['dist', 'Distant work'], ['remote', 'Remote']].map(([k, l]) => (
                            <div className="filter-option" key={k}>
                                <input type="checkbox" id={k} checked={filters[k]} onChange={() => setFilters(p => ({ ...p, [k]: !p[k] }))} />
                                <label htmlFor={k}>{l}</label>
                            </div>
                        ))}
                    </div>
                    <div className="filter-section">
                        <div className="filter-title">Experience Level</div>
                        {[['fresh', 'Fresher / Entry'], ['mid', 'Mid Level'], ['senior', 'Senior Level']].map(([k, l]) => (
                            <div className="filter-option" key={k}>
                                <input type="checkbox" id={k} checked={filters[k]} onChange={() => setFilters(p => ({ ...p, [k]: !p[k] }))} />
                                <label htmlFor={k}>{l}</label>
                            </div>
                        ))}
                    </div>
                </motion.aside>

                {/* JOBS GRID */}
                <div className="d-jobs">
                    <div className="jobs-header">
                        <div className="jobs-title">Recommended jobs <span className="jobs-count">{filteredJobs.length}</span></div>
                        <div className="jobs-sort">Sort by:
                            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="latest">Last updated</option>
                                <option value="salary">Salary High→Low</option>
                                <option value="company">Company A–Z</option>
                            </select>
                        </div>
                    </div>
                    <div className="jobs-grid">
                        {filteredJobs.map((j, idx) => (
                            <motion.div
                                key={j.id}
                                className={`job-card ${j.accent} glass-card`}
                                onClick={() => setSelectedJob(j)}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: idx * 0.1, type: 'spring', stiffness: 120, damping: 14 }}>
                                <motion.button
                                    className={`bookmark-btn ${bookmarks[j.id] ? 'saved' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggleBM(j.id); }}
                                    whileTap={{ scale: 0.85 }}>
                                    <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>
                                </motion.button>
                                <div className="job-date">{j.date}</div>
                                <div className="job-company">{j.company}</div>
                                <div className="job-title-row">
                                    <div className="job-title">{j.title}</div>
                                    <div className="company-logo" style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '-.3px' }}>{j.initials}</div>
                                </div>
                                <div className="job-tags">{j.tags.map(t => <span key={t} className="job-tag">{t}</span>)}</div>
                                <div className="job-footer">
                                    <div>
                                        <div className="job-salary">{j.salary}</div>
                                        <div className="job-location">{j.location}</div>
                                    </div>
                                    <button className="job-details-btn" onClick={(e) => { e.stopPropagation(); setSelectedJob(j); }}>Details</button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
}