import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Types({ category }) {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '70%',
        marginTop: 2
      }}
    >
      <Typography variant="h3" component="div">
        {category}
      </Typography>
    </Container>
  );
}
