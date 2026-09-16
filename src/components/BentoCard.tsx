import React, { useRef, useState } from 'react';
import './BentoCard.css';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
}

export const BentoCard: React.FC<BentoCardProps> = ({
    children,
    className = '',
    href,
    onClick
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({ x: rect.width / 2, y: rect.height / 2 });
        }
    };

    const getTiltTransform = () => {
        if (!isHovered || !cardRef.current) return 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((mousePosition.y - centerY) / centerY) * -5;
        const rotateY = ((mousePosition.x - centerX) / centerX) * 5;

        return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const Element: any = href ? 'a' : onClick ? 'button' : 'div';

    const elementProps = {
        className: `bento-card ${className}`,
        ref: cardRef as any,
        onMouseMove: handleMouseMove,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        style: {
            transform: getTiltTransform()
        },
        ...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}),
        ...(onClick ? { onClick } : {})
    };

    return (
        <Element {...elementProps}>
            {/* Neon RGB border effect */}
            <div className={`bento-card-border ${isHovered ? 'visible' : ''}`} />

            <div className="bento-card-content">
                {children}
            </div>
        </Element>
    );
};
