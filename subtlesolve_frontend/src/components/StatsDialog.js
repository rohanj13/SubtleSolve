import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Chart } from "react-chartjs-2";
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useState, useEffect } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);

export default function StatsDialog({ open, handleClose, played, win_percent, currentStreak, bestStreak, scoreDistribution }) {
  const scores = [];
  for (var key in scoreDistribution) {
    scores.push(scoreDistribution[key]);
  }

  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        data: scores,
        backgroundColor: 'white',
        borderColor: '#6aaa64',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { display: false },
      y: { display: true },
    },
    plugins: {
      title: {
        display: true,
        text: 'Guess Distribution',
        font: { size: 16, weight: 'bold' },
        color: '#fff'
      },
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#fff',
        font: { weight: 'bold' }
      },
    },
    maintainAspectRatio: false,
  };

  const handleShare = (platform) => {
    const text = `Check out my stats on SubtleSolve:\n\nPlayed: ${played}\nWin %: ${win_percent}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}\n\nTry to beat my score!`;
    const url = window.location.href;

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`, '_blank');
    } else {
      if (navigator.share) {
        navigator.share({
          title: 'SubtleSolve Stats',
          text: text,
          url: url,
        }).then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        alert('Web Share API is not supported in your browser. Copy the text manually:\n\n' + text + '\n' + url);
      }
    }
  };

  const commonCardStyles = { width: '100%', backgroundColor: '#1a1a1b', color: '#fff' };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#1a1a1b', color: '#fff', width: '90%', maxWidth: 'none' } }}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'sans-serif' }}>SubtleSolve</Typography>
        <Card sx={{ ...commonCardStyles, marginBottom: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '16px 0' }}>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{played}</Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', color: '#878a8c' }}>Played</Typography>
            </Box>
            <Box sx={{ borderLeft: '1px solid #3a3a3c', height: '100%' }}></Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{win_percent}</Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', color: '#878a8c' }}>Win %</Typography>
            </Box>
            <Box sx={{ borderLeft: '1px solid #3a3a3c', height: '100%' }}></Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentStreak}</Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', color: '#878a8c' }}>Current Streak</Typography>
            </Box>
            <Box sx={{ borderLeft: '1px solid #3a3a3c', height: '100%' }}></Box>
            <Box>
              <Typography variant="h6" sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{bestStreak}</Typography>
              <Typography variant="body2" sx={{ fontSize: '1rem', color: '#878a8c' }}>Max Streak</Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ ...commonCardStyles, height: 400 }}>
          <CardContent sx={{ height: '100%' }}>
            <Chart type="bar" data={chartData} options={options} />
          </CardContent>
        </Card>
        <Button variant="contained" color="success" onClick={() => handleShare('web')} sx={{ marginTop: 2, backgroundColor: 'white', color: 'black' }}>
          Share via Web
        </Button>
        <Button variant="contained" color="success" onClick={() => handleShare('twitter')} sx={{ marginTop: 2, backgroundColor: '#1DA1F2', color: 'white' }}>
          Share on Twitter
        </Button>
        <Button variant="contained" color="success" onClick={() => handleShare('facebook')} sx={{ marginTop: 2, backgroundColor: '#1877F2', color: 'white' }}>
          Share on Facebook
        </Button>
      </DialogContent>
    </Dialog>
  );
}
