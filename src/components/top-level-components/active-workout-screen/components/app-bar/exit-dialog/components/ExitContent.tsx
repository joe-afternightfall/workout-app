import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      fontWeight: 600,
    },
  })
);

export default function ExitContent(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12}>
        <Typography variant={'h5'} color={'primary'} className={classes.title}>
          {'Finish Workout?'}
        </Typography>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography>{'You did not complete all'}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography>{'the exercises.'}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
