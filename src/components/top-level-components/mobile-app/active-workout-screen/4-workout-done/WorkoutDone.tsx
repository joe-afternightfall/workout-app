import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { State } from '../../../../../configs/redux/store';
import InfoRow from './InfoRow';
import InfoDivider from './InfoDivider';
import AngryGorilla from '../../../../../configs/icons/angry-gorilla.svg';
import { DASHBOARD_SCREEN_PATH } from '../../../../../configs/constants/app';
import { routerActions } from 'connected-react-router';
import Confetti from 'react-confetti';

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

const WorkoutDone = ({
  minutes,
  doneClickHandler,
}: WorkoutDoneProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Confetti tweenDuration={5000} recycle={false} />
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
        <InfoRow stat={minutes} title={'Duration (min)'} />
        <InfoDivider />
        <InfoRow stat={'---'} title={'Weight Lifted (lb)'} />
        <InfoDivider />
        <InfoRow stat={'---'} title={'Reps'} />
      </Grid>
      <Grid item xs={12} container>
        <img src={AngryGorilla} className={classes.animal} />
      </Grid>
      <Grid item xs={12} container justify={'center'}>
        <Grid item xs={6}>
          <Button
            fullWidth
            className={classes.button}
            onClick={doneClickHandler}
          >
            {'Done'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export interface WorkoutDoneProps {
  doneClickHandler: () => void;
  totalWeightLifted: number;
  totalRepsDone: number;
  minutes: string;
}

const mapStateToProps = (state: State): WorkoutDoneProps => {
  const activeWorkout = state.workoutState.activeWorkout;
  let totalWeightLifted = 0;
  let totalRepsDone = 0;

  const endTimeDate = new Date(Number(activeWorkout.endTime)).getTime();
  const startTimeDate = new Date(Number(activeWorkout.startTime)).getTime();
  const totalTime = endTimeDate - startTimeDate;
  const minutes = new Date(Number(totalTime)).getMinutes();

  activeWorkout.routine.phases.map((phase) => {
    phase.segments.map((segment) => {
      segment.exercises.map((exercise) => {
        exercise.sets.map((set) => {
          if (set.markedDone) {
            totalWeightLifted += set.weight;
            totalRepsDone += set.reps;
          }
        });
      });
    });
  });
  return {
    totalWeightLifted: totalWeightLifted,
    totalRepsDone: totalRepsDone,
    minutes: minutes,
  } as unknown as WorkoutDoneProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutDoneProps =>
  ({
    doneClickHandler: () => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
    },
  } as unknown as WorkoutDoneProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDone);
