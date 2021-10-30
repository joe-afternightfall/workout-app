import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { muscleGroups } from 'workout-app-common-core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      height: '8vh',
    },
  })
);

export default function ExercisesAppBar(
  props: ExercisesAppBarProps
): JSX.Element {
  const classes = useStyles();
  const { activeTab, selectedMuscleId, goBackHandler } = props;
  let title = '';

  if (activeTab === 0) {
    title = 'Muscle Groups';
  } else {
    muscleGroups.map((group) => {
      if (group.id === selectedMuscleId) {
        title = `${group.name} Exercises`;
      }
    });
  }

  return (
    <AppBar
      elevation={0}
      position={'fixed'}
      color={'inherit'}
      className={classes.appBar}
    >
      <Toolbar>
        <Grid container alignItems={'center'}>
          <Grid item xs={2}>
            {activeTab === 1 && (
              <IconButton onClick={goBackHandler}>
                <ArrowBack />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={8} container justify={'center'}>
            <Typography variant={'body1'} noWrap>
              {title}
            </Typography>
          </Grid>
          {/*<Grid*/}
          {/*  item*/}
          {/*  xs={2}*/}
          {/*  onClick={closeClickHandler}*/}
          {/*  container*/}
          {/*  justify={'center'}*/}
          {/*>*/}
          {/*  <Typography variant={'body1'}>{'close'}</Typography>*/}
          {/*</Grid>*/}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface ExercisesAppBarProps {
  activeTab: number;
  selectedMuscleId: string;
  goBackHandler: () => void;
}
