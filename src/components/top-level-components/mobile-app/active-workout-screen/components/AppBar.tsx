import React from 'react';
import { Grid, AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { DASHBOARD_SCREEN_PATH } from '../../../../../configs/constants/app';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { getPhaseName } from 'workout-app-common-core';
import ExerciseListDrawer from './app-bar/ExerciseListDrawer';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    toolbar: {
      padding: 0,
      height: '8vh',
    },
    exitButton: {
      color: theme.palette.custom.colors.active,
    },
    gridRoot: {
      height: '100%',
    },
    titleWrapper: {
      paddingBottom: 2,
    },
  })
);

const ActiveWorkoutAppBar = (props: ActiveWorkoutAppBarProps): JSX.Element => {
  const classes = useStyles();

  return (
    <AppBar position={'absolute'} color={'transparent'} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Grid
          container
          justify={'center'}
          alignItems={'flex-end'}
          className={classes.gridRoot}
        >
          <Grid item xs={2}>
            <Button
              className={classes.exitButton}
              onClick={props.exitClickHandler}
            >
              {'exit'}
            </Button>
          </Grid>

          <Grid item xs={8} className={classes.titleWrapper}>
            <Grid
              item
              xs={12}
              container
              justify={'center'}
              alignItems={'flex-end'}
            >
              <Typography variant={'subtitle2'}>{props.phaseName}</Typography>
            </Grid>

            <Grid
              item
              xs={12}
              container
              justify={'center'}
              alignItems={'flex-end'}
            >
              <Typography variant={'subtitle1'}>
                {props.currentSegmentCount}
              </Typography>
            </Grid>
          </Grid>

          <Grid
            item
            xs={2}
            container
            justify={'flex-end'}
            alignItems={'flex-end'}
          >
            <ExerciseListDrawer />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

interface ActiveWorkoutAppBarProps {
  phaseName: string;
  currentSegmentCount: string;
  exitClickHandler: () => void;
}

const mapStateToProps = (state: State): ActiveWorkoutAppBarProps => {
  const totalSegments = state.workoutState.currentPhase.segments.length;
  const currentSegmentIndex = state.workoutState.currentSegmentIndex;

  return {
    phaseName: getPhaseName(state.workoutState.currentPhase.phaseId),
    currentSegmentCount: `${currentSegmentIndex}/${totalSegments}`,
  } as unknown as ActiveWorkoutAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutAppBarProps =>
  ({
    exitClickHandler: () => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
    },
  } as unknown as ActiveWorkoutAppBarProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveWorkoutAppBar);
