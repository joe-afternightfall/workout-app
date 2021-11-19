import React from 'react';
import { Dispatch } from 'redux';
import StatsCard from './StatsCard';
import { connect } from 'react-redux';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { State } from '../../../../../../configs/redux/store';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getExerciseName, WorkoutExercise } from 'workout-app-common-core';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      padding: 0,
    },
    icon: {
      opacity: 0.8,
    },
  })
);

const OverviewExerciseItem = (
  props: OverviewExerciseItemProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { name, exercise } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <Grid item xs={10}>
          <Typography color={'primary'}>{name}</Typography>
        </Grid>
        <Grid item xs={2} container justify={'flex-end'}>
          <IconButton className={classes.button}>
            <HelpOutlineIcon className={classes.icon} />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        {exercise.sets.map((set, index) => {
          const totalSets = exercise.sets.length;
          return <StatsCard key={index} set={set} totalSets={totalSets} />;
        })}
      </Grid>
    </Grid>
  );
};

interface OverviewExerciseItemProps {
  name: string;
}

interface PassedInProps {
  exercise: WorkoutExercise;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): OverviewExerciseItemProps => {
  const exercises = state.applicationState.workoutConfigurations.exercises;
  const name = getExerciseName(exercises, ownProps.exercise.exerciseId);

  return {
    name: name,
  } as unknown as OverviewExerciseItemProps;
};

const mapDispatchToProps = (dispatch: Dispatch): OverviewExerciseItemProps =>
  ({} as unknown as OverviewExerciseItemProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverviewExerciseItem);
