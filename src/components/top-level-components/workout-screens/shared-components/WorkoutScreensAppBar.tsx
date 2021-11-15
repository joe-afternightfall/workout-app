import clsx from 'clsx';
import React from 'react';
import {
  Grid,
  AppBar,
  Button,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import DiscardDialog from './DiscardDialog';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  ApplicationRouteProp,
  DASHBOARD_SCREEN_PATH,
  PREVIEW_ROUTINE_SCREEN_ID,
  ROUTINES_SCREEN_ID,
} from '../../../../configs/constants/app-routing';
import { openEditPreviewOptions } from '../../../../creators/workout/workout-selections';
import { saveEditedVersionOfRoutine } from '../../../../creators/workout/preview-workout';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      padding: '0 12px',
      height: '8vh',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    gridWrapper: {
      height: '100%',
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
  const { activePage, displayEditOptions, displayEditSet } = props;

  // todo: setup switch based on current page
  if (activePage) {
    switch (activePage.id) {
      case ROUTINES_SCREEN_ID:
        appBarMessage = 'Routines';
        break;
      case PREVIEW_ROUTINE_SCREEN_ID:
        appBarMessage = 'Preview Workout';
        break;
      default:
        break;
    }
  }

  return displayEditSet ? (
    <React.Fragment />
  ) : (
    <AppBar position={'absolute'} color={'transparent'} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.gridWrapper} alignItems={'flex-end'}>
          <Grid item xs={2}>
            {displayEditOptions ? (
              <DiscardDialog />
            ) : (
              <IconButton
                color={'primary'}
                onClick={props.goBackHandler}
                className={classes.menuButton}
              >
                <ArrowBackIcon fontSize={'small'} />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={8} container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'overline'}>
                {displayEditOptions ? '' : appBarMessage}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2} container justify={'flex-end'}>
            <Button
              variant={'text'}
              color={'primary'}
              className={clsx({
                [classes.hide]:
                  activePage && activePage.id !== PREVIEW_ROUTINE_SCREEN_ID,
              })}
              onClick={
                displayEditOptions
                  ? props.saveEditedVersionOfRoutine
                  : props.editClickHandler
              }
            >
              {displayEditOptions ? 'Save' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface WorkoutScreensAppBarProps {
  displayEditOptions: boolean;
  displayEditSet: boolean;
  activePage: ApplicationRouteProp | undefined;
  goBackHandler: () => void;
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
    goBackHandler: () => {
      dispatch(routerActions.goBack());
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
