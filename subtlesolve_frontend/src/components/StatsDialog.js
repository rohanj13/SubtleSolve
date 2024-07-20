import React, { useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';

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
        text: 'Points Distribution',
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
    responsive: true
  };

  const handleShare = (platform) => {
    const text = `Check out my stats on SubtleSolve:\n\nPlayed: ${played}\nWin %: ${win_percent}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}\n\nTry to beat my score!`;
    const url = "https://www.subtlesolve.org";

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
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
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#1a1a1b', color: '#fff', width: '80%', maxWidth: 'none' } }}>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'sans-serif' }}>SubtleSolve</Typography>
        <Card sx={{ ...commonCardStyles, marginBottom: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '5px 0', flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 25%', textAlign: 'center', padding: '2px' }}>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{played}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#878a8c' }}>Played</Typography>
            </Box>
            <Box sx={{ flex: '1 1 25%', textAlign: 'center', padding: '2px' }}>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{win_percent}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#878a8c' }}>Win %</Typography>
            </Box>
            <Box sx={{ flex: '1 1 25%', textAlign: 'center', padding: '2px' }}>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currentStreak}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#878a8c' }}>Current Streak</Typography>
            </Box>
            <Box sx={{ flex: '1 1 25%', textAlign: 'center', padding: '2px' }}>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{bestStreak}</Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', color: '#878a8c' }}>Max Streak</Typography>
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ ...commonCardStyles, height: 'auto', width: '100%' }}>
          <CardContent sx={{ height: 'auto' }}>
            <Bar data={chartData} options={options} />
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1, flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => handleShare('web')} sx={{ margin: 1, backgroundColor: 'white', color: 'black', flex: '1 1 1' }}>
            <ShareIcon /> SHARE
          </Button>
          <Button variant="contained" onClick={() => handleShare('twitter')} sx={{ margin: 1, backgroundColor: 'black', color: 'white', flex: '1 1 1' }}>
            <TwitterIcon /> SHARE ON X
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}