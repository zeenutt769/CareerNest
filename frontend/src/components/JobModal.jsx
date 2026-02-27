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
                        {job.tags.map(t => <span key={t} className="m-tag">{t}</span>)}
                    </div>
                    <div className="m-sec">
                        <h3>About the Role</h3>
                        <p>{job.desc}</p>
                    </div>
                    <div className="m-sec">
                        <h3>Requirements</h3>
                        <ul>{job.req.map(r => <li key={r}>{r}</li>)}</ul>
                    </div>
                    <div className="m-sec">
                        <h3>Compensation</h3>
                        <p>{job.salary} &nbsp;•&nbsp; Health insurance, learning budget & flexible PTO</p>
                    </div>
                    <button className="apply-btn" onClick={() => { toast(`Applied to ${job.title} at ${job.company}! ✓`); onClose(); }}>
                        Apply Now →
                    </button>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
