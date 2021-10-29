import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      width: '100%',
    },
  })
);

export default function ExerciseListAppBar({
  closeClickHandler,
}: ExerciseListAppBarProps): JSX.Element {
  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      position={'sticky'}
      style={{ width: '100%' }}
      className={classes.appBar}
      color={'inherit'}
    >
      <Toolbar>
        <Grid container alignItems={'center'}>
          <Grid item xs={2} />

          <Grid item xs={8} container justify={'center'}>
            <Typography variant={'body1'} noWrap>
              {'Exercise List'}
            </Typography>
          </Grid>
          <Grid item xs={2} onClick={closeClickHandler}>
            <Typography variant={'body1'}>{'close'}</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface ExerciseListAppBarProps {
  closeClickHandler: () => void;
}
