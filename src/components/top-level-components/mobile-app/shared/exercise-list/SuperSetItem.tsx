import React from 'react';
import SuperSetDivider from './SuperSetDivider';
import SingleSetItem from './SingleSetItem';

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  return (
    <>
      <SingleSetItem
        segmentId={props.segmentId}
        displayUpNextTitle={props.displayUpNextTitle}
        exerciseTitle={props.firstExerciseTitle}
        repsAndSets={props.firstExerciseRepsAndSets}
        equipmentIcon={props.firstEquipmentIcon}
      />

      <SuperSetDivider shrink={props.displayEditOptions} />

      <SingleSetItem
        segmentId={props.segmentId}
        upNextCard
        bottomListItem
        exerciseTitle={props.secondExerciseTitle}
        repsAndSets={props.secondExerciseRepsAndSets}
        equipmentIcon={props.secondEquipmentIcon}
      />
    </>
  );
}

export interface SuperSetItemProps {
  displayUpNextTitle?: boolean;
  displayEditOptions?: boolean;
  firstExerciseTitle: string;
  firstExerciseRepsAndSets: string;
  firstEquipmentIcon?: JSX.Element;
  firstExerciseIcon?: JSX.Element;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  secondEquipmentIcon?: JSX.Element;
  secondExerciseIcon?: JSX.Element;
  segmentId?: string;
}
