import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Segment } from 'workout-app-common-core';
import { Button, List, ListItem, Slide } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveExercise from '../../../../1-active-exercise/ActiveExercise';
import { startSelectedSegment } from '../../../../../../../creators/workout/active-workout';

const useStyles = makeStyles(() =>
  createStyles({
    buttonWrapper: {
      height: '20vh',
      background: '#222222',
      position: 'fixed',
      bottom: 0,
    },
    button: {
      margin: 'auto',
    },
  })
);

const SelectedExerciseOverlay = (
  props: SelectedExerciseOverlayProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { segment, startExerciseHandler, closeHandler } = props;

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'left'}>
      <List>
        <ListItem>
          <ActiveExercise segment={segment} />
        </ListItem>
        <ListItem className={classes.buttonWrapper}>
          <Button
            variant={'contained'}
            color={'primary'}
            className={classes.button}
            onClick={() => {
              startExerciseHandler();
              closeHandler();
            }}
          >
            {'Start exercise'}
          </Button>
        </ListItem>
      </List>
    </Slide>
  );
};

interface SelectedExerciseOverlayProps {
  startExerciseHandler: () => void;
}

interface PassedInProps {
  segment: Segment;
  closeHandler: () => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SelectedExerciseOverlayProps =>
  ({
    startExerciseHandler: () => {
      dispatch(startSelectedSegment(ownProps.segment.id));
    },
  } as unknown as SelectedExerciseOverlayProps);

export default connect(null, mapDispatchToProps)(SelectedExerciseOverlay);
