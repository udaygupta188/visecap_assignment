import React from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const chartComponents = {
  bar: Bar,
  line: Line,
  doughnut: Doughnut,
};

const ChartComponent = ({ type, chartData }) => {
  const ChartType = chartComponents[type] || Bar; // Default to Bar chart if type is not found

  return <ChartType data={chartData} />;
};

const MyChart = ({ type = 'bar', chartData }) => {
  return (
    <div>
      <ChartComponent type={type} chartData={chartData} />
    </div>
  );
};

export default MyChart;
