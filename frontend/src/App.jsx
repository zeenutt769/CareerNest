import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function Layout({ children }) {
    return (
        <>
            <div className="glow-bg"></div>
            <Header />
            {children}
        </>
    );
}

export default function App() {
    return (
        <ToastProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/jobs" element={<Layout><FindJob /></Layout>} />
                    <Route path="/ats" element={<Layout><ATSCheck /></Layout>} />
                    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                    <Route path="/profile" element={<Layout><Profile /></Layout>} />
                    <Route path="/community" element={<Layout><Community /></Layout>} />
                    <Route path="/hiring" element={<Layout><Hiring /></Layout>} />
                    <Route path="/faq" element={<Layout><FAQ /></Layout>} />
                </Routes>
            </BrowserRouter>
        </ToastProvider>
    );
}
