import React from 'react';
import { useToast } from '../components/Toast';

export default function Hiring() {
    const toast = useToast();

    const resources = [
        {
            icon: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
            title: 'Post Your Resume for Companies',
            desc: 'Let companies come to you. Your profile is visible to 500+ hiring partners on CareerNest.',
            btn: 'Enable Visibility',
            action: () => toast('Profile visibility enabled! ✓'),
        },
        {
            icon: <svg viewBox="0 0 24 24"><path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
            title: 'Campus Recruitment Drive',
            desc: '12 companies are actively recruiting from your college this month. Apply before the deadline.',
            btn: 'View Drives',
            action: () => toast('Campus drives loaded!'),
        },
        {
            icon: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.16a16 16 0 006.93 6.93l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>,
            title: 'Mock Interview Practice',
            desc: 'Schedule a mock interview with an industry professional and get detailed feedback.',
            btn: 'Book Now',
            action: () => toast('Mock interview booked! ✓'),
        },
        {
            icon: <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>,
            title: 'Alumni Referral Network',
            desc: 'Connect with 1,200+ alumni at your target companies for direct referrals to open roles.',
            btn: 'Request Referral',
            action: () => toast('Referral request sent! ✓'),
        },
        {
            icon: <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>,
            title: 'Job Alert Notifications',
            desc: 'Get daily digests via Email or WhatsApp for jobs perfectly matching your profile and skills.',
            btn: 'Enable Alerts',
            action: () => toast('Alerts enabled! Check your email.'),
        },
    ];

    return (
        <div className="inner-page-body">
            <div className="inner-main">
                <h1 className="page-title">Hiring <span>Resources</span></h1>
                <p className="page-sub">Tools and resources to help you get hired faster at top companies.</p>
                <div style={{ maxWidth: 800 }}>
                    {resources.map((r, i) => (
                        <div key={i} className="hiring-card">
                            <div className="hiring-icon">{r.icon}</div>
                            <div className="hiring-info">
                                <h3>{r.title}</h3>
                                <p>{r.desc}</p>
                            </div>
                            <button className="hiring-btn" onClick={r.action}>{r.btn}</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
