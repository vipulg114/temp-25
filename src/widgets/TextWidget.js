import React, { useEffect, useState } from 'react';

export default function TextWidget({ text }) {
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => {
        if (visibleChars < text.length) {
            const timer = setTimeout(() => {
                setVisibleChars(visibleChars + 2); // Speed: 2 chars per tick
            }, 18); // Adjust speed here
            return () => clearTimeout(timer);
        }
    }, [visibleChars, text.length, text]);

    return (
        <div
            style={{
                padding: "8px",
                whiteSpace: "pre-wrap",
                fontSize: "13px",
                lineHeight: "1.5",
                color: "#333",
                minHeight: "32px",
                opacity: visibleChars ? 1 : 0,
                animation: visibleChars ? "fadeInUp 0.5s forwards" : "none"
            }}
        >
            {text.slice(0, visibleChars)}
            <span style={{ opacity: 0.5 }}>
                {visibleChars < text.length ? "|" : ""}
            </span>
            <style>
                {`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>
        </div>
    );
}
