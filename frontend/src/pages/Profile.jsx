import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast';
import { useAuth } from '../context/AuthContext';
import API_BASE_URL from '../api';


export default function Profile() {
    const toast = useToast();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [userAccount, setUserAccount] = useState({ name: '', email: '', profilePicture: '' });
    const { register, handleSubmit, reset } = useForm();
    const [skills, setSkills] = useState([]);
    console.log('Current skills in state:', skills);

    const backendUrl = API_BASE_URL;


    const getInitials = (userName) => {
        if (!userName) return 'U';
        return userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    // Fetch profile on mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${backendUrl}/api/profiles/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserAccount({
                        name: data.name || user?.name || '',
                        email: data.email || user?.email || '',
                        profilePicture: data.profile_picture || ''
                    });
                    console.log('Raw data from API:', data);
                    setSkills((data.skills || []).map(s => String(s).trim()).filter(s => s));
                    reset({
                        fullName: data.full_name || data.name || '',
                        university: data.university || '',
                        cgpa: data.cgpa || '',
                        gradYear: data.graduation_year || '',
                        phone: data.phone || '',
                        targetRole: data.target_roles?.join(', ') || '',
                        preferredLocation: data.preferred_locations?.join(', ') || '',
                        isRemote: data.is_remote || false,
                        github: data.github_url || '',
                        linkedin: data.linkedin_url || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [reset, backendUrl, user]);

    const removeSkill = (idx) => setSkills(prev => prev.filter((_, i) => i !== idx));
    const addSkill = (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            const val = e.target.value.trim();
            if (!skills.includes(val)) {
                setSkills(prev => [...prev, val]);
            }
            e.target.value = '';
            e.preventDefault();
        }
    };

    const onSubmit = async (formData) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                full_name: formData.fullName,
                university: formData.university,
                cgpa: parseFloat(formData.cgpa),
                graduation_year: parseInt(formData.gradYear),
                phone: formData.phone,
                skills,
                target_roles: formData.targetRole.split(',').map(r => r.trim()).filter(r => r),
                preferred_locations: formData.preferredLocation.split(',').map(l => l.trim()).filter(l => l),
                is_remote: formData.isRemote || false,
                github_url: formData.github,
                linkedin_url: formData.linkedin
            };

            const response = await fetch(`${backendUrl}/api/profiles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                toast('Profile saved successfully! ✓');
            } else {
                toast('Failed to save profile.');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast('Network error while saving profile.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="inner-page-body">
            <div className="inner-main centered-content">
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
                                style={{ overflow: 'hidden' }}
                            >
                                {userAccount.profilePicture ? (
                                    <img
                                        src={userAccount.profilePicture}
                                        alt="Avatar"
                                        referrerPolicy="no-referrer"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    getInitials(userAccount.name)
                                )}
                            </motion.div>
                            <div className="profile-info">
                                <h2>{userAccount.name || 'Your Profile'}</h2>
                                <p>{userAccount.email}</p>
                            </div>
                            <button type="submit" className="save-profile-btn btn-gold" disabled={isLoading}>
                                {isLoading ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                        <div className="form-grid">
                            <div className="form-group"><label>Full Name</label><input type="text" {...register('fullName')} /></div>
                            <div className="form-group"><label>University</label><input type="text" {...register('university')} /></div>
                            <div className="form-group"><label>CGPA</label><input type="text" {...register('cgpa')} placeholder="e.g. 8.5" /></div>
                            <div className="form-group"><label>Graduation Year</label><input type="number" {...register('gradYear')} placeholder="2025" /></div>
                            <div className="form-group"><label>Phone / WhatsApp</label><input type="text" {...register('phone')} /></div>
                            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <input type="checkbox" id="isRemote" {...register('isRemote')} />
                                <label htmlFor="isRemote" style={{ margin: 0 }}>Remote Work Preferred</label>
                            </div>
                            <div className="form-group full"><label>Target Role</label><input type="text" {...register('targetRole')} /></div>
                            <div className="form-group full"><label>Preferred Location</label><input type="text" {...register('preferredLocation')} /></div>
                            <div className="form-group full">
                                <label>Skills</label>
                                <div className="skills-tags">
                                    {skills.map((s, i) => (
                                        <div key={i} className="skill-tag" style={{ background: '#e8d48b', color: '#000', padding: '6px 15px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                            {String(s)}
                                            <span onClick={() => removeSkill(i)} style={{ background: 'rgba(0,0,0,0.1)', width: '18px', height: '18px', borderRadius: '50%', textAlign: 'center', fontSize: '10px', cursor: 'pointer' }}>✕</span>
                                        </div>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    className="skill-input"
                                    placeholder="Type a skill and press Enter"
                                    onKeyDown={addSkill}
                                />
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
