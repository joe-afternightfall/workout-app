import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import React from 'react';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      width: '100%',
    },
  })
);

export default function ActiveExerciseListAppBar(
  props: ActiveExerciseListAppBarProps
): JSX.Element {
  const classes = useStyles();
  const { selectedSegment, closeClickHandler, goBackClickHandler } = props;

  return (
    <AppBar
      elevation={0}
      color={'inherit'}
      position={'sticky'}
      className={classes.appBar}
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

interface ActiveExerciseListAppBarProps {
  selectedSegment: boolean;
  closeClickHandler: () => void;
  goBackClickHandler: () => void;
}
