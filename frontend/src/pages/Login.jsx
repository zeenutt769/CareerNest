import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
        const payload = isLogin ? { email, password } : { name, email, password };
        const backendUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

        try {
            const response = await fetch(`${backendUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                toast(data.message || 'Success!');
                login(data.token); // Updates auth context and stores token
                navigate('/dashboard');
            } else {
                toast(data.message || 'Authentication failed');
            }
        } catch (error) {
            toast('Error connecting to server');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleOAuth = () => {
        const backendUrl = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
        toast('Redirecting to Google...');
        window.location.href = `${backendUrl}/api/auth/google`;
    };

    return (
        <div className="page active" id="login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', position: 'relative', paddingTop: '100px', paddingBottom: '40px' }}>
            {/* Background elements (reusing landing glow) */}

            <motion.div
                className="auth-card glass-card"
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 14 }}
                style={{
                    padding: '44px',
                    width: '100%',
                    maxWidth: '440px',
                    zIndex: 10,
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div className="l-logo" style={{ cursor: 'pointer', marginBottom: '8px' }} onClick={() => navigate('/')}>Career<span>Nest</span></div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--white)' }}>
                        {isLogin ? 'Welcome Back' : 'Create an Account'}
                    </h2>
                    <p style={{ color: 'var(--gray)', fontSize: '14px', marginTop: '8px' }}>
                        {isLogin ? 'Enter your details to access your account.' : 'Join us and find your dream job.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {!isLogin && (
                        <div className="search-box" style={{ width: '100%' }}>
                            <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="search-box" style={{ width: '100%' }}>
                        <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="search-box" style={{ width: '100%' }}>
                        <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {isLogin && (
                        <div style={{ textAlign: 'right' }}>
                            <span style={{ color: 'var(--gold)', fontSize: '13px', cursor: 'pointer' }} onClick={() => toast('Password reset link sent!')}>
                                Forgot Password?
                            </span>
                        </div>
                    )}

                    <button type="submit" className="btn-gold" style={{ width: '100%', marginTop: '8px' }} disabled={isLoading}>
                        {isLoading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
                    </button>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <span style={{ margin: '0 12px', color: 'var(--gray)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>or</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                    </div>

                    <button
                        type="button"
                        className="btn-outline-gold"
                        onClick={handleGoogleOAuth}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                        <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }} fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                        Continue with Google
                    </button>

                    <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: 'var(--gray)' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            style={{ color: 'var(--gold)', cursor: 'pointer', fontWeight: '500' }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Sign up' : 'Login'}
                        </span>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
