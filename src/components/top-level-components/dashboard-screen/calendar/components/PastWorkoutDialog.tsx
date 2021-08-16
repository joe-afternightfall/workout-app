import React from 'react';
import {
  Grid,
  Dialog,
  Divider,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { format } from 'date-fns';
import EventIcon from '@material-ui/icons/Event';
import {
  CircuitExercise,
  CircuitExerciseSet,
} from '../../../workout-screen/WorkoutScreen';
import CloseIcon from '@material-ui/icons/Close';
import { WorkoutVO } from '../../../../../configs/models/WorkoutVO';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExerciseTitle from '../../../../shared/workout-related/ExerciseTitle';
import { SetType } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import SetColumnHeaders from '../../../../shared/workout-related/SetColumnHeaders';
import StopwatchDisplay from '../../../workout-screen/stopwatch/StopwatchDisplay';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.dark,
      color: '#FFF',
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
      maxWidth={'sm'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        {props.workout && (
          <Grid item xs={10} container alignItems={'center'} spacing={2}>
            <Grid item xs={1}>
              <EventIcon />
            </Grid>
            <Grid item xs={10} container>
              <Grid item xs={12}>
                <Typography variant={'h6'}>
                  {`Date: ${format(
                    new Date(props.workout.date),
                    'eee MMM do'
                  )}`}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <StopwatchDisplay
                  displayText={true}
                  variant={'h6'}
                  minutes={props.workout.time.currentTimeMin}
                  seconds={props.workout.time.currentTimeSec}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
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
                  <Grid item xs={12} container justify={'space-between'}>
                    <Grid item>
                      <ExerciseTitle title={`${circuit.name} Circuit`} />
                    </Grid>

                    <Grid item>
                      <ExerciseTitle
                        title={`${
                          circuit.exercises && circuit.exercises.length
                        } exercises`}
                      />
                    </Grid>
                  </Grid>
                  <Divider variant={'fullWidth'} />
                  <Grid item xs={12} container>
                    {circuit.exercises &&
                      circuit.exercises.map(
                        (circuitExercise: CircuitExercise) => {
                          // todo: consider ripping out exerciseTypes.find into constructor method
                          // todo: to avoid having to do this every time
                          const foundExercise = props.exerciseTypes.find(
                            (exercise: ExerciseTypeVO) =>
                              exercise.id === circuitExercise.exerciseId
                          );
                          if (foundExercise) {
                            return (
                              <Grid item xs={12} container>
                                <Grid item xs={12}>
                                  <ExerciseTitle title={foundExercise.name} />
                                </Grid>

                                <SetColumnHeaders
                                  setType={foundExercise.setType}
                                  displayAction={false}
                                />

                                {circuitExercise.sets.map(
                                  (set: CircuitExerciseSet, index: number) => {
                                    let displayComp = <div />;
                                    switch (foundExercise.setType) {
                                      case SetType.WEIGHTS:
                                        displayComp = (
                                          <>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.reps}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.weight}
                                              </Typography>
                                            </Grid>
                                          </>
                                        );
                                        break;
                                      case SetType.TIME:
                                        displayComp = (
                                          <Grid item xs={3}>
                                            <Typography>{set.time}</Typography>
                                          </Grid>
                                        );
                                        break;
                                      case SetType.TIME_AND_DISTANCE:
                                        displayComp = (
                                          <>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.time}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.distance}
                                              </Typography>
                                            </Grid>
                                          </>
                                        );
                                        break;
                                      case SetType.TIME_AND_REPS:
                                        displayComp = (
                                          <>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.time}
                                              </Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                              <Typography>
                                                {set.reps}
                                              </Typography>
                                            </Grid>
                                          </>
                                        );
                                        break;
                                      case SetType.REPS:
                                        displayComp = (
                                          <Grid item xs={3}>
                                            <Typography>{set.reps}</Typography>
                                          </Grid>
                                        );
                                        break;
                                      default:
                                        break;
                                    }
                                    return (
                                      <Grid key={index} item xs={12} container>
                                        <Grid item xs={12} container>
                                          <Grid item xs={2}>
                                            <Typography>
                                              {(set.setNumber += 1)}
                                            </Typography>
                                          </Grid>
                                          {displayComp}
                                        </Grid>
                                      </Grid>
                                    );
                                  }
                                )}
                              </Grid>
                            );
                          }
                        }
                      )}
                  </Grid>
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
