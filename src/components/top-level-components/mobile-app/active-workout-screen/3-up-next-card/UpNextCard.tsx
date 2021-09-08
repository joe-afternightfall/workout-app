import React from 'react';
import { Grid, Card } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Segment,
  WorkoutExercise,
} from '../../../../../configs/models/AppInterfaces';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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

export interface UpNextCardProps {
  nextSegment: Segment;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    supersetRoot: {
      width: '100%',
    },
    baseRoot: {
      width: '100%',
    },
  })
);

const UpNextCard = (props: UpNextCardProps): JSX.Element => {
  const classes = useStyles();
  let display = <div />;

  const workoutExercises = props.nextSegment.exercises;
  const straightSet = isStraightSet(props.nextSegment.trainingSetTypeId);
  const circuitSet = isCircuitSet(props.nextSegment.trainingSetTypeId);
  if (straightSet || circuitSet) {
    workoutExercises.map((exercise: WorkoutExercise) => {
      display = (
        <SingleListItem
          key={exercise.id}
          exerciseTitle={getExerciseName(props.exercises, exercise.exerciseId)}
          repsAndSets={buildRepsAndSets(exercise.sets)}
        />
      );
    });
  } else if (isSuperset(props.nextSegment.trainingSetTypeId)) {
    display = (
      <SuperSetItem
        upNextTitle
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

  let rootClass = '';
  if (straightSet || circuitSet) {
    rootClass = classes.baseRoot;
  } else {
    rootClass = classes.supersetRoot;
  }

  return (
    <Card className={rootClass}>
      <Grid item xs={12} container>
        {display}
      </Grid>
    </Card>
  );
};

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

const mapDispatchToProps = (dispatch: Dispatch): UpNextCardProps =>
  ({} as unknown as UpNextCardProps);

export default connect(mapStateToProps, mapDispatchToProps)(UpNextCard);
