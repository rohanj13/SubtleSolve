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
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import html2canvas from 'html2canvas';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);

export default function StatsDialog({ open, handleClose, played, win_percent, currentStreak, bestStreak, scoreDistribution }) {
  const dialogRef = useRef(null);

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
    html2canvas(dialogRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const text = `Check out my stats on SubtleSolve:\n\nPlayed: ${played}\nWin %: ${win_percent}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}\n\nTry to beat my score!`;
      const url = window.location.href;

      if (platform === 'x') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&media=${encodeURIComponent(imgData)}`, '_blank');
      } else if (platform === 'instagram') {
        window.open(`https://www.instagram.com/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}&media=${encodeURIComponent(imgData)}`, '_blank');
      } else {
        if (navigator.share) {
          navigator.share({
            title: 'SubtleSolve Stats',
            text: text,
            url: url,
            files: [imgData],
          }).then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
          alert('Web Share API is not supported in your browser. Copy the text manually:\n\n' + text + '\n' + url);
        }
      }
    });
  };

  const commonCardStyles = { width: '100%', backgroundColor: '#1a1a1b', color: '#fff' };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ style: { backgroundColor: '#1a1a1b', color: '#fff', width: '90%', maxWidth: 'none' } }}>
      <DialogContent ref={dialogRef} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 4 }}>
        <Typography variant="h2" sx={{ marginBottom: 2, fontWeight: 'bold', fontFamily: 'sans-serif', fontSize: { xs: '1.5rem', md: '2rem' } }}>SubtleSolve</Typography>
        <Card sx={{ ...commonCardStyles, marginBottom: 2 }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', padding: '16px 0', flexWrap: 'wrap' }}>
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
        <Card sx={{ ...commonCardStyles, height: 400, width: '100%' }}>
          <CardContent sx={{ height: '100%' }}>
            <Bar data={chartData} options={options} />
          </CardContent>
        </Card>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
          <Button variant="contained" color="success" onClick={() => handleShare('web')} sx={{ backgroundColor: 'white', color: 'black', flexGrow: 1, margin: '0 8px' }}>
            <ShareIcon sx={{ marginRight: 1 }} />
            Share
          </Button>
          <Button variant="contained" color="success" onClick={() => handleShare('x')} sx={{ backgroundColor: '#1DA1F2', color: 'white', flexGrow: 1, margin: '0 8px' }}>
            <TwitterIcon sx={{ marginRight: 1 }} />
            Share on X
          </Button>
          <Button variant="contained" color="success" onClick={() => handleShare('instagram')} sx={{ backgroundColor: '#C13584', color: 'white', flexGrow: 1, margin: '0 8px' }}>
            <InstagramIcon sx={{ marginRight: 1 }} />
            Share on Instagram
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
