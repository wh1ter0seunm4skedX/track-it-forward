import React from 'react';
import { Bar } from 'react-chartjs-2';

const Chart: React.FC<{ data: any }> = ({ data }) => {
    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <h2 className="text-lg font-bold mb-4">Financial Goals Overview</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Chart;