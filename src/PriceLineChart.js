import React from 'react';
import { Line } from 'react-chartjs-2';

function PriceLineChart(props) {
    const data = {
        labels: props.labels, // These are the x-axis labels, like dates
        datasets: [
            {
                label: 'Price',
                data: props.data, // These are the y-axis data points, like price values
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            <Line data={data} />
        </div>
    );
}

export default PriceLineChart;
