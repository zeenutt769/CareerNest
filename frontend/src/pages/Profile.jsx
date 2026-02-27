import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';

export default function Profile() {
    const toast = useToast();
    const { register, handleSubmit } = useForm({
        defaultValues: {
            fullName: 'Rahul Sharma',
            email: 'rahul@example.com',
            university: 'Mumbai University',
            cgpa: '8.4 / 10',
            gradYear: '2025',
            phone: '+91 98765 43210',
            targetRole: 'Frontend Developer, Full Stack Engineer, SDE-1',
            preferredLocation: 'Mumbai, Bangalore, Remote',
            github: '',
            linkedin: '',
        }
    });

    const [skills, setSkills] = useState(['React', 'Python', 'Node.js', 'JavaScript', 'SQL']);

    const removeSkill = (idx) => setSkills(prev => prev.filter((_, i) => i !== idx));
    const addSkill = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            setSkills(prev => [...prev, e.target.value.trim()]);
            e.target.value = '';
            e.preventDefault();
        }
    };

    const onSubmit = () => toast('Profile saved! ✓');

    return (
        <div className="inner-page-body">
            <div className="inner-main">
                <h1 className="page-title">Your <span>Profile</span></h1>
                <p className="page-sub">Complete your profile to get better job matches and visibility to recruiters.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <motion.div
                        className="profile-card glass-card"
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    >
                        <div className="profile-top">
                            <motion.div
                                className="big-avatar"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            >RS</motion.div>
                            <div className="profile-info">
                                <h2>Rahul Sharma</h2>
                                <p>B.Tech CSE • Mumbai University • 2025</p>
                            </div>
                            <button type="submit" className="save-profile-btn btn-gold">Save Profile</button>
                        </div>
                        <div className="form-grid">
                            <div className="form-group"><label>Full Name</label><input type="text" {...register('fullName')} /></div>
                            <div className="form-group"><label>Email</label><input type="email" {...register('email')} /></div>
                            <div className="form-group"><label>University</label><input type="text" {...register('university')} /></div>
                            <div className="form-group"><label>CGPA</label><input type="text" {...register('cgpa')} /></div>
                            <div className="form-group"><label>Graduation Year</label><input type="text" {...register('gradYear')} /></div>
                            <div className="form-group"><label>Phone / WhatsApp</label><input type="text" {...register('phone')} /></div>
                            <div className="form-group full"><label>Target Role</label><input type="text" {...register('targetRole')} /></div>
                            <div className="form-group full"><label>Preferred Location</label><input type="text" {...register('preferredLocation')} /></div>
                            <div className="form-group full">
                                <label>Skills</label>
                                <div className="skills-tags">
                                    {skills.map((s, i) => (
                                        <div key={i} className="skill-tag">{s} <span className="rm" onClick={() => removeSkill(i)}>✕</span></div>
                                    ))}
                                </div>
                                <input type="text" placeholder="Type a skill and press Enter" onKeyDown={addSkill} style={{ marginTop: 8 }} />
                            </div>
                            <div className="form-group"><label>GitHub URL</label><input type="url" placeholder="https://github.com/username" {...register('github')} /></div>
                            <div className="form-group"><label>LinkedIn URL</label><input type="url" placeholder="https://linkedin.com/in/username" {...register('linkedin')} /></div>
                        </div>
                    </motion.div>
                </form>
            </div>
        </div>
    );
}
