import React from 'react';
import { Grid } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import CategoryHeader from '../../shared/CategoryHeader';
import CheckeredListDivider from '../../shared/CheckeredListDivider';
import PreviewListItem from '../../../../../../../../shared/exercise-list/PreviewListItem';

export default function NextSegmentSection(
  props: NextSegmentSectionProps
): JSX.Element {
  const {
    segment,
    displayDivider,
    displayEditOptions,
    toggleSelectedExerciseHandler,
  } = props;
  return (
    <>
      <CategoryHeader title={'Next'} />
      <Grid
        onClick={() =>
          !displayEditOptions && toggleSelectedExerciseHandler(true, segment)
        }
      >
        <PreviewListItem segment={segment} phaseType={'activeWorkout'} />
      </Grid>
      {displayDivider && <CheckeredListDivider />}
    </>
  );
}

interface NextSegmentSectionProps {
  segment: Segment;
  displayDivider: boolean;
  displayEditOptions: boolean;
  toggleSelectedExerciseHandler: (
    open: boolean,
    segment: Segment | null
  ) => void;
}
