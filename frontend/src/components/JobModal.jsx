import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './Toast';

export default function JobModal({ job, onClose }) {
    const toast = useToast();

    if (!job) return null;

    return (
        <AnimatePresence>
            <div className="modal-overlay show" onClick={onClose}>
                <motion.div
                    className="modal"
                    onClick={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                >
                    <button className="modal-close" onClick={onClose}>✕</button>
                    <h2>{job.title}</h2>
                    <div className="m-co">{job.company} &nbsp;•&nbsp; {job.location}</div>
                    <div className="m-tags">
                        {[job.job_type, job.work_mode].filter(t => t).map(t => <span key={t} className="m-tag">{t}</span>)}
                    </div>
                    <div className="m-sec">
                        <h3>About the Role</h3>
                        <p style={{ whiteSpace: 'pre-wrap' }}>{job.description || job.desc}</p>
                    </div>
                    {job.req && (
                        <div className="m-sec">
                            <h3>Requirements</h3>
                            <ul>{job.req.map(r => <li key={r}>{r}</li>)}</ul>
                        </div>
                    )}
                    <div className="m-sec">
                        <h3>Compensation</h3>
                        <p>{job.salary || (job.salary_min ? `₹${job.salary_min}${job.salary_max ? ' - ₹' + job.salary_max : ''}` : 'Competitive')} &nbsp;•&nbsp; Benefits included</p>
                    </div>
                    <button className="apply-btn" onClick={() => {
                        if (job.apply_link) window.open(job.apply_link, '_blank');
                        else toast(`Applied to ${job.title} at ${job.company}! ✓`);
                        onClose();
                    }}>
                        {job.apply_link ? 'Apply on Source →' : 'Quick Apply →'}
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
