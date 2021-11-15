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
import { DASHBOARD_SCREEN_PATH } from '../../../../configs/constants/app-routing';
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
  props: WorkoutScreensAppBarProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  let appBarMessage = '';

  switch (props.activeTab) {
    case 0:
      appBarMessage = 'Workouts';
      break;
    case 1:
      appBarMessage = 'Routines';
      break;
    case 2:
      appBarMessage = 'Preview Workout';
      break;
    default:
      break;
  }

  return props.displayEditSet ? (
    <React.Fragment />
  ) : (
    <AppBar position={'absolute'} color={'transparent'} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Grid container className={classes.gridWrapper} alignItems={'flex-end'}>
          <Grid item xs={2}>
            {props.displayEditOptions ? (
              <DiscardDialog />
            ) : (
              <IconButton
                color={'primary'}
                onClick={
                  props.activeTab === 0
                    ? props.routeToDashboardClickHandler
                    : props.clickHandler
                }
                className={classes.menuButton}
              >
                <ArrowBackIcon fontSize={'small'} />
              </IconButton>
            )}
          </Grid>

          <Grid item xs={8} container justify={'center'} alignItems={'center'}>
            <Grid item>
              <Typography variant={'overline'}>
                {props.displayEditOptions ? '' : appBarMessage}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={2} container justify={'flex-end'}>
            <Button
              variant={'text'}
              color={'primary'}
              className={clsx({
                [classes.hide]: appBarMessage !== 'Preview Workout',
              })}
              onClick={
                props.displayEditOptions
                  ? props.saveEditedVersionOfRoutine
                  : props.editClickHandler
              }
            >
              {props.displayEditOptions ? 'Save' : 'Edit'}
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface PassedInProps {
  activeTab: number;
  clickHandler: () => void;
}

interface WorkoutScreensAppBarProps {
  routeToDashboardClickHandler: () => void;
  editClickHandler: () => void;
  displayEditOptions: boolean;
  displayEditSet: boolean;
  saveEditedVersionOfRoutine: () => void;
}

const mapStateToProps = (state: State): WorkoutScreensAppBarProps => {
  return {
    displayEditOptions: state.workoutState.editOptions.open,
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as WorkoutScreensAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutScreensAppBarProps =>
  ({
    routeToDashboardClickHandler: () => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
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
