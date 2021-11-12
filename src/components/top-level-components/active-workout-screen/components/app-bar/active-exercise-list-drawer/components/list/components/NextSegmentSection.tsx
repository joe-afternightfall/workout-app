import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import CheckeredListDivider from '../../shared/CheckeredListDivider';
import PreviewListItem from '../../../../../../../../shared/exercise-list/PreviewListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    baseButton: {
      zIndex: 1,
      right: 12,
      borderRadius: 0,
      height: '5vh',
      width: '5vh',
      position: 'absolute',
      transform: 'translate(0, 5vh)',
    },
    deleteButton: {
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
    dragButton: {
      right: 0,
    },
    superset: {
      transform: 'translate(0, 12vh)',
    },
  })
);

// todo: come back and clean up classes
export default function NextSegmentSection(
  props: NextSegmentSectionProps
): JSX.Element {
  const classes = useStyles();
  const { segment, isEditing, displayDivider, toggleSelectedExerciseHandler } =
    props;
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PreviewListItem segment={segment} phaseType={'activeWorkout'} />
        </Grid>
        {!isEditing && (
          <IconButton
            className={classes.baseButton}
            onClick={() => toggleSelectedExerciseHandler(true, segment)}
          >
            <ArrowForwardIcon />
          </IconButton>
        )}
      </Grid>
      {displayDivider && <CheckeredListDivider />}
    </>
  );
}

interface NextSegmentSectionProps {
  segment: Segment;
  isEditing: boolean;
  displayDivider: boolean;
  toggleSelectedExerciseHandler: (
    open: boolean,
    segment: Segment | null
  ) => void;
}
