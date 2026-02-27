import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 40,
        scale: 0.96
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 0.98
    }
};

const pageTransition = {
    type: 'tween',
    ease: [0.34, 1.56, 0.64, 1], // ease-out-back for a slight spring feel
    duration: 0.5
};

export default function PageTransition({ children, className }) {
    return (
        <motion.div
            className={className}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {children}
        </motion.div>
    );
}
