import React from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActions,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { ExerciseVO } from 'workout-app-common-core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    exerciseImage: {
      width: '100%',
    },
    gridItem: {
      padding: 8,
    },
  })
);

const ExercisesGrid = (
  props: ExercisesGridProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { exercisesForId, exerciseInfoClickHandler } = props;

  return (
    <Grid container item xs={12}>
      {exercisesForId.map((exercise, index) => {
        return (
          <Grid item xs={6} key={index} className={classes.gridItem}>
            <Card>
              <CardMedia onClick={() => exerciseInfoClickHandler(exercise)}>
                <img
                  alt={exercise.iconId}
                  className={classes.exerciseImage}
                  src={`images/exercises/${exercise.iconId}/${exercise.iconId}-preview.jpg`}
                />
              </CardMedia>
              <CardActions style={{ height: '7vh' }}>
                <Typography variant={'subtitle2'}>{exercise.name}</Typography>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

interface PassedInProps {
  selectedMuscleId: string;
  exerciseInfoClickHandler: (exercise: ExerciseVO) => void;
}

interface ExercisesGridProps {
  exercisesForId: ExerciseVO[];
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): ExercisesGridProps => {
  const allExercises = state.workoutState.configs.exercises;

  const exercisesForId: ExerciseVO[] = [];

  allExercises.map((exercise) => {
    if (exercise.manikinMuscleGroupIds.includes(ownProps.selectedMuscleId)) {
      exercisesForId.push(exercise);
    }
  });

  return {
    exercisesForId: exercisesForId,
  } as unknown as ExercisesGridProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExercisesGridProps =>
  ({} as unknown as ExercisesGridProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesGrid);