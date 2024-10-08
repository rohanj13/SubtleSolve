import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { PuzzleService } from '../services/PuzzleService';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import InstructionsDialog from './InstructionDialog';
import StatsDialog from './StatsDialog';

export default function ButtonAppBar() {
  const { keycloak } = useKeycloak();
  const [openStats, setOpenStats] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [name, setName] = useState("");
  const [statsData, setStatsData] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (keycloak.authenticated && keycloak.tokenParsed) {
      const fullname = keycloak.tokenParsed.name || "Unknown User";
      setName(fullname);
    }
  }, [keycloak.authenticated, keycloak.tokenParsed]);

  const handleStatsClick = async () => {
    if (!keycloak.authenticated) {
      alert('Please Log in to see and record your stats');
    } else {
      try {
        const response = await PuzzleService.getStats(keycloak.token);
        setStatsData(response.data);
        setOpenStats(true);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
  };

  const handleOpenInstructions = () => setOpenInstructions(true);
  const handleCloseInstructions = () => setOpenInstructions(false);
  const handleCloseStats = () => setOpenStats(false);

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  const stringAvatar = (name) => {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Stats">
            <IconButton color="inherit" onClick={handleStatsClick} size="large">
              <BarChartIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="How to Play">
            <IconButton color="inherit" onClick={handleOpenInstructions} size="large">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          SubtleSolve
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!keycloak.authenticated ? (
            <Button color="inherit" onClick={() => keycloak.login()}>
              {isMobile ? 'Log In' : 'Login'}
            </Button>
          ) : (
            <>
              <Button color="inherit" onClick={() => keycloak.logout()} sx={{ mr: 1 }}>
                {isMobile ? 'Log Out' : 'Logout'}
              </Button>
              <Tooltip title={name}>
                <Avatar {...stringAvatar(name)} />
              </Tooltip>
            </>
          )}
        </Box>
      </Toolbar>

      <InstructionsDialog open={openInstructions} handleClose={handleCloseInstructions} />
      <StatsDialog 
        open={openStats} 
        handleClose={handleCloseStats} 
        played={statsData.played}
        win_percent={statsData.win_percent}
        currentStreak={statsData.currentStreak}
        bestStreak={statsData.bestStreak}
        scoreDistribution={statsData.scoreDistribution}
      />
    </AppBar>
  );
}