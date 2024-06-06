import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Chart } from "react-chartjs-2";
import Button from '@mui/material/Button';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

export default function StatsDialogAnswer({ open, handleClose, data }) {
  const { score, currentStreak, bestStreak, scoreDistribution } = data;

  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        data: scoreDistribution,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { display: false },
      y: { display: true }
    },
    plugins: {
      title: {
        display: true,
        text: 'Score Distribution',
        font: { size: 16, weight: 'bold' },
      },
      legend: { display: false }
    }
  };

  const handleShare = () => {
    // Implement share functionality
    alert('Sharing your stats!');
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
          <CardContent>
            <div>Score: {score}</div>
            <div>Current Streak: {currentStreak}</div>
            <div>Best Streak: {bestStreak}</div>
          </CardContent>
        </Card>
        <Card sx={{ display: 'flex' }}>
          <CardContent>
            <Chart type="bar" data={chartData} options={options} />
          </CardContent>
        </Card>
        <Button variant="contained" color="primary" onClick={handleShare} sx={{ marginTop: 2 }}>
          Share
        </Button>
      </DialogContent>
    </Dialog>
  );
}
