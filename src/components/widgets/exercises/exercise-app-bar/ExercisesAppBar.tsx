import React from 'react';
import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { ExerciseVO, ManikinMuscleGroupVO } from 'workout-app-common-core';
import { connect } from 'react-redux';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { State } from '../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      height: '8vh',
    },
  })
);

const ExercisesAppBar = (
  props: ExercisesAppBarProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const {
    activeTab,
    manikinMuscleGroups,
    selectedMuscleId,
    selectedExercise,
    goBackHandler,
  } = props;

  let title = '';
  let displayBackButton = false;

  if (activeTab === 0) {
    title = 'Muscle Groups';
  } else if (activeTab === 1) {
    displayBackButton = true;
    manikinMuscleGroups.map((group) => {
      if (group.id === selectedMuscleId) {
        title = `${group.name} Exercises`;
      }
    });
  } else if (activeTab === 2 && selectedExercise) {
    displayBackButton = true;
    title = selectedExercise.name;
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
            {displayBackButton && (
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
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface PassedInProps {
  activeTab: number;
  selectedMuscleId: string;
  goBackHandler: () => void;
  selectedExercise: ExerciseVO | null;
}

interface ExercisesAppBarProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

const mapStateToProps = (state: State): ExercisesAppBarProps => {
  return {
    manikinMuscleGroups: state.workoutState.configs.manikinMuscleGroups,
  } as unknown as ExercisesAppBarProps;
};

export default connect(mapStateToProps)(ExercisesAppBar);
