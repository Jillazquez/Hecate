import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';
import { ChartData, ChartOptions } from 'chart.js';

const socket = io('http://localhost:3000');

const Grafico: React.FC = () => {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const handleUpdateData = (newData: number) => {
      setData((prevData) => [...prevData, newData]);
    };

    socket.on('updateData', handleUpdateData);

    return () => {
      socket.off('updateData', handleUpdateData);
    };
  }, []);

  const chartData: ChartData<'line'> = {
    labels: data.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Datos en Tiempo Real',
        data: data,
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'linear', // Cambiar a escala lineal
        title: {
          display: true,
          text: 'Tiempo',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Grafico;
