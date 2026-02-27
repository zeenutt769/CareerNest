import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Header from './components/Header';
import Login from './pages/Login';
import PageTransition from './components/PageTransition';
import ParticleBackground from './components/ParticleBackground';

function Layout({ children }) {
    return (
        <>
            <Header />
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
                <Route path="/jobs" element={<Layout><PageTransition><FindJob /></PageTransition></Layout>} />
                <Route path="/ats" element={<Layout><PageTransition><ATSCheck /></PageTransition></Layout>} />
                <Route path="/dashboard" element={<Layout><PageTransition><Dashboard /></PageTransition></Layout>} />
                <Route path="/profile" element={<Layout><PageTransition><Profile /></PageTransition></Layout>} />
                <Route path="/community" element={<Layout><PageTransition><Community /></PageTransition></Layout>} />
                <Route path="/hiring" element={<Layout><PageTransition><Hiring /></PageTransition></Layout>} />
                <Route path="/faq" element={<Layout><PageTransition><FAQ /></PageTransition></Layout>} />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <ToastProvider>
            <BrowserRouter>
                <ParticleBackground />
                <div className="glow-bg"></div>
                <AnimatedRoutes />
            </BrowserRouter>
        </ToastProvider>
    );
}
