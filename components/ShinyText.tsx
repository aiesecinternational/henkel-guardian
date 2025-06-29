import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '' }) => {
    const animationDuration = `${speed}s`;

    const shineStyle: React.CSSProperties = {
        backgroundImage: 'linear-gradient(120deg, rgba(201, 221, 138, 0.7) 0%, rgba(201, 221, 138, 0.7) 40%, rgba(212, 175, 55, 1) 50%, rgba(201, 221, 138, 0.7) 60%, rgba(201, 221, 138, 0.7) 100%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
    };

    return (
        <>
            <style>{`
                @keyframes shine {
                    0% { background-position: 100% 0; }
                    100% { background-position: -100% 0; }
                }
            `}</style>
            <div
                className={`inline-block ${className}`}
                style={shineStyle}
            >
                {text}
            </div>
        </>
    );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };