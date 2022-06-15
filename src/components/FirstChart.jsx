import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



export default function firstChart({datas,render}) {
  const noneChart = [0,0,0,0,0,0,0,0,0,0,0,0 ]
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  
  const labels = ['Jan', 'Fev', 'Mar', 'Abr','Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  const data = {
    labels,
    datasets: [
      
      {
        label: 'Preços',
        data: render ? datas.map(num => num) : noneChart,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  return <Line options={options} data={data} />;
}

