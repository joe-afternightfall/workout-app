import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function RowTitle(): JSX.Element {
  return (
    <Grid item xs={12} container>
      <Grid item xs={2}>
        <Typography>{'Set'}</Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography>{'lbs'}</Typography>
      </Grid>

      <Grid item xs={3}>
        <Typography>{'Reps'}</Typography>
      </Grid>

      <Grid item xs={4} container justify={'center'} spacing={2}>
        <Grid item>
          <Typography>{'Action'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
