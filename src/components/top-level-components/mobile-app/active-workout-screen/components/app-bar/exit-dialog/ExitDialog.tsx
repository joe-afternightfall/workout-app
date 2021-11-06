import React, { useState } from 'react';
import { AnyAction, Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Dialog,
  DialogContent,
  Grid,
  Link,
  Typography,
} from '@material-ui/core';
import { routerActions } from 'connected-react-router';
import { ExerciseVO } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { State } from '../../../../../../../configs/redux/store';
import { ThunkDispatch } from 'redux-thunk';
import { saveWorkoutForUser } from '../../../../../../../services/user-profile';
import { MOBILE_WORKOUT_SCREEN_PATH } from '../../../../../../../configs/constants/app';
import { clearActiveWorkout } from '../../../../../../../creators/new-workout/active-workout';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: 8,
    },
    buttonWrapper: {
      height: '20vh',
      background: '#222222',
      position: 'fixed',
      bottom: 0,
    },
    baseButton: {
      width: '90%',
      color: '#424242',
    },
    deleteButton: {
      background: '#CC0000',
      width: '90%',
      // padding: '16px 52px',
    },
    title: {
      fontWeight: 600,
    },
    content: {
      textAlign: 'center',
      minHeight: '45vh',
    },
  })
);

const ExitDialog = (props: ExitDialogProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color={'primary'} onClick={openDialog}>
        {'Exit'}
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                variant={'h5'}
                color={'primary'}
                className={classes.title}
              >
                {'Finish Workout?'}
              </Typography>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12}>
                <Typography>{'You did not complete all'}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>{'the exercises.'}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={'contained'}
                color={'primary'}
                size={'large'}
                className={classes.baseButton}
                startIcon={<SaveIcon />}
                onClick={props.saveAndExitHandler}
              >
                {'Save and Exit'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant={'contained'}
                color={'primary'}
                size={'large'}
                className={classes.baseButton}
                startIcon={<DeleteIcon />}
                onClick={props.exitWithoutSavingHandler}
              >
                {'Exit Without Saving'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <Link color={'textPrimary'} onClick={closeDialog}>
                  {'Return to Workout'}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

interface ExitDialogProps {
  allExercises: ExerciseVO[];
  saveAndExitHandler: () => void;
  exitWithoutSavingHandler: () => void;
}

const mapStateToProps = (state: State): ExitDialogProps => {
  return {
    allExercises: state.workoutState.configs.exercises,
  } as unknown as ExitDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExitDialogProps =>
  ({
    saveAndExitHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveWorkoutForUser(MOBILE_WORKOUT_SCREEN_PATH)
      );
    },
    exitWithoutSavingHandler: () => {
      dispatch(routerActions.push(MOBILE_WORKOUT_SCREEN_PATH));
      dispatch(clearActiveWorkout());
    },
  } as unknown as ExitDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExitDialog);
