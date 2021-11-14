import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  ExerciseVO,
  WorkoutExercise,
  getExerciseName,
  buildRepsAndSets,
} from 'workout-app-common-core';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';
import { State } from '../../../../../configs/redux/store';
import { findLatestStatsForExercise } from '../../../../../utils/find-latest';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    // todo: rip out these colors to palette
    // todo: set secondary color as this purple
    // todo: start to use in the app
    paper: {
      background: '#292D35',
      width: '100%',
      padding: '20px 12px',
    },
    iconButton: {
      position: 'absolute',
      right: 8,
      top: '9vh',
      color: '#A885E9',
    },
    title: {
      // color: '#ded371',
      color: '#64d2e7',
    },
    date: {
      color: '#a2db31',
    },
    sets: {
      color: '#a885e9',
    },
    text: {
      color: '#F6F6F6',
    },
    closeButton: {
      color: '#ef8e99',
    },
  })
);
const LastExerciseDialog = (
  props: LastExerciseDialogProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { pastExercises, allExercises } = props;
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      {pastExercises.length > 0 && (
        <IconButton className={classes.iconButton} onClick={openDialog}>
          <TodayIcon />
        </IconButton>
      )}
      <Dialog open={open} fullWidth maxWidth={'md'} onClose={closeDialog}>
        <DialogTitle disableTypography>{'Most Recent Stats'}</DialogTitle>
        <DialogContent>
          <Grid container alignItems={'center'} justify={'center'} spacing={3}>
            {pastExercises.map((pastInfo, index) => {
              return (
                <Grid item xs={12} key={index} container>
                  <Paper className={classes.paper} elevation={0}>
                    <Grid item xs={12}>
                      <Typography variant={'body2'} className={classes.title}>
                        {getExerciseName(
                          allExercises,
                          pastInfo.exercise.exerciseId
                        )}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant={'caption'} className={classes.date}>
                        {`Date: ${pastInfo.date}`}
                      </Typography>
                    </Grid>
                    <Typography variant={'body1'} className={classes.sets}>
                      {`Sets: ${buildRepsAndSets(pastInfo.exercise.sets)}`}
                    </Typography>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'text'}
            onClick={closeDialog}
            className={classes.closeButton}
          >
            {'Close'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

interface LastExerciseDialogProps {
  allExercises: ExerciseVO[];
  pastExercises: { date: string; exercise: WorkoutExercise }[];
}

interface PassedInProps {
  exercises: WorkoutExercise[];
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): LastExerciseDialogProps => {
  const pastWorkouts = state.applicationState.userProfile?.workouts;
  const pastExercises: { date: string; exercise: WorkoutExercise }[] = [];
  if (pastWorkouts) {
    ownProps.exercises.map((exercise) => {
      const foundExerciseStats = findLatestStatsForExercise(
        exercise,
        pastWorkouts
      );
      if (foundExerciseStats) {
        pastExercises.push(foundExerciseStats);
      }
    });
  }
  return {
    pastExercises: pastExercises,
    allExercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as LastExerciseDialogProps;
};

export default connect(mapStateToProps)(LastExerciseDialog);
