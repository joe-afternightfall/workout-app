import React from 'react';
import LinkDivider from './LinkDivider';
import SingleListItem from './SingleListItem';

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  return (
    <>
      <SingleListItem
        displayUpNextTitle={props.displayUpNextTitle}
        exerciseTitle={props.firstExerciseTitle}
        repsAndSets={props.firstExerciseRepsAndSets}
        equipmentIcon={props.firstEquipmentIcon}
      />

      <LinkDivider />

      <SingleListItem
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
  firstExerciseTitle: string;
  firstExerciseRepsAndSets: string;
  firstEquipmentIcon?: JSX.Element;
  firstExerciseIcon?: JSX.Element;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  secondEquipmentIcon?: JSX.Element;
  secondExerciseIcon?: JSX.Element;
}
