import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function ChartWidget({ data }) {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Latest Trend',
                data: data.values,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ padding: '8px' }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '14px' }}>
                📈 Latest Trend
            </h4>
            <Bar data={chartData} options={options} />
        </div>
    );
}