import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function InstructionsDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Welcome to Subtle Solve!</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Every day you will be presented with a random category that is displayed on the screen. 
          You will have 6 attempts to guess the word in the category. For example, if the category 
          is Rivers the word to guess could be Nile.
        </Typography>
        <Typography variant="body1" paragraph>
          Each guess will reveal a clue about the answer. The first guess is without any clues and is 
          the hardest. This will receive 5 points. Each attempt you make will reduce your points by 1. 
          If you are unable to guess the word, you will receive 0 points. Finally, make sure to login to track your stats!
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Play Now!
        </Button>
      </DialogActions>
    </Dialog>
  );
}
