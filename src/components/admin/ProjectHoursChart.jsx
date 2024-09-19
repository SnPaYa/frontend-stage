import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const ProjectHoursChart = () => {
    // Dummy data for testing
    const dummyData = [
        { employeeName: 'John Doe', hours: 35 },
        { employeeName: 'Jane Smith', hours: 28 },
        { employeeName: 'Alice Johnson', hours: 42 },
        { employeeName: 'Bob Brown', hours: 30 },
        { employeeName: 'Charlie Davis', hours: 22 },
    ];

    const chartData = {
        labels: dummyData.map(item => item.employeeName),
        datasets: [
            {
                label: 'Hours Worked',
                data: dummyData.map(item => item.hours),
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
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ProjectHoursChart;