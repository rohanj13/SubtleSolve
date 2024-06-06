// components/WelcomeScreen.js
import React from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useKeycloak } from '@react-keycloak/web';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const { keycloak, initialized } = useKeycloak();
  const navigate = useNavigate();

  const handleLogin = () => {
    keycloak.login();
  };

  const handlePlay = () => {
    navigate('/app');
  };

  console.log('Keycloak initialized:', initialized);
  console.log('Keycloak authenticated:', keycloak.authenticated);


  if (!initialized) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary'
      }}
    >
      <Typography variant="h2" component="div" sx={{ mb: 4, fontWeight: 'bold' }}>
        SubtleSolve
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2, width: '200px', height: '60px', borderRadius: '30px' }}
        onClick={handlePlay}
      >
        Play
      </Button>
      <div>
        {!keycloak.authenticated ? (
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: '200px', height: '60px', borderRadius: '30px', borderColor: '#1976d2', color: '#1976d2' }}
            onClick={handleLogin}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: '200px', height: '60px', borderRadius: '30px', borderColor: '#1976d2', color: '#1976d2' }}
            onClick={() => keycloak.logout()}
          >
            Logout ({keycloak.tokenParsed?.given_name || 'User'})
          </Button>
        )}
      </div>
    </Box>
  );
};

export default WelcomeScreen;
