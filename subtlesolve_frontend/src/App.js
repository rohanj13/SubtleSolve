import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from './security/keycloak';
import WelcomeScreen from './components/welcomeScreen';
import ButtonAppBar from './components/appBar';
import ScreenLayout from './components/screenLayout';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#131052',
    },
  },
});

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/app" element={
              <>
                <ButtonAppBar />
                <ScreenLayout />
              </>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
