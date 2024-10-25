import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const SubscriptionPerformanceChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Subscription Performance',
        data: [15000, 16000, 12500, 20000, 26000, 29000, 23000, 25550, 0, 0, 0, 0],
        fill: true, // Fill the area under the line
        backgroundColor: 'rgba(54, 162, 235, 1)', // Light blue fill
        borderColor: 'rgba(54, 162, 235, 1)', // Line color
        pointBorderColor: 'rgba(54, 162, 235, 1)',
        pointBackgroundColor: '#fff',
        pointHoverBackgroundColor: 'rgba(54, 162, 235, 1)',
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.4, // Curves the line
        pointRadius: 5, // Point size
        pointHoverRadius: 7, // Hover size
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw}`; // Display raw value on tooltip
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          borderDash: [5, 5], // Dotted grid lines
        },
      },
      y: {
        min: 0,
        max: 30000,
        ticks: {
          stepSize: 7500,
        },
        grid: {
          display: true,
          borderDash: [5, 5],
        },
      },
    },
    elements: {
      point: {
        pointStyle: 'circle', // Circular points
      },
    },
  };

  return (
    <div className='h-[80vh] w-full mt-8'>
      <Line data={data} options={options}/>
    </div>
  );
};

export default SubscriptionPerformanceChart;
