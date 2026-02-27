import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from './Toast';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'My Dashboard', path: '/dashboard' },
        { name: 'Find Job', path: '/jobs' },
        { name: 'Resume Check', path: '/ats' },
        { name: 'FAQ', path: '/faq' },
    ];

    return (
        <header className="d-header">
            <div className="d-logo" onClick={() => navigate('/')}>Career<span>Nest</span></div>
            <button
                className="mobile-nav-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ fontSize: 24, padding: '0 10px' }}
            >
                {isMobileMenuOpen ? '✕' : '☰'}
            </button>
            <nav className={`d-nav ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        className={location.pathname === item.path ? 'active' : ''}
                        onClick={() => {
                            navigate(item.path);
                            setIsMobileMenuOpen(false);
                        }}
                    >
                        {item.name}
                    </a>
                ))}
            </nav>
            <div className="d-right" style={{ display: isMobileMenuOpen ? 'none' : 'flex' }}>
                <div className="d-location">
                    <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    <span>Mumbai, IN</span>
                </div>
                <button className="icon-btn" onClick={() => toast('Notifications coming soon!')}>
                    <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>
                </button>
                <button className="icon-btn" onClick={() => navigate('/profile')}>
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                </button>
                <div className="d-avatar" onClick={() => navigate('/profile')}>RS</div>
            </div>
        </header>
    );
}
