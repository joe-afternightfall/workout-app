import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    text: {
      color: '#686868',
    },
  })
);

export default function PerSideAdornment(
  props: PerSideAdornmentProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container style={{ width: 40 }}>
      <Grid item xs={12} container alignItems={'flex-end'}>
        <Typography variant={'caption'} className={classes.text}>
          {'reps'}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems={'flex-start'}
        style={{ marginTop: -8 }}
      >
        <Typography
          variant={'caption'}
          className={classes.text}
          style={{ fontSize: 18 }}
        >
          {'/'}
        </Typography>
        <Typography
          style={{ padding: '7px 0 0 2px' }}
          variant={'caption'}
          // color={'textSecondary'}
          className={classes.text}
        >
          {'side'}
        </Typography>
      </Grid>
    </Grid>
  );
}

export interface PerSideAdornmentProps {
  DELETE_ME?: undefined;
}
