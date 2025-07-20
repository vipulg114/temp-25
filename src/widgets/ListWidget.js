import React, { useEffect, useState } from "react";

export default function ListWidget({ items, title = "Results" }) {
    const [visibleCount, setVisibleCount] = useState(0);

    useEffect(() => {
        if (visibleCount < items.length) {
            const timer = setTimeout(() => {
                setVisibleCount(visibleCount + 1);
            }, 250); // Adjust speed here
            return () => clearTimeout(timer);
        }
    }, [visibleCount, items.length]);

    return (
        <div style={{ padding: "8px" }}>
            <h4 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "14px" }}>
                📊 {title}
            </h4>
            <ul style={{
                margin: 0,
                paddingLeft: "16px",
                fontSize: "13px",
                lineHeight: "1.4"
            }}>
                {items.slice(0, visibleCount).map((item, idx) => (
                    <li
                        key={idx}
                        style={{
                            marginBottom: "4px",
                            opacity: 0,
                            animation: "fadeInUp 0.5s forwards",
                            animationDelay: `${idx * 0.25}s`
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>
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
