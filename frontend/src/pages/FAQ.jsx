import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { faqs } from '../data/jobs';

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState(null);

    const toggleFAQ = (i) => setOpenIdx(openIdx === i ? null : i);

    return (
        <div className="inner-page-body">
            <div className="inner-main">
                <h1 className="page-title">Frequently <span>Asked Questions</span></h1>
                <p className="page-sub">Everything you need to know about CareerNest</p>
                <div style={{ maxWidth: 720 }}>
                    {faqs.map((f, i) => (
                        <motion.div key={i} className="faq-item"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}>
                            <div className="faq-q" onClick={() => toggleFAQ(i)}>
                                {f.q}
                                <span className="faq-arrow" style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none' }}>▾</span>
                            </div>
                            <div className={`faq-a ${openIdx === i ? 'open' : ''}`}>
                                {f.a}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
