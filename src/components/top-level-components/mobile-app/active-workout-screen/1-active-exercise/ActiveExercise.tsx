import React from 'react';
import ExerciseDivider from './components/ExerciseDivider';
import ExerciseItem from './components/ExerciseItem';

export default function ActiveExercise(
  props: ActiveExerciseProps
): JSX.Element {
  const isSuperSet = props.exercises.length === 2;
  return (
    <div style={{ height: isSuperSet ? '34vh' : '20vh' }}>
      <ExerciseItem bottom={false} title={props.exercises[0].title} />

      {isSuperSet && (
        <>
          <ExerciseDivider />
          <ExerciseItem bottom={true} title={props.exercises[1].title} />
        </>
      )}
    </div>
  );
}

export interface ActiveExerciseProps {
  exercises: { title: string }[];
}
