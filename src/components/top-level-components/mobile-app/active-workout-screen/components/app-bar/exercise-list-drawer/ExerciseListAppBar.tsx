import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import React, { useState } from 'react';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      width: '100%',
    },
  })
);

export default function ExerciseListAppBar({
  selectedSegment,
  closeClickHandler,
  goBackClickHandler,
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
          <Grid item xs={2}>
            {selectedSegment && (
              <IconButton onClick={goBackClickHandler}>
                <ArrowBack />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={8} container justify={'center'}>
            <Typography variant={'body1'} noWrap>
              {'Exercise List'}
            </Typography>
          </Grid>
          <Grid
            item
            xs={2}
            onClick={closeClickHandler}
            container
            justify={'center'}
          >
            <Typography variant={'body1'}>{'close'}</Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface ExerciseListAppBarProps {
  selectedSegment: boolean;
  closeClickHandler: () => void;
  goBackClickHandler: () => void;
}
