import clsx from 'clsx';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DiscardDialog from './DiscardDialog';
import {
  ROUTINES_SCREEN_ID,
  ApplicationRouteProp,
  PREVIEW_WORKOUT_SCREEN_ID,
  ALL_WORKOUTS_SCREEN_ID,
  DASHBOARD_SCREEN_PATH,
  ROUTINES_SCREEN_PATH,
  ALL_WORKOUTS_SCREEN_PATH,
} from '../../../../configs/constants/app-routing';
import TopAppBar from '../../../app-shell/TopAppBar';
import { Button, IconButton } from '@material-ui/core';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { openEditPreviewOptions } from '../../../../creators/workout/workout-selections';
import { saveEditedVersionOfRoutine } from '../../../../creators/workout/preview-workout';

const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    hide: {
      display: 'none',
    },
  })
);

const WorkoutScreensAppBar = (
  props: WorkoutScreensAppBarProps
): JSX.Element => {
  const classes = useStyles();
  let appBarMessage = 'Workouts';
  let goBackRoute = '';
  const { activePage, displayEditOptions, displayEditSet } = props;

  if (activePage) {
    switch (activePage.id) {
      case ALL_WORKOUTS_SCREEN_ID:
        goBackRoute = DASHBOARD_SCREEN_PATH;
        break;
      case ROUTINES_SCREEN_ID:
        goBackRoute = ALL_WORKOUTS_SCREEN_PATH;
        appBarMessage = 'Routines';
        break;
      case PREVIEW_WORKOUT_SCREEN_ID:
        goBackRoute = ROUTINES_SCREEN_PATH;
        appBarMessage = 'Preview Workout';
        break;
      default:
        break;
    }
  }

  return displayEditSet ? (
    <React.Fragment />
  ) : (
    <TopAppBar
      disableGutters={!displayEditOptions}
      position={displayEditOptions ? 'absolute' : 'fixed'}
      title={displayEditOptions ? '' : appBarMessage}
      leftButton={
        displayEditOptions ? (
          <DiscardDialog />
        ) : (
          <IconButton
            color={'primary'}
            onClick={() => {
              props.goBackHandler(goBackRoute);
            }}
            className={classes.menuButton}
          >
            <ArrowBackIcon fontSize={'small'} />
          </IconButton>
        )
      }
      rightButton={
        <Button
          variant={'text'}
          color={'primary'}
          className={clsx({
            [classes.hide]:
              activePage && activePage.id !== PREVIEW_WORKOUT_SCREEN_ID,
          })}
          onClick={
            displayEditOptions
              ? props.saveEditedVersionOfRoutine
              : props.editClickHandler
          }
        >
          {displayEditOptions ? 'Save' : 'Edit'}
        </Button>
      }
    />
  );
};

interface WorkoutScreensAppBarProps {
  displayEditOptions: boolean;
  displayEditSet: boolean;
  activePage: ApplicationRouteProp | undefined;
  goBackHandler: (goBackRoute: string) => void;
  editClickHandler: () => void;
  saveEditedVersionOfRoutine: () => void;
}

const mapStateToProps = (state: State): WorkoutScreensAppBarProps => {
  return {
    displayEditOptions: state.workoutState.editOptions.open,
    displayEditSet: state.workoutState.displayEditSet,
    activePage: state.applicationState.activePage,
  } as unknown as WorkoutScreensAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutScreensAppBarProps =>
  ({
    goBackHandler: (goBackRoute: string) => {
      dispatch(routerActions.push(goBackRoute));
    },
    editClickHandler: () => {
      dispatch(openEditPreviewOptions());
    },
    saveEditedVersionOfRoutine: () => {
      dispatch(saveEditedVersionOfRoutine());
    },
  } as unknown as WorkoutScreensAppBarProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutScreensAppBar);
