import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, isAuthLoading, checkAuthStatus } = useAuth();
    const location = useLocation();

    // Re-verify token on route change or mount
    useEffect(() => {
        checkAuthStatus();
    }, [location.pathname, checkAuthStatus]);

    if (isAuthLoading) {
        // Show a loading state while we verify the token
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'white' }}>
                <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'Playfair Display, serif' }}>Verifying...</h2>
                </div>
            </div>
        );
    }

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
