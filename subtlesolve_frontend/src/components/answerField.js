import React, { useState, useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { PuzzleService } from '../services/PuzzleService';
import stringSimilarity from 'string-similarity';
import Confetti from 'react-confetti';
import {
  Box,
  TextField,
  Button,
  Chip,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  Fade,
} from '@mui/material';
import StatsDialog from './StatsDialog';

export default function AnswerField({ category, answer, onSubmit, gameID, guessList }) {
  const { keycloak, initialized } = useKeycloak();
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(6);
  const [openStatsAnswer, setOpenStatsAnswer] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [statsData, setStatsData] = useState({});

  const remainingGuesses = Math.max(0, 6 - guessList.length);

  useEffect(() => {
    setScore(6 - guessList.length);
  }, [guessList]);

  const normalizeString = (str) => {
    return str.toLowerCase().replace(/[\s\W_]+/g, '');
  };

  const checkAnswer = (userAnswer, correctAnswer) => {
    const normalizedUserAnswer = normalizeString(userAnswer);
    const normalizedCorrectAnswer = normalizeString(correctAnswer);
    return stringSimilarity.compareTwoStrings(normalizedUserAnswer, normalizedCorrectAnswer) >= 0.6;
  };

  const handleSubmit = async () => {
    if (!guess.trim()) return;

    const newList = [...guessList, guess];
    const tempScore = score - 1;
    setScore(tempScore);

    if (keycloak.authenticated) {
      try {
        if (newList.length === 1) {
          await PuzzleService.createGameplay(gameID, guess, keycloak.token);
        } else {
          await PuzzleService.updateGameplay(gameID, guess, keycloak.token);
        }

        if (checkAnswer(guess, answer) || newList.length === 6) {
          await PuzzleService.updateScore(gameID, tempScore, keycloak.token);
          const response = await PuzzleService.getStats(keycloak.token);
          setStatsData(response.data);
          setOpenStatsAnswer(true);

          if (checkAnswer(guess, answer)) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
          }
        }
      } catch (error) {
        console.error('Error updating gameplay:', error);
      }
    }

    onSubmit(newList);
    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCloseStatsAnswer = () => {
    setOpenStatsAnswer(false);
  };

  const hasGuessedCorrectly = guessList.some((guessItem) => checkAnswer(guessItem, answer));
  const hasExhaustedGuesses = guessList.length >= 6;

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, borderRadius: 2 }}>
      {showConfetti && <Confetti />}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
            {guessList.map((guessItem, index) => (
              <Chip
                key={index}
                label={guessItem}
                color={checkAnswer(guessItem, answer) ? 'success' : 'error'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={6}>
          <Box component="form" onKeyPress={handleKeyPress} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              disabled={hasExhaustedGuesses || hasGuessedCorrectly}
              label={hasExhaustedGuesses || hasGuessedCorrectly ? "No more guesses available" : `Enter a ${category}`}
              variant="outlined"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              sx={{ mr: 1 }}
            />
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={hasExhaustedGuesses || hasGuessedCorrectly}
            >
              Submit
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Remaining Guesses: {remainingGuesses}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={(remainingGuesses / 6) * 100}
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Fade in={hasExhaustedGuesses || hasGuessedCorrectly}>
            <Typography variant="h6" align="center" color="primary" sx={{ mt: 2 }}>
              The answer is: {answer}
            </Typography>
          </Fade>
        </Grid>
      </Grid>
      <StatsDialog 
        open={openStatsAnswer} 
        handleClose={handleCloseStatsAnswer} 
        played={statsData.played}
        win_percent={statsData.win_percent}
        currentStreak={statsData.currentStreak}
        bestStreak={statsData.bestStreak}
        scoreDistribution={statsData.scoreDistribution}
      />
    </Paper>
  );
}