import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider } from './components/Toast';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FindJob from './pages/FindJob';
import ATSCheck from './pages/ATSCheck';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Hiring from './pages/Hiring';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';
import PageTransition from './components/PageTransition';
import ParticleBackground from './components/ParticleBackground';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LayoutDashboard, Briefcase, FileText, HelpCircle, Home, User, LogIn, LogOut } from 'lucide-react';

function Layout({ children }) {
    return (
        <>
            {children}
        </>
    );
}

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/login-success" element={<PageTransition><LoginSuccess /></PageTransition>} />
                <Route path="/faq" element={<Layout><PageTransition><FAQ /></PageTransition></Layout>} />

                {/* Protected Routes */}
                <Route path="/jobs" element={<ProtectedRoute><Layout><PageTransition><FindJob /></PageTransition></Layout></ProtectedRoute>} />
                <Route path="/ats" element={<ProtectedRoute><Layout><PageTransition><ATSCheck /></PageTransition></Layout></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Layout><PageTransition><Dashboard /></PageTransition></Layout></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Layout><PageTransition><Profile /></PageTransition></Layout></ProtectedRoute>} />
                <Route path="/community" element={<ProtectedRoute><Layout><PageTransition><Community /></PageTransition></Layout></ProtectedRoute>} />
                <Route path="/hiring" element={<ProtectedRoute><Layout><PageTransition><Hiring /></PageTransition></Layout></ProtectedRoute>} />
            </Routes>
        </AnimatePresence>
    );
}

function NavigationWrapper() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const loggedInItems = [
        { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
        { name: 'Jobs', url: '/jobs', icon: Briefcase },
        { name: 'ATS', url: '/ats', icon: FileText },
        { name: 'FAQ', url: '/faq', icon: HelpCircle },
        { name: 'Profile', url: '/profile', icon: User },
        { name: 'Logout', url: '#', icon: LogOut, onClick: handleLogout },
    ];

    const guestItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'FAQ', url: '/faq', icon: HelpCircle },
        { name: 'Login', url: '/login', icon: LogIn },
        { name: 'Sign Up', url: '/login', icon: User },
    ];

    const items = isLoggedIn ? loggedInItems : guestItems;

    return <NavBar items={items} />;
}

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <BrowserRouter>
                    <ParticleBackground />
                    <div className="glow-bg"></div>
                    <NavigationWrapper />
                    <AnimatedRoutes />
                </BrowserRouter>
            </ToastProvider>
        </AuthProvider>
    );
}
