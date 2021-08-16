import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Divider,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { WorkoutVO } from '../../../../../configs/models/WorkoutVO';
import {
  CircuitExercise,
  CircuitExerciseSet,
} from '../../../workout-screen/WorkoutScreen';
import { ExerciseTypeVO } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { SetType } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export default function PastWorkoutDialog(
  props: PastWorkoutDialogProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>
          {`Workout Info for: ${props.workout && props.workout.workoutDate}`}
        </Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container>
          {props.workout &&
            props.workout.circuits.map((circuit, index: number) => {
              return (
                <Grid key={index} item xs={12}>
                  <Typography>{`${circuit.name} Circuit`}</Typography>
                  <Divider variant={'fullWidth'} />
                  <Typography>{`Exercises: ${circuit.exercises.length}`}</Typography>
                  {circuit.exercises.map((circuitExercise: CircuitExercise) => {
                    // todo: consider ripping out exerciseTypes.find into constructor method
                    // todo: to avoid having to do this every time
                    const foundExercise = props.exerciseTypes.find(
                      (exercise: ExerciseTypeVO) =>
                        exercise.id === circuitExercise.exerciseId
                    );
                    if (foundExercise) {
                      return (
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography>{`Exercise: ${foundExercise.name}`}</Typography>
                          </Grid>

                          {circuitExercise.sets.map(
                            (set: CircuitExerciseSet, index: number) => {
                              let displayComp = <div />;
                              switch (foundExercise.setType) {
                                case SetType.WEIGHTS:
                                  displayComp = (
                                    <>
                                      <Grid item xs={3}>
                                        <Typography>{`Reps ${set.reps}`}</Typography>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Typography>{`lbs ${set.weight}`}</Typography>
                                      </Grid>
                                    </>
                                  );
                                  break;
                                case SetType.TIME:
                                  displayComp = (
                                    <Grid item xs={3}>
                                      <Typography>{`Time ${set.time}`}</Typography>
                                    </Grid>
                                  );
                                  break;
                                case SetType.TIME_AND_DISTANCE:
                                  displayComp = (
                                    <>
                                      <Grid item xs={3}>
                                        <Typography>{`Time ${set.time}`}</Typography>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Typography>{`Distance ${set.distance}`}</Typography>
                                      </Grid>
                                    </>
                                  );
                                  break;
                                case SetType.TIME_AND_REPS:
                                  displayComp = (
                                    <>
                                      <Grid item xs={3}>
                                        <Typography>{`Time ${set.time}`}</Typography>
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Typography>{`Reps ${set.reps}`}</Typography>
                                      </Grid>
                                    </>
                                  );
                                  break;
                                case SetType.REPS:
                                  displayComp = (
                                    <Grid item xs={3}>
                                      <Typography>{`Reps ${set.reps}`}</Typography>
                                    </Grid>
                                  );
                                  break;
                                default:
                                  break;
                              }
                              return (
                                <Grid key={index} item xs={12} container>
                                  <Grid item xs={3}>
                                    <Typography>{`Set #${set.setNumber}`}</Typography>
                                  </Grid>
                                  {displayComp}
                                </Grid>
                              );
                            }
                          )}
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              );
            })}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export interface PastWorkoutDialogProps {
  open: boolean;
  workout: WorkoutVO | undefined;
  closeClickHandler: () => void;
  exerciseTypes: ExerciseTypeVO[];
}
