import React from 'react';
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/X';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function StatsDialog({ open, handleClose, played, win_percent, currentStreak, bestStreak, scoreDistribution }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scores = [];
  for (var key in scoreDistribution) {
    scores.push(scoreDistribution[key]);
  }

  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [{
      data: scores,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
      borderWidth: 1,
    }],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { display: false },
      y: { display: true, grid: { display: false } },
    },
    plugins: {
      title: {
        display: true,
        text: 'Points Distribution',
        font: { size: 16, weight: 'bold' },
        color: theme.palette.text.primary,
      },
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: theme.palette.text.primary,
        font: { weight: 'bold' },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const handleShare = (platform) => {
    const text = `Check out my stats on SubtleSolve:\n\nPlayed: ${played}\nWin %: ${win_percent}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}\n\nTry to beat my score!`;
    const url = "https://www.subtlesolve.org";

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (navigator.share) {
      navigator.share({
        title: 'SubtleSolve Stats',
        text: text,
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. Copy the text manually:\n\n' + text + '\n' + url);
    }
  };

  const StatItem = ({ value, label }) => (
    <Box sx={{ flex: '1 1 25%', textAlign: 'center', p: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{value}</Typography>
      <Typography variant="body2" color="text.secondary">{label}</Typography>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{ 
        style: { 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        } 
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>SubtleSolve Stats</Typography>
        
        <Card elevation={3} sx={{ width: '100%', mb: 2, backgroundColor: theme.palette.background.default }}>
          <CardContent sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'nowrap', overflow: 'auto', padding: 1 }}>
            <StatItem value={played} label="Played" sx={{ flexShrink: 1, minWidth: 'auto', padding: 1 }} />
            <StatItem value={win_percent} label="Win %" sx={{ flexShrink: 1, minWidth: 'auto', padding: 1 }} />
            <StatItem value={currentStreak} label="Current Streak" sx={{ flexShrink: 1, minWidth: 'auto', padding: 1 }} />
            <StatItem value={bestStreak} label="Max Streak" sx={{ flexShrink: 1, minWidth: 'auto', padding: 1 }} />
          </CardContent>
        </Card>

        
        <Card elevation={3} sx={{ width: '100%', height: 300, mb: 2, backgroundColor: theme.palette.background.default }}>
          <CardContent>
            <Bar data={chartData} options={options} />
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
          <Button 
            variant="contained" 
            onClick={() => handleShare('web')} 
            startIcon={<ShareIcon />}
            fullWidth={isMobile}
          >
            Share
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleShare('twitter')} 
            startIcon={<TwitterIcon />}
            fullWidth={isMobile}
            sx={{ backgroundColor: '#1DA1F2', '&:hover': { backgroundColor: '#1a91da' } }}
          >
            Share on X
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
