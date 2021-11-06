import React from 'react';
import { List } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import DoneSection from './components/DoneSection';
import CategoryHeader from '../shared/CategoryHeader';
import NextSegmentSection from './components/NextSegmentSection';
import PreviewListItem from '../../../../../../shared/exercise-list/PreviewListItem';

export default function ActiveExerciseList(
  props: ActiveExerciseListProps
): JSX.Element {
  const {
    nextSegments,
    doneSegments,
    currentSegment,
    toggleSelectedExerciseHandler,
  } = props;

  return (
    <List>
      {doneSegments.length > 0 && <DoneSection doneSegments={doneSegments} />}

      <CategoryHeader title={'Current'} />

      <PreviewListItem segment={currentSegment} />

      <CategoryHeader title={'Next'} />

      {nextSegments.map((segment, index) => {
        const displayDivider = nextSegments.length !== index + 1;
        return (
          <NextSegmentSection
            key={index}
            segment={segment}
            displayDivider={displayDivider}
            toggleSelectedExerciseHandler={toggleSelectedExerciseHandler}
          />
        );
      })}
    </List>
  );
}

interface ActiveExerciseListProps {
  nextSegments: Segment[];
  doneSegments: Segment[];
  currentSegment: Segment;
  toggleSelectedExerciseHandler: () => void;
}
