import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);



export function SecondChart({datas, render}) {
    const noneChart = [0,0,0,0,0,0,0,0,0,0,0,0 ]

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Média de preços',
          },
        },
      };
      
      const labels = ['Jan', 'Fev', 'Mar', 'Abr','Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: render ? datas.map(num => num) : noneChart,
            backgroundColor: 'rgba(238, 182, 63, 0.726)',
          }
          
        ],
      };
  return <Bar options={options} data={data} />;
}
