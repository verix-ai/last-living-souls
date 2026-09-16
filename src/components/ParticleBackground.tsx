import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    opacity: number;
    color: string;
    pulseSpeed: number;
    pulsePhase: number;
}

const PARTICLE_COLORS = [
    'rgba(191, 67, 150,',   // magenta
    'rgba(97, 31, 125,',    // purple
    'rgba(6, 23, 126,',     // blue
    'rgba(232, 139, 120,',  // peach
    'rgba(255, 255, 255,',  // white
];

const PARTICLE_COUNT = 65;

const ParticleBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const createParticle = (startAtRandom = true): Particle => {
            return {
                x: Math.random() * (canvas?.width || window.innerWidth),
                y: startAtRandom
                    ? Math.random() * (canvas?.height || window.innerHeight)
                    : (canvas?.height || window.innerHeight) + 10,
                size: Math.random() * 2.5 + 0.5,
                speedY: -(Math.random() * 0.3 + 0.1),
                speedX: (Math.random() - 0.5) * 0.15,
                opacity: Math.random() * 0.35 + 0.05,
                color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
                pulseSpeed: Math.random() * 0.02 + 0.005,
                pulsePhase: Math.random() * Math.PI * 2,
            };
        };

        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particlesRef.current.push(createParticle(true));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p, i) => {
                // Update position
                p.y += p.speedY;
                p.x += p.speedX;

                // Pulse opacity
                p.pulsePhase += p.pulseSpeed;
                const pulseFactor = Math.sin(p.pulsePhase) * 0.3 + 0.7;
                const currentOpacity = p.opacity * pulseFactor;

                // Reset particle if it goes off screen
                if (p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
                    particlesRef.current[i] = createParticle(false);
                    particlesRef.current[i].y = canvas.height + 10;
                    return;
                }

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color} ${currentOpacity})`;
                ctx.fill();

                // Draw soft glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color} ${currentOpacity * 0.08})`;
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        resize();
        initParticles();
        animate();

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationRef.current);
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
                pointerEvents: 'none',
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;
