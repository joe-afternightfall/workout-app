import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Button, List, ListItem, Slide } from '@material-ui/core';
import { Segment, ExerciseVO } from 'workout-app-common-core';
import ActiveExercise from '../../../1-active-exercise/ActiveExercise';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      height: '100%',
    },
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
  const { segment } = props;

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'left'}>
      <div className={classes.root}>
        <List>
          <ListItem>
            <ActiveExercise segment={segment} />
          </ListItem>
          <ListItem className={classes.buttonWrapper}>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.button}
            >
              {'Start exercise'}
            </Button>
          </ListItem>
        </List>
      </div>
    </Slide>
  );
};

interface SelectedExerciseProps {
  allExercises: ExerciseVO[];
}

interface PassedInProps {
  segment: Segment;
}

const mapStateToProps = (state: State): SelectedExerciseProps => {
  return {
    allExercises: state.workoutState.configs.exercises,
  } as unknown as SelectedExerciseProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SelectedExerciseProps =>
  ({} as unknown as SelectedExerciseProps);

export default connect(mapStateToProps, mapDispatchToProps)(SelectedExercise);
