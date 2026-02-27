import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    const isTokenExpired = useCallback((token) => {
        if (!token) return true;
        try {
            const decoded = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            return decoded.exp < currentTime;
        } catch (error) {
            return true;
        }
    }, []);

    const checkAuthStatus = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            try {
                const decoded = jwtDecode(token);
                // Only update if state actually changed
                setIsLoggedIn(prev => prev !== true ? true : prev);
                setUser(prev => JSON.stringify(prev) !== JSON.stringify(decoded) ? decoded : prev);
                setIsAuthLoading(false);
                return true;
            } catch (err) {
                setIsLoggedIn(false);
                setUser(null);
                localStorage.removeItem('token');
                localStorage.removeItem('isLoggedIn');
                setIsAuthLoading(false);
                return false;
            }
        } else {
            setIsLoggedIn(prev => prev !== false ? false : prev);
            setUser(prev => prev !== null ? null : prev);
            localStorage.removeItem('token');
            localStorage.removeItem('isLoggedIn');
            setIsAuthLoading(false);
            return false;
        }
    }, [isTokenExpired]);

    // Initial check for existing session
    useEffect(() => {
        checkAuthStatus();
    }, [checkAuthStatus]);

    const login = useCallback((token) => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (err) {
                setUser(null);
            }
            setIsAuthLoading(false);
        }
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');
        setIsAuthLoading(false);
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        user,
        isAuthLoading,
        login,
        logout,
        checkAuthStatus
    }), [isLoggedIn, user, isAuthLoading, login, logout, checkAuthStatus]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
