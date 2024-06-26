import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearWithValueLabel from './progressBar';
import { useKeycloak } from '@react-keycloak/web';
import { PuzzleService } from '../services/PuzzleService';
import StatsDialog from './StatsDialog';

export default function AnswerField({ category, answer, onSubmit, gameID, guessList }) {
  const { keycloak, initialized } = useKeycloak();
  const [guess, setGuess] = React.useState('');
  const [score, setScore] = React.useState(6);
  const [openStatsAnswer, setOpenStatsAnswer] = React.useState(false);
  const remainingGuesses = Math.max(0, 6 - guessList.length);
  const [statsData, setStatsData] = React.useState({});

  React.useEffect(() => {
    setScore(6 - guessList.length);
  }, [guessList]);

  const handleSubmit = async () => {
    const newList = guessList.concat(guess);
    const tempScore = score - 1;
    setScore(tempScore);

    if (keycloak.authenticated && guess !== null) {
      try {
        if (newList.length === 1) {
          await PuzzleService.createGameplay(gameID, guess, keycloak.token);
        } else {
          await PuzzleService.updateGameplay(gameID, guess, keycloak.token);
        }

        if (guess === answer || newList.length === 6) {
          await PuzzleService.updateScore(gameID, tempScore, keycloak.token);
          const response = await PuzzleService.getStats(keycloak.token);
          setStatsData(response.data);
          setOpenStatsAnswer(true);
        }
      } catch (error) {
        console.error('Error updating gameplay:', error);
      }
    }

    onSubmit(newList);
    setGuess('');
  };

  const handleCloseStatsAnswer = () => {
    setOpenStatsAnswer(false);
  };

  const hasGuessedCorrectly = guessList.includes(answer);
  const hasExhaustedGuesses = guessList.length >= 6;

  return (
    <>
      <Stack direction="row" spacing={1} margin={2} sx={{ overflowX: 'auto', maxWidth: '100%', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {guessList.map((guessItem, index) => (
          <Chip
            key={index}
            label={guessItem}
            sx={{ margin: 5, borderRadius: '4px' }}
            color={guessItem === answer ? 'success' : 'error'}
          />
        ))}
      </Stack>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          maxWidth: '100%',
          justifyContent: 'center',
          '& .MuiTextField-root': { m: 2, width: '50%' },
          '& button': { m: 1 },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          disabled={hasExhaustedGuesses || hasGuessedCorrectly}
          id="standard-search"
          label={hasExhaustedGuesses || hasGuessedCorrectly ? "No more guesses available" : `Enter a ${category}`}
          type="search"
          variant="standard"
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="inherit"
          disabled={hasExhaustedGuesses || hasGuessedCorrectly}
        >
          Submit
        </Button>
      </Box>
      {hasExhaustedGuesses || hasGuessedCorrectly ? (
        <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginTop: 2 }}>
          The answer is: {answer}
        </Typography>
      ) : null}
      <LinearWithValueLabel remainingGuesses={remainingGuesses} />
      <StatsDialog open={openStatsAnswer} handleClose={handleCloseStatsAnswer} played={statsData.played} win_percent={statsData.win_percent} currentStreak={statsData.currentStreak} bestStreak={statsData.bestStreak} scoreDistribution={statsData.scoreDistribution} />
    </>
  );
}
