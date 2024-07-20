import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import './clueList.css';


const style = {
  p: 0,
  width: '80%',
  borderRadius: 2,
  border: '2px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
  margin: 'auto',
};

// const fadeInTransition = {
//   transition: 'opacity 0.5s ease-in, visibility 0.5s ease-in',
//   opacity: 1,
//   visibility: 'visible',
// };

// const normalizeString = (str) => {
//   return str
//     .toLowerCase()
//     .replace(/[\s\W_]+/g, ''); // Remove spaces, punctuation, and special characters
// };

// const checkAnswer = (userAnswer, correctAnswer) => {
//   const normalizedUserAnswer = normalizeString(userAnswer);
//   const normalizedCorrectAnswer = normalizeString(correctAnswer);

//   const similarity = stringSimilarity.compareTwoStrings(normalizedUserAnswer, normalizedCorrectAnswer);
//   return similarity >= 0.6; // Adjust the threshold as needed
// };


export default function ListDividers({ clueList, guessList, answer }) {
  const [visibleClues, setVisibleClues] = useState([]);

  useEffect(() => {
    // Reveal clues based on the number of guesses
    if (guessList[guessList.length - 1] != answer) {
      const revealedClues = clueList.slice(0, guessList.length);
      setVisibleClues(revealedClues);
    }
  }, [guessList, clueList]);

  if (guessList.length === 0) {
    return (
      <div style={{ textAlign: 'center', justifyItems: 'normal', marginTop: 5 }}>
        <Typography variant="overline" sx={{ fontStyle: 'italic'}}>
          An incorrect guess will reveal a clue...
        </Typography>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <List sx={{ ...style, marginTop: 3 }} aria-label="mailbox folders">
          {visibleClues.map((clue, index) => (
            <React.Fragment key={index}>
              <ListItem className={index === visibleClues.length - 1 ? "last-clue" : "revealed-clue"}>
                <ListItemText primary={clue} />
              </ListItem>
              {index < visibleClues.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }
}
