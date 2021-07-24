import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function RowTitle(): JSX.Element {
  const classes = useStyles();

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
