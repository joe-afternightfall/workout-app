import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { State } from '../../../../../configs/redux/store';
import InfoRow from './InfoRow';
import InfoDivider from './InfoDivider';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {},
    title: {
      color: theme.palette.custom.colors.active,
    },
    titleWrapper: {
      textAlign: 'center',
      marginBottom: 52,
    },
  })
);

const WorkoutDone = (props: WorkoutDoneProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.titleWrapper}>
        <Typography
          variant={'h4'}
          color={'textPrimary'}
          className={classes.title}
        >
          {'Great Job!'}
        </Typography>
      </Grid>
      <Grid item xs={12} container justify={'center'}>
        <InfoRow stat={'1:25'} title={'Duration (min)'} />
        <InfoDivider />
        <InfoRow stat={'350'} title={'Weight Lifted (lb)'} />
        <InfoDivider />
        <InfoRow stat={'501'} title={'Reps'} />
      </Grid>
    </Grid>
  );
};

export interface WorkoutDoneProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: State): WorkoutDoneProps => {
  const activeWorkout = state.workoutState.activeWorkout;

  return {} as unknown as WorkoutDoneProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutDoneProps =>
  ({} as unknown as WorkoutDoneProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDone);
