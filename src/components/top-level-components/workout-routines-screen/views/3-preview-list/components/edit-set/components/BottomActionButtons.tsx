import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import { Button, Grid, Slide } from '@material-ui/core';
import { State } from '../../../../../../../../configs/redux/store';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { startWorkout } from '../../../../../../../../creators/workout/workout-selections';
import { ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../../../configs/constants/app';
import NewSegmentBottomActionButtons from '../../../../../../../shared/bottom-action-buttons/NewSegmentBottomActionButtons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '6vh',
      width: '100%',
      zIndex: 5,
      position: 'fixed',
      bottom: 0,
      left: 0,
    },
    button: {
      borderRadius: 0,
      background: theme.palette.primary.main,
      height: '100%',
      '&:hover': {
        background: theme.palette.primary.dark,
      },
      color: '#303030',
    },
  })
);

const BottomActionButtons = (
  props: BottomActionButtonsProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  if (props.displayEditOptions) {
    return (
      <Slide mountOnEnter unmountOnExit direction={'up'} in={true}>
        <div>
          <NewSegmentBottomActionButtons
            straightSetClickHandler={() => {
              props.addClickHandler('straight');
            }}
            superSetClickHandler={() => {
              props.addClickHandler('super');
            }}
          />
        </div>
      </Slide>
    );
  } else {
    return (
      <Grid container className={classes.root}>
        <Button
          fullWidth
          className={classes.button}
          onClick={props.startClickHandler}
        >
          {'Start Workout'}
        </Button>
      </Grid>
    );
  }
};

interface PassedInProps {
  addClickHandler: (type: 'straight' | 'super') => void;
}

interface BottomActionButtonsProps {
  displayEditOptions: boolean;
  startClickHandler: () => void;
}

const mapStateToProps = (state: State): BottomActionButtonsProps => {
  return {
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as BottomActionButtonsProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BottomActionButtonsProps =>
  ({
    startClickHandler: () => {
      dispatch(startWorkout());
      dispatch(routerActions.push(ACTIVE_WORKOUT_SCREEN_PATH));
    },
  } as unknown as BottomActionButtonsProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomActionButtons);
