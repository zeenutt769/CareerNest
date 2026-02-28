import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import JobModal from '../components/JobModal';
import { useToast } from '../components/Toast';
import API_BASE_URL from '../api';


export default function FindJob() {
    const navigate = useNavigate();
    const toast = useToast();
    const [jobsList, setJobsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [salaryMax, setSalaryMax] = useState(80);
    const [sortBy, setSortBy] = useState('latest');
    const [selectedJob, setSelectedJob] = useState(null);
    const [bookmarks, setBookmarks] = useState({});
    const [filters, setFilters] = useState({
        ft: false, pt: false, intern: false, proj: false, vol: false,
        fd: false, flex: false, shift: false, dist: false, remote: false,
        fresh: false, mid: false, senior: false,
    });
    const [locationQuery, setLocationQuery] = useState('');
    const [isYearly, setIsYearly] = useState(false);

    const backendUrl = API_BASE_URL;


    React.useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const token = localStorage.getItem('token');
                // Fetch Jobs
                const jobsRes = await fetch(`${backendUrl}/api/jobs`);
                if (jobsRes.ok) {
                    const data = await jobsRes.json();
                    setJobsList(data);
                }

                // Fetch current bookmarks
                if (token) {
                    const bmRes = await fetch(`${backendUrl}/api/bookmarks/ids`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    if (bmRes.ok) {
                        const ids = await bmRes.json();
                        const bmMap = {};
                        ids.forEach(id => bmMap[id] = true);
                        setBookmarks(bmMap);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch initial data:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchInitialData();
    }, [backendUrl]);

    const filteredJobs = useMemo(() => {
        let result = jobsList;
        if (!result || result.length === 0) return [];

        // 1. Search (Title + Company + Location)
        const q = searchInput.toLowerCase();
        const lQ = locationQuery.toLowerCase();

        result = result.filter(j => {
            const matchSearch = !q ||
                j.title?.toLowerCase().includes(q) ||
                j.company?.toLowerCase().includes(q) ||
                j.description?.toLowerCase().includes(q);

            const matchLocation = !lQ || j.location?.toLowerCase().includes(lQ);

            return matchSearch && matchLocation;
        });

        // 2. Salary Slider (Assuming slider is Monthly K if !isYearly, else Yearly L)
        result = result.filter(j => {
            const maxSal = Number(j.salary_max) || 0;
            if (maxSal === 0) return true; // Show jobs with no salary info by default

            let normalizedMax;
            if (maxSal > 5000) { // Likely Yearly (e.g. 1,000,000)
                normalizedMax = isYearly ? (maxSal / 100000) : (maxSal / 12 / 1000);
            } else { // Likely Monthly (e.g. 50,000)
                normalizedMax = isYearly ? (maxSal * 12 / 100000) : (maxSal / 1000);
            }

            return normalizedMax <= (isYearly ? salaryMax : salaryMax); // salaryMax is shared for now
            // Actually, let's just keep it simple: slider is Monthly K.
        });

        // Final salary check: slider is strictly Monthly K for now to match UI labels
        result = result.filter(j => {
            const max = Number(j.salary_max) || 0;
            if (max === 0) return true;
            const monthlyK = max > 5000 ? (max / 12 / 1000) : (max / 1000);
            return monthlyK <= (salaryMax * 2); // Expanding range based on UI Display
        });

        // 3. Working Schedule (Job Type)
        const anySchedule = filters.ft || filters.pt || filters.intern || filters.proj || filters.vol;
        if (anySchedule) {
            result = result.filter(j => {
                const jt = (j.job_type || '').toUpperCase();
                if (filters.ft && jt === 'FULLTIME') return true;
                if (filters.pt && jt === 'PARTTIME') return true;
                if (filters.intern && (jt === 'INTERN' || jt === 'INTERNSHIP')) return true;
                if (filters.proj && jt === 'CONTRACTOR') return true;
                return false;
            });
        }

        // 4. Employment Type (Work Mode)
        const anyEmpType = filters.remote || filters.fd || filters.flex || filters.shift || filters.dist;
        if (anyEmpType) {
            result = result.filter(j => {
                const wm = (j.work_mode || '').toLowerCase();
                if (filters.remote && wm.includes('remote')) return true;
                if (filters.fd && !wm.includes('remote')) return true; // Full day -> On-site
                return false;
            });
        }

        // 5. Experience Level
        const anyExp = filters.fresh || filters.mid || filters.senior;
        if (anyExp) {
            result = result.filter(j => {
                const title = (j.title || '').toLowerCase();
                const isFresh = title.includes('intern') || title.includes('junior') || title.includes('entry') || title.includes('fresher');
                const isSenior = title.includes('senior') || title.includes('lead') || title.includes('sr.') || title.includes('manager');
                const isMid = !isFresh && !isSenior;

                if (filters.fresh && isFresh) return true;
                if (filters.mid && isMid) return true;
                if (filters.senior && isSenior) return true;
                return false;
            });
        }

        // 6. Sort
        if (sortBy === 'salary') result = [...result].sort((a, b) => (Number(b.salary_max) || 0) - (Number(a.salary_max) || 0));
        if (sortBy === 'latest') result = [...result].sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));
        if (sortBy === 'company') result = [...result].sort((a, b) => (a.company || '').localeCompare(b.company || ''));

        return result;
    }, [searchInput, locationQuery, sortBy, jobsList, filters, salaryMax, isYearly]);

    const toggleBM = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast('Please login to bookmark jobs');
                return;
            }

            const res = await fetch(`${backendUrl}/api/bookmarks/toggle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ jobId: id })
            });

            if (res.ok) {
                const data = await res.json();
                setBookmarks(prev => ({ ...prev, [id]: data.isBookmarked }));
                toast(data.isBookmarked ? 'Job saved' : 'Removed from saved');
            }
        } catch (err) {
            console.error('Error toggling bookmark:', err);
            toast('Failed to update bookmark');
        }
    };

    const salaryPct = ((salaryMax - 20) / (200 - 20) * 100).toFixed(1);
    const anyExp = filters.fresh || filters.mid || filters.senior;

    return (
        <div className="page active" id="findjob" style={{ position: 'relative' }}>
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
                <div className="filter-pill glass-card" style={{ padding: '0 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" style={{ width: 16 }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    <input
                        type="text"
                        placeholder="Location..."
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        style={{ background: 'none', border: 'none', color: '#fff', fontSize: '0.9rem', outline: 'none', width: '100px' }}
                    />
                </div>
                <button className={`filter-pill ${anyExp ? 'active-pill' : ''}`} onClick={() => setFilters(p => ({ ...p, fresh: !p.fresh }))}>
                    <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                    {filters.senior ? 'Senior' : filters.mid ? 'Mid Level' : 'Experience'} <span>▾</span>
                </button>
                <button
                    className="filter-pill glass-card"
                    onClick={() => setIsYearly(!isYearly)}
                    style={{ padding: '10px 16px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.1)', background: isYearly ? 'var(--gold-linear)' : 'transparent' }}
                >
                    <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, stroke: 'currentColor', fill: 'none', strokeWidth: 2 }}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
                    {isYearly ? 'Per Year' : 'Per Month'}
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
                        {isLoading ? (
                            <div className="empty-jobs glass-card">Loading fresh jobs...</div>
                        ) : filteredJobs.length > 0 ? (
                            filteredJobs.map((j, idx) => (
                                <motion.div
                                    key={j.id}
                                    className={`job-card teal-accent glass-card`}
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
                                    <div className="job-date">{j.posted_at ? new Date(j.posted_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : 'Recently'}</div>
                                    <div className="job-company">{j.company}</div>
                                    <div className="job-title-row">
                                        <div className="job-title">{j.title}</div>
                                        <div className="company-logo" style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '-.3px' }}>
                                            {j.company?.substring(0, 2).toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="job-tags">
                                        {[j.job_type, j.work_mode].filter(t => t).map(t => <span key={t} className="job-tag">{t}</span>)}
                                    </div>
                                    <div className="job-footer">
                                        <div>
                                            <div className="job-salary">{j.salary || (j.salary_min ? `₹${j.salary_min}K+` : 'Competitive')}</div>
                                            <div className="job-location">{j.location}</div>
                                        </div>
                                        <button className="job-details-btn" onClick={(e) => { e.stopPropagation(); setSelectedJob(j); }}>Details</button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="empty-jobs glass-card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px' }}>
                                <h3>No jobs found on the backend.</h3>
                                <p>You can sync fresh jobs by visiting the Sync API.</p>
                                <button
                                    className="ov-mc-apply"
                                    style={{ marginTop: '20px', padding: '10px 20px' }}
                                    onClick={() => window.open(`${backendUrl}/api/jobs/sync`, '_blank')}
                                >
                                    Sync Fresh Jobs Now →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
        </div>
    );
}