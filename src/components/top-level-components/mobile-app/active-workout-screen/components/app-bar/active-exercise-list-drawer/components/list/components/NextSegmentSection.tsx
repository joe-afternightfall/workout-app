import React from 'react';
import { Grid } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import CheckeredListDivider from '../../shared/CheckeredListDivider';
import PreviewListItem from '../../../../../../../shared/exercise-list/PreviewListItem';

export default function NextSegmentSection(
  props: NextSegmentSectionProps
): JSX.Element {
  const { segment, displayDivider, toggleSelectedExerciseHandler } = props;
  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <PreviewListItem segment={segment} />
        </Grid>
        <Grid
          item
          xs={2}
          container
          alignItems={'center'}
          justify={'center'}
          onClick={toggleSelectedExerciseHandler}
        >
          <ArrowForwardIcon />
        </Grid>
      </Grid>
      {displayDivider && <CheckeredListDivider />}
    </>
  );
}

interface NextSegmentSectionProps {
  segment: Segment;
  displayDivider: boolean;
  toggleSelectedExerciseHandler: () => void;
}
