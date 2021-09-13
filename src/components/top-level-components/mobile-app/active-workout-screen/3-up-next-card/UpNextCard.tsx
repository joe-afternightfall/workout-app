import React from 'react';
import { Grid, Card, List } from '@material-ui/core';
import { connect } from 'react-redux';
import {
  Segment,
  WorkoutExercise,
} from '../../../../../configs/models/AppInterfaces';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import {
  isCircuitSet,
  isStraightSet,
  isSuperset,
} from '../../../../../utils/active-workout';
import SingleListItem from '../../shared/SingleListItem';
import {
  buildRepsAndSets,
  getExerciseName,
} from '../../../../../utils/workout-configs';
import SuperSetItem from '../../shared/SuperSetItem';
import { ExerciseVO } from '../../../../../configs/models/configurations/ExerciseVO';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
    list: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
    },
    bottomMargin: {
      marginBottom: 12,
    },
  })
);

const UpNextCard = (props: UpNextCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let display = <div />;

  const nextSegment = props.nextSegment;
  const workoutExercises = nextSegment.exercises;
  const straightSet = isStraightSet(nextSegment.trainingSetTypeId);
  const circuitSet = isCircuitSet(nextSegment.trainingSetTypeId);

  if (straightSet || circuitSet) {
    workoutExercises.map((exercise: WorkoutExercise) => {
      display = (
        <SingleListItem
          displayUpNextTitle
          key={exercise.id}
          exerciseTitle={getExerciseName(props.exercises, exercise.exerciseId)}
          repsAndSets={buildRepsAndSets(exercise.sets)}
        />
      );
    });
  } else if (isSuperset(nextSegment.trainingSetTypeId)) {
    display = (
      <SuperSetItem
        displayUpNextTitle
        firstExerciseTitle={getExerciseName(
          props.exercises,
          workoutExercises[0].exerciseId
        )}
        firstExerciseRepsAndSets={buildRepsAndSets(workoutExercises[0].sets)}
        secondExerciseTitle={getExerciseName(
          props.exercises,
          workoutExercises[1].exerciseId
        )}
        secondExerciseRepsAndSets={buildRepsAndSets(workoutExercises[1].sets)}
      />
    );
  }

  return (
    <Card
      className={clsx(classes.root, {
        [classes.bottomMargin]: props.bottomMargin,
      })}
    >
      <Grid item xs={12} container>
        <List className={classes.list}>{display}</List>
      </Grid>
    </Card>
  );
};

interface PassedInProps {
  bottomMargin?: boolean;
}

export interface UpNextCardProps {
  nextSegment: Segment;
  exercises: ExerciseVO[];
}

const mapStateToProps = (state: State): UpNextCardProps => {
  const foundSegment = state.workoutState.currentPhase.segments.find(
    (segment) => segment.order === state.workoutState.currentSegmentIndex + 1
  );

  return {
    nextSegment: foundSegment && foundSegment,
    exercises: state.workoutState.configs.exercises,
  } as unknown as UpNextCardProps;
};

export default connect(mapStateToProps)(UpNextCard);
