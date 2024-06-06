import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%'}}>
      <Box sx={{ width: '90%', mr: 1, alignItems: 'center', maxWidth: '100%' }}>
        <LinearProgress variant="determinate" {...props} color='inherit' />
      </Box>
      <Box sx={{ maxWidth: '50%' }}>
        <Typography variant="body2" color="inherit"  >{
            6 - ((6 / 100) * props.value)
        }/6</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({remainingGuesses}) {
//   const [progress, setProgress] = React.useState(0);
//   setProgress(remainingGuesses);
//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => (prevProgress >= 6 ? 0 : prevProgress + 1));
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);
const progress = (6 - remainingGuesses) * (100 / 6);

  return (
    <Box sx={{ maxWidth: '100%', marginInline: 2, alignContent: 'center'}}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}