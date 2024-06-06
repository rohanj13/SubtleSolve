import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Types from './categoryTitle';
import AnswerField from './answerField';
import ListDividers from './clueList';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { PuzzleService } from '../services/PuzzleService';
import { useKeycloak } from '@react-keycloak/web';
import StatsDialogAnswer from './StatsDialogAnswer';
import StatsDialog from './StatsDialog';

export default function ScreenLayout() {
  const pluralize = require('pluralize');
  const { keycloak, initialized } = useKeycloak();
  const [data, setData] = useState(null);
  const [submits, setSubmits] = useState([]);
  const [openStatsAnswer, setOpenStatsAnswer] = useState(false);
  const [statsData, setStatsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  
  useEffect(() => {
    const fetchDailyPuzzle = async () => {
      try {
        
        const result = await PuzzleService.Getdailypuzzle();
        // console.log(result);
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyPuzzle();
  }, []);


  useEffect(() => {
    if (initialized && keycloak.authenticated && data && data.dailyGameId) {
      const fetchGameHistory = async () => {
        try {
          const response = await PuzzleService.getGameHistory(data.dailyGameId, keycloak.token);
          const guessList = response.data;
          setSubmits(guessList);

          if (guessList.length === 6 || guessList.includes(data.answer)) {
            
            const statResponse = await PuzzleService.getStats(keycloak.token);
            console.log(statResponse);
            setStatsData(statResponse.data);
            setOpenStatsAnswer(true);
          }
        } catch (error) {
          console.error('Error fetching game history:', error);
        }
      };

      fetchGameHistory();
    }
  }, [initialized, keycloak, data]);

  const onSubmit = (guessList) => {
    setSubmits(guessList);

    // if (guessList.length === 6 || guessList.includes(data.answer)) {
    //   const response = await PuzzleService.getStats(keycloak.token);
    //   setStatsData(response.data);
    //   setOpenStatsAnswer(true);
    // }
  };

  const handleCloseStatsAnswer = () => {
    setOpenStatsAnswer(false);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column'
        }}
      >
        <CircularProgress />
        <h4>Getting your puzzle for today...</h4>
      </Box>
    );
  }

  if (error || !data || !data.category) {
    return <Alert severity="error">Error reading JSON</Alert>;
  }

  return (
    <div style={{ marginTop: '100px' }}>
      <Types category={data.category} />
      <AnswerField
        category={pluralize.singular(data.category)}
        answer={data.answer}
        onSubmit={onSubmit}
        gameID={data.dailyGameId}
        guessList={submits}
      />
      <ListDividers clueList={data.clues} guessList={submits} answer={data.answer} />
      <StatsDialog open={openStatsAnswer} handleClose={handleCloseStatsAnswer} played={statsData.played} win_percent={statsData.win_percent} currentStreak={statsData.currentStreak} bestStreak={statsData.bestStreak} scoreDistribution={statsData.scoreDistribution} />
    </div>
  );
}