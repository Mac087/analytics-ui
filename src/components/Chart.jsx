import React from 'react';
import { Scatter } from 'react-chartjs-2';

function ScatterChart(props) {
  const chartData = {
    // labels: props.dates,
    datasets: [
      {
        label: props.name,
        data: props.data,
        backgroundColor: 'rgba(225, 99, 132, 0.6)'
      }
    ]
  };
  return (
    <Scatter
      data={chartData}
      width={100}
      height={50}
      options={{
        maintainAspectRatio: false
      }}
    />
  );
}

export default ScatterChart;