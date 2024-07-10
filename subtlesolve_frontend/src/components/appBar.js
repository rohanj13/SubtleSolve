import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import { useKeycloak } from '@react-keycloak/web';
import Avatar from '@mui/material/Avatar';
import InstructionsDialog from './InstructionDialog';
import StatsDialog from './StatsDialog';

export default function ButtonAppBar() {
  const { keycloak } = useKeycloak();
  const [openStats, setOpenStats] = React.useState(false);
  const [name, setName] = React.useState("");
  const [statsData, setStatsData] = React.useState({});
  const [openInstructions, setOpenInstructions] = React.useState(false);

  React.useEffect(() => {
    if (!!keycloak.authenticated && keycloak.tokenParsed) {
      const fullname = keycloak.tokenParsed.name || "Unknown User";
      setName(fullname);
    }
  }, [keycloak.authenticated, keycloak.tokenParsed]);

  const handleStatsClick = async () => {
    if (!keycloak.authenticated) {
      setOpenStats(true);
      // alert('Please Log in to see and record your stats');
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

  const handleOpenInstructions = () => {
    setOpenInstructions(true);
  };

  const handleCloseInstructions = () => {
    setOpenInstructions(false);
  };

  const handleCloseStats = () => {
    setOpenStats(false);
  };

  function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '100%' }}>
      <AppBar position="static" sx={{ flexGrow: 1, backgroundColor: 'black', maxWidth: '100%' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <IconButton color="inherit" aria-label="Stats" sx={{ marginLeft: -2 }} onClick={handleStatsClick}>
              <BarChartIcon />
            </IconButton>
            <IconButton color="inherit" aria-label="How to Play" onClick={handleOpenInstructions}>
              <InfoIcon />
            </IconButton>
            <InstructionsDialog open={openInstructions} handleClose={handleCloseInstructions} />
          </div>
          <Typography variant="h5" component="div" sx={{ display: 'flex', textAlign: 'center' }}>
            SubtleSolve
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {!keycloak.authenticated && (
              <Button color="inherit" sx={{ display: 'flex', marginRight: -2 }} onClick={() => keycloak.login()}>Login</Button>
            )}
            {!!keycloak.authenticated && (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button color="inherit" sx={{ display: 'flex', marginRight: 2 }} onClick={() => keycloak.logout()}>Logout</Button>
                <Avatar {...stringAvatar(name)} />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <StatsDialog open={openStats} handleClose={handleCloseStats} played={statsData.played} win_percent={statsData.win_percent} currentStreak={statsData.currentStreak} bestStreak={statsData.bestStreak} scoreDistribution={statsData.scoreDistribution} />
    </Box>
  );
}
