import React from 'react';
import { connect } from 'react-redux';
import ExerciseItem from './components/ExerciseItem';
import ExerciseDivider from './components/ExerciseDivider';
import { State } from '../../../../configs/redux/store';
import {
  Segment,
  isSuperset,
  ExerciseVO,
  WorkoutExercise,
} from 'workout-app-common-core';
import { findExercise } from 'workout-app-common-core';
import LastExerciseDialog from './components/LastExerciseDialog';

const ActiveExercise = (
  props: ActiveExerciseProps & PassedInProps
): JSX.Element => {
  const { segment, allExercises } = props;
  // todo: implement pyramid, giant, drop
  const superset = isSuperset(segment.trainingSetTypeId);
  const info: {
    title: string;
    exerciseIcon: string;
    workoutExercise: WorkoutExercise;
  }[] = [];
  const lastExerciseStats: WorkoutExercise[] = [];

  segment.exercises.map((workoutExercise) => {
    const foundExercise = findExercise(
      allExercises,
      workoutExercise.exerciseId
    );
    if (foundExercise) {
      info.push({
        title: foundExercise.name,
        exerciseIcon: foundExercise.iconId,
        workoutExercise: workoutExercise,
      });
    }
  });

  info.map((stats) => lastExerciseStats.push(stats.workoutExercise));

  return (
    <div style={{ height: superset ? '34vh' : '20vh' }}>
      <ExerciseItem bottom={false} info={info[0]} />
      <LastExerciseDialog exercises={lastExerciseStats} />

      {superset && (
        <>
          <ExerciseDivider />
          <ExerciseItem bottom={true} info={info[1]} />
        </>
      )}
    </div>
  );
};

interface ActiveExerciseProps {
  allExercises: ExerciseVO[];
}

interface PassedInProps {
  segment: Segment;
}

const mapStateToProps = (state: State): ActiveExerciseProps => {
  return {
    allExercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as ActiveExerciseProps;
};

export default connect(mapStateToProps)(ActiveExercise);
