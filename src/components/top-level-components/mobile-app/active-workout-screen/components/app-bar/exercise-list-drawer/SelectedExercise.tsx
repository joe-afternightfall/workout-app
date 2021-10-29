import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, List, ListItem, Slide } from '@material-ui/core';
import { Segment, ExerciseVO } from 'workout-app-common-core';
import ActiveExercise from '../../../1-active-exercise/ActiveExercise';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../../../configs/theme/app-theme';
import { startSelectedSegment } from '../../../../../../../creators/new-workout/active-workout';

const useStyles = makeStyles((theme: AppTheme) =>
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

const SelectedExercise = (
  props: SelectedExerciseProps & PassedInProps
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

interface SelectedExerciseProps {
  allExercises: ExerciseVO[];
  startExerciseHandler: () => void;
}

interface PassedInProps {
  segment: Segment;
  closeHandler: () => void;
}

const mapStateToProps = (state: State): SelectedExerciseProps => {
  return {
    allExercises: state.workoutState.configs.exercises,
  } as unknown as SelectedExerciseProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SelectedExerciseProps =>
  ({
    startExerciseHandler: () => {
      dispatch(startSelectedSegment(ownProps.segment.id));
    },
  } as unknown as SelectedExerciseProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectedExercise);
