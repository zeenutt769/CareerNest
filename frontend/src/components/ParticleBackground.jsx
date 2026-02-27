import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let frameCount = 0;

        let particles = [];
        const mouse = {
            x: null,
            y: null,
            radius: 180,
            vx: 0,
            vy: 0,
            lastX: null,
            lastY: null,
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', resizeCanvas);

        const onMouseMove = (event) => {
            mouse.vx = mouse.lastX !== null ? (event.clientX - mouse.lastX) * 0.3 : 0;
            mouse.vy = mouse.lastY !== null ? (event.clientY - mouse.lastY) * 0.3 : 0;
            mouse.lastX = event.clientX;
            mouse.lastY = event.clientY;
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Two particle layers: foreground (layer 1) and background (layer 0)
        class Particle {
            constructor(x, y, dirX, dirY, size, baseOpacity, layer) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.directionX = dirX;
                this.directionY = dirY;
                this.size = size;
                this.baseSize = size;
                this.baseOpacity = baseOpacity;
                this.opacity = baseOpacity;
                this.layer = layer; // 0 = bg, 1 = fg
                this.density = (Math.random() * 25) + 2;
                // Sparkle state
                this.sparkleTimer = Math.random() * 300;
                this.sparkleInterval = 180 + Math.random() * 400;
                this.sparkling = false;
                this.sparkleProgress = 0;
                // Phase offset for breathing
                this.phase = Math.random() * Math.PI * 2;
                // Color: gold or white
                this.isGold = Math.random() > 0.45;
            }

            draw() {
                const r = this.isGold ? 232 : 255;
                const g = this.isGold ? 212 : 255;
                const b = this.isGold ? 139 : 255;

                // Glow for foreground sparkle
                if (this.layer === 1 && this.sparkling) {
                    const glowRadius = this.size * (2 + this.sparkleProgress * 3);
                    const grd = ctx.createRadialGradient(
                        this.x, this.y, 0,
                        this.x, this.y, glowRadius
                    );
                    grd.addColorStop(0, `rgba(${r},${g},${b},${this.opacity * 0.6})`);
                    grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
                    ctx.fillStyle = grd;
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r},${g},${b},${this.opacity})`;
                ctx.fill();
            }

            update(frame) {
                // Breathing size & opacity
                const breathe = Math.sin(frame * 0.012 + this.phase);
                this.size = this.baseSize + breathe * this.baseSize * 0.25;
                this.opacity = this.baseOpacity + breathe * this.baseOpacity * 0.18;

                // Sparkle cycle
                this.sparkleTimer++;
                if (!this.sparkling && this.sparkleTimer > this.sparkleInterval && this.layer === 1) {
                    this.sparkling = true;
                    this.sparkleProgress = 0;
                    this.sparkleTimer = 0;
                    this.sparkleInterval = 200 + Math.random() * 500;
                }
                if (this.sparkling) {
                    this.sparkleProgress += 0.04;
                    // Arc: ramp up then down
                    const arc = Math.sin(this.sparkleProgress * Math.PI);
                    this.opacity = this.baseOpacity + arc * 0.6;
                    this.size = this.baseSize + arc * this.baseSize * 1.5;
                    if (this.sparkleProgress >= 1) {
                        this.sparkling = false;
                        this.opacity = this.baseOpacity;
                        this.size = this.baseSize;
                    }
                }

                // Speed multiplier by layer (bg slower)
                const speedMul = this.layer === 0 ? 0.4 : 1;
                this.x += this.directionX * speedMul;
                this.y += this.directionY * speedMul;

                // Bounce off edges
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

                // Mouse interaction (only foreground)
                if (this.layer === 1 && mouse.x !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distSq = dx * dx + dy * dy;
                    const maxR = mouse.radius;

                    if (distSq < maxR * maxR) {
                        const dist = Math.sqrt(distSq);
                        const forceMag = ((maxR - dist) / maxR);
                        // Smooth ease out
                        const eased = forceMag * forceMag;
                        const fx = (dx / dist) * eased * this.density;
                        const fy = (dy / dist) * eased * this.density;
                        this.x -= fx * 0.8;
                        this.y -= fy * 0.8;
                        // Add mouse velocity influence
                        this.x -= mouse.vx * eased * 0.5;
                        this.y -= mouse.vy * eased * 0.5;
                    } else {
                        // Soft return to base position
                        const rx = this.x - this.baseX;
                        const ry = this.y - this.baseY;
                        this.x -= rx * 0.06;
                        this.y -= ry * 0.06;
                    }
                }
            }
        }

        const init = () => {
            particles = [];
            const area = canvas.height * canvas.width;

            // Background layer — fewer, smaller, dimmer
            const bgCount = Math.floor(area / 18000);
            for (let i = 0; i < bgCount; i++) {
                const size = Math.random() * 1.2 + 0.3;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const dx = (Math.random() - 0.5) * 0.3;
                const dy = (Math.random() - 0.5) * 0.3;
                const opacity = Math.random() * 0.2 + 0.05;
                particles.push(new Particle(x, y, dx, dy, size, opacity, 0));
            }

            // Foreground layer — more, varied, brighter
            const fgCount = Math.floor(area / 9000);
            for (let i = 0; i < fgCount; i++) {
                const size = Math.random() * 2 + 0.6;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const dx = (Math.random() - 0.5) * 0.55;
                const dy = (Math.random() - 0.5) * 0.55;
                const opacity = Math.random() * 0.45 + 0.1;
                particles.push(new Particle(x, y, dx, dy, size, opacity, 1));
            }
        };

        const connect = () => {
            // Only connect foreground particles for performance
            const fg = particles.filter(p => p.layer === 1);
            const threshSq = (canvas.width / 7) * (canvas.height / 7);

            for (let a = 0; a < fg.length; a++) {
                for (let b = a + 1; b < fg.length; b++) {
                    const dx = fg[a].x - fg[b].x;
                    const dy = fg[a].y - fg[b].y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < threshSq) {
                        // Smooth falloff using squared distance
                        const t = 1 - distSq / threshSq;
                        const opacity = t * t * 0.18;
                        ctx.strokeStyle = `rgba(232,212,139,${opacity})`;
                        ctx.lineWidth = 0.8;
                        ctx.beginPath();
                        ctx.moveTo(fg[a].x, fg[a].y);
                        ctx.lineTo(fg[b].x, fg[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            frameCount++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw bg layer first (dimmer, no connections)
            for (const p of particles) {
                if (p.layer === 0) {
                    p.update(frameCount);
                    p.draw();
                }
            }

            // Then connections
            connect();

            // Then fg particles on top
            for (const p of particles) {
                if (p.layer === 1) {
                    p.update(frameCount);
                    p.draw();
                }
            }
        };

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
                pointerEvents: 'none',
                background: 'transparent',
            }}
        />
    );
};

export default ParticleBackground;