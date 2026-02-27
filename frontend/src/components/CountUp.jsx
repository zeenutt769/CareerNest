import React, { useEffect, useState } from 'react';

export default function CountUp({ end, duration = 2, prefix = '', suffix = '' }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        let animationFrame;

        // Parse numeric value, removing non-digits
        const target = parseFloat(end.toString().replace(/[^0-9.]/g, '')) || 0;
        if (target === 0) return;

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / (duration * 1000);

            if (progress < 1) {
                const currentCount = target * easeOutQuart(progress);
                setCount(Math.round(currentCount));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(Math.round(target));
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <span>
            {prefix}
            {count}
            {suffix}
        </span>
    );
}
