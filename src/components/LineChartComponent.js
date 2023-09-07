import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChartComponent = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [
            {
                label: 'Crypto Prices',
                data: [12, 19, 3, 5, 2],
                borderColor: ['rgba(75, 192, 192, 1)'],
                borderWidth: 1,
                fill: false,
            },
        ],
    };

    return <Line data={data} />;
};

export default LineChartComponent;
