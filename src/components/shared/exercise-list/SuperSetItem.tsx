import React from 'react';
import SuperSetDivider from './SuperSetDivider';
import SingleSetItem from './SingleSetItem';
import { WorkoutExercise } from 'workout-app-common-core';

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  const {
    upNextCard,
    segmentId,
    displayUpNextTitle,
    firstExercise,
    secondExercise,
  } = props;

  return (
    <>
      <SingleSetItem
        segmentId={segmentId}
        displayUpNextTitle={displayUpNextTitle}
        workoutExercise={firstExercise}
      />

      <SuperSetDivider />

      <SingleSetItem
        upNextCard={upNextCard}
        bottomListItem
        segmentId={segmentId}
        workoutExercise={secondExercise}
      />
    </>
  );
}

interface SuperSetItemProps {
  segmentId?: string;
  displayUpNextTitle?: boolean;
  upNextCard: boolean;
  firstExercise?: WorkoutExercise;
  secondExercise?: WorkoutExercise;
}
