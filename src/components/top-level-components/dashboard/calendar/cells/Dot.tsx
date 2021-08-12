import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    dots: {
      position: 'absolute',
      bottom: 8,
    },
    dot: {
      height: 4,
      width: 4,
      margin: '0 2px',
      borderRadius: '50%',
      backgroundColor: 'red',
    },
  })
);

export default function Dot(props: DotProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12}
      container
      justify={'center'}
      alignItems={'center'}
      className={classes.dots}
    >
      <Grid item className={classes.dot} />
      <Grid item className={classes.dot} />
      <Grid item className={classes.dot} />
    </Grid>
  );
}

export interface DotProps {
  DELETE_ME?: undefined;
}
