import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CircularChart = ({ data }) => {
    const chartData = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                data: data,
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: ['#36A2EB', '#FF6384'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false, // Désactiver le maintien du ratio d'aspect
        responsive: true, // Activer la réactivité
        plugins: {
            legend: {
                position: 'bottom', // Position de la légende en bas
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default CircularChart;
