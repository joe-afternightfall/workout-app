import React from 'react';
import { Segment, isSuperset, ExerciseVO } from 'workout-app-common-core';
import { connect } from 'react-redux';
import ExerciseItem from './components/ExerciseItem';
import ExerciseDivider from './components/ExerciseDivider';
import { State } from '../../../../../configs/redux/store';
import { getExerciseName } from '../../../../../utils/get-name';

const ActiveExercise = (
  props: ActiveExerciseProps & PassedInProps
): JSX.Element => {
  const { segment, allExercises } = props;
  // todo: implement circuit set, pyramid, giant, drop
  const superset = isSuperset(segment.trainingSetTypeId);
  const titles: string[] = [];

  segment.exercises.map((workoutExercise) => {
    const exerciseName = getExerciseName(
      allExercises,
      workoutExercise.exerciseId
    );
    if (exerciseName) {
      titles.push(exerciseName);
    }
  });

  return (
    <div style={{ height: superset ? '34vh' : '20vh' }}>
      <ExerciseItem bottom={false} title={titles[0]} />

      {superset && (
        <>
          <ExerciseDivider />
          <ExerciseItem bottom={true} title={titles[1]} />
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
    allExercises: state.workoutState.configs.exercises,
  } as unknown as ActiveExerciseProps;
};

export default connect(mapStateToProps)(ActiveExercise);
