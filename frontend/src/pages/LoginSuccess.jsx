import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function LoginSuccess() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth();
    const toast = useToast();

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            login(token); // Passing the token here
            toast('Login successful! Welcome back.');
            navigate('/dashboard');
        } else {
            toast('Authentication failed.');
            navigate('/login');
        }
    }, [searchParams, login, navigate, toast]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'white' }}>
            <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Completing Login...</h2>
                <p style={{ color: 'var(--gray)', marginTop: '10px' }}>Please wait a moment.</p>
            </div>
        </div>
    );
}
