import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, FileText, Bell } from 'lucide-react';
import { useToast } from '../components/Toast';

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'tween', ease: [0.4, 0, 0.2, 1], duration: 0.5 }
    }
};

export default function Landing() {
    const navigate = useNavigate();
    const toast = useToast();

    const handleLanding = () => {
        const email = document.getElementById('landingEmail')?.value;
        if (!email || !email.includes('@')) {
            toast('Please enter a valid email!');
            return;
        }
        toast('Welcome to CareerNest! Redirecting...');
        setTimeout(() => navigate('/jobs'), 1100);
    };

    return (
        <div className="page active" id="landing">
            {/* NAV */}
            <nav className="l-nav">
                <div className="l-logo">Career<span>Nest</span></div>
                <button className="l-nav-btn" onClick={() => navigate('/login')}>Login/SignUp→</button>
            </nav>

            {/* HERO */}
            <motion.section
                className="hero"
                variants={staggerContainer}
                initial="hidden"
                animate="show"
            >
                <motion.div className="hero-badge" variants={fadeUp}>
                    Find your dream job today
                </motion.div>
                <motion.h1 className="hero-h1" variants={fadeUp}>
                    <span className="italic">Smart job</span> matching<br />
                    for <span className="italic">students</span> & freshers
                </motion.h1>
                <motion.p className="hero-sub" variants={fadeUp}>
                    CareerNest aggregates thousands of opportunities, checks your ATS resume score,
                    and connects you to the right role — all in one place.
                </motion.p>
                <motion.div className="hero-form" variants={fadeUp}>
                    <input type="text" id="landingEmail" placeholder="Enter your email to get started..." />
                    <button className="hero-cta" onClick={() => navigate('/login')}>Get Started →</button>
                </motion.div>
            </motion.section>

            {/* FEATURES */}
            <div className="features">
                <h2 className="section-title">Everything a student needs to <span>land their first job</span></h2>
                <p className="section-sub">From resume scanning to direct applications — CareerNest covers your full job search journey</p>
                <div className="feat-grid">
                    {[
                        { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>, title: 'Smart Job Matching', desc: 'AI-powered algorithm matches your skills and preferences to the most relevant opportunities across LinkedIn, Indeed, and Glassdoor.' },
                        { icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" /></svg>, title: 'ATS Resume Checker', desc: 'Upload your resume and get an instant ATS match score against any job description. Know exactly which keywords to add before applying.' },
                        { icon: <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>, title: 'Daily Job Digest', desc: 'Get a curated digest of new openings matching your profile delivered to your email or WhatsApp every morning.' },
                    ].map((feat, idx) => (
                        <motion.div key={idx} className="feat-card glass-card"
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                            viewport={{ once: true, margin: "-50px" }}>
                            <div className="feat-icon">{feat.icon}</div>
                            <h3>{feat.title}</h3>
                            <p>{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div className="how" style={{ maxWidth: 1200, margin: '0 auto' }}>
                <h2 className="section-title">How <span>CareerNest</span> works</h2>
                <div className="how-steps">
                    {[
                        { num: '1', title: 'Create Your Profile', desc: 'Sign up with Google or GitHub. Add your academic details, skills, and target roles. Upload your resume for auto-fill.' },
                        { num: '2', title: 'Discover Opportunities', desc: 'Browse thousands of curated jobs filtered by your tech stack, salary, location, and experience level.' },
                        { num: '3', title: 'Apply with Confidence', desc: "Check your ATS score, get missing keyword suggestions, then apply directly — all without leaving CareerNest." },
                    ].map((s, idx) => (
                        <motion.div key={idx} className="how-step glass-card" style={{ padding: '34px 26px', borderRadius: '20px' }}
                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: idx * 0.1, type: 'spring', stiffness: 100, damping: 15 }}
                            viewport={{ once: true, margin: "-50px" }}>
                            <div className="step-num">{s.num}</div>
                            <h3>{s.title}</h3>
                            <p>{s.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* CTA BAND */}
            <motion.div className="cta-band" style={{ maxWidth: 1200, margin: '60px auto 80px' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <h2>Ready to find your <span>dream job?</span></h2>
                <p>Join thousands of students who found their first role through CareerNest</p>
                <div className="cta-btns">
                    <button className="btn-gold" onClick={() => navigate('/login')}>Browse Jobs Now →</button>
                    <button className="btn-outline-gold" onClick={() => navigate('/login')}>Check Resume ATS Score</button>
                </div>
            </motion.div>
        </div>
    );
}
