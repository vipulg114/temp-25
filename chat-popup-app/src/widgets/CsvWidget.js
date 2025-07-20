// filepath: /Users/vipulgupta/Documents/chat-app/chat-popup-app/src/widgets/CsvWidget.js
import React from 'react';

export default function CsvWidget({ rows, filename }) {
    return (
        <div style={{ padding: "8px" }}>
            <h4 style={{ margin: "0 0 8px 0", color: "#333", fontSize: "14px" }}>
                📊 {filename}
            </h4>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        {rows[0].map((header, index) => (
                            <th key={index} style={{ border: "1px solid #ccc", padding: "4px", textAlign: "left" }}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.slice(1).map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} style={{ border: "1px solid #ccc", padding: "4px" }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}