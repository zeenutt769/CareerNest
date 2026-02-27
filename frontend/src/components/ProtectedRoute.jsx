import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, checkAuthStatus } = useAuth();
    const location = useLocation();

    // Re-verify token on route change or mount
    useEffect(() => {
        checkAuthStatus();
    }, [location.pathname, checkAuthStatus]);

    if (!isLoggedIn) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
