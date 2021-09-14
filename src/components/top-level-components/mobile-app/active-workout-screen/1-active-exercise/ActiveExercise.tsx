import React from 'react';
import ExerciseDivider from './components/ExerciseDivider';
import ExerciseItem from './components/ExerciseItem';

export default function ActiveExercise(
  props: ActiveExerciseProps
): JSX.Element {
  // todo: implement circuit set, pyramid, giant, drop
  const exerciseTitles = props.exerciseTitles;
  const superset = props.superset;

  return (
    <div style={{ height: superset ? '34vh' : '20vh' }}>
      <ExerciseItem bottom={false} title={exerciseTitles[0].title} />

      {superset && (
        <>
          <ExerciseDivider />
          <ExerciseItem bottom={true} title={exerciseTitles[1].title} />
        </>
      )}
    </div>
  );
}

export interface ActiveExerciseProps {
  exerciseTitles: { title: string }[];
  superset: boolean;
}
