import React from 'react';
import { Container, Grid  } from '@mui/material'
import Game from './Game';

const GamesLayout = ({ darkMode, games }) => {
  return (
    <Container maxWidth='false'>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        {games?.map((game) => (
          <Grid item key={game._id} xs={12} sm={6} md={4} lg={3}>
            <Game item key={game._id} darkMode={darkMode} game={game} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};

export default GamesLayout;
