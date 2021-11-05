import React from 'react';
import SuperSetDivider from './SuperSetDivider';
import SingleSetItem from './SingleSetItem';
import { WorkoutExercise } from 'workout-app-common-core';

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  return (
    <>
      <SingleSetItem
        segmentId={props.segmentId}
        displayUpNextTitle={props.displayUpNextTitle}
        workoutExercise={props.firstExercise}
      />

      <SuperSetDivider shrink={props.displayEditOptions} />

      <SingleSetItem
        upNextCard
        bottomListItem
        segmentId={props.segmentId}
        workoutExercise={props.secondExercise}
      />
    </>
  );
}

interface SuperSetItemProps {
  segmentId?: string;
  displayUpNextTitle?: boolean;
  displayEditOptions?: boolean;
  firstExercise?: WorkoutExercise;
  secondExercise?: WorkoutExercise;
}
