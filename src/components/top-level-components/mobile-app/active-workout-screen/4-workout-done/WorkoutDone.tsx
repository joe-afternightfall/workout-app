import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Slide, Typography } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { State } from '../../../../../configs/redux/store';
import InfoRow from './InfoRow';
import InfoDivider from './InfoDivider';
import AngryGorilla from '../../../../../configs/icons/angry-gorilla.svg';
import { DASHBOARD_SCREEN_PATH } from '../../../../../configs/constants/app';
import { routerActions } from 'connected-react-router';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    title: {
      color: theme.palette.custom.colors.active,
    },
    titleWrapper: {
      textAlign: 'center',
      marginBottom: 52,
    },
    animal: {
      height: '45vh',
      width: '45vh',
      margin: 'auto',
    },
    button: {
      height: '6vh',
      borderRadius: 0,
      background: theme.palette.primary.main,
      '&:hover': {
        background: theme.palette.primary.dark,
      },
    },
  })
);

const WorkoutDone = (props: WorkoutDoneProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide mountOnEnter unmountOnExit direction={'up'} in={true}>
      <Grid container>
        <Grid item xs={12} container className={classes.titleWrapper}>
          <Grid item xs={12}>
            <Typography
              variant={'h4'}
              color={'textPrimary'}
              className={classes.title}
            >
              {'Great Job!'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant={'body1'} color={'textSecondary'}>
              {'here are a few stats to highlight'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify={'center'}>
          <InfoRow stat={'1:25'} title={'Duration (min)'} />
          <InfoDivider />
          <InfoRow stat={'350'} title={'Weight Lifted (lb)'} />
          <InfoDivider />
          <InfoRow stat={'501'} title={'Reps'} />
        </Grid>
        <Grid item xs={12} container>
          <img src={AngryGorilla} className={classes.animal} />
        </Grid>
        <Grid item xs={12} container justify={'center'}>
          <Grid item xs={6}>
            <Button
              fullWidth
              className={classes.button}
              onClick={props.doneClickHandler}
            >
              {'Done'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Slide>
  );
};

export interface WorkoutDoneProps {
  doneClickHandler: () => void;
}

const mapStateToProps = (state: State): WorkoutDoneProps => {
  const activeWorkout = state.workoutState.activeWorkout;

  return {} as unknown as WorkoutDoneProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutDoneProps =>
  ({
    doneClickHandler: () => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
    },
  } as unknown as WorkoutDoneProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDone);
