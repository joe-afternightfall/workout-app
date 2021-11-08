import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  Typography,
  CardActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { ExerciseVO } from 'workout-app-common-core';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExerciseImage from '../../../../top-level-components/mobile-app/shared/exercise-list/ExerciseImage';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getExerciseImages } from '../../../../../services/exercise-images';

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

  useEffect(() => {
    props.fetchImagesFor();
  }, [props.selectedMuscleId]);

  return (
    <Grid container item xs={12}>
      {exercisesForId.map((exercise, index) => {
        return (
          <Grid item xs={6} key={index} className={classes.gridItem}>
            <Card>
              <CardMedia onClick={() => exerciseInfoClickHandler(exercise)}>
                <ExerciseImage
                  folder={exercise.iconId}
                  image={`${exercise.iconId}-preview.jpg`}
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
  fetchImagesFor: () => void;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): ExercisesGridProps => {
  const allExercises = state.applicationState.workoutConfigurations.exercises;

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

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExercisesGridProps =>
  ({
    fetchImagesFor: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        getExerciseImages(ownProps.selectedMuscleId)
      );
    },
  } as unknown as ExercisesGridProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExercisesGrid);
