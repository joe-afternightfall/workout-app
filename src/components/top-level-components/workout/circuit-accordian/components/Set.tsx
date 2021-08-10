import React, { ChangeEvent } from 'react';
import RepsSet from './sets/types/RepsSet';
import TimedSet from './sets/types/TimedSet';
import { Grid, Typography } from '@material-ui/core';
import { WeightsSet } from './sets/types/WeightsSet';
import SetActionButtons from './sets/SetActionButtons';
import { CircuitExerciseSet } from '../../WorkoutScreen';
import TimeAndRepsSet from './sets/types/TimeAndRepsSet';
import TimeAndDistanceSet from './sets/types/TimeAndDistanceSet';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SetType } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

const useStyles = makeStyles(() =>
  createStyles({
    completedRow: {
      background: '#E4F3EC',
    },
  })
);

export default function Set(props: SetProps): JSX.Element {
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('^[0-9]*$');

    if (regExp.test(event.target.value)) {
      const targetName = event.target.name;
      if (
        targetName === 'weight' ||
        targetName === 'reps' ||
        targetName === 'time' ||
        targetName === 'distance'
      ) {
        props.updateWorkoutSetFieldHandler(
          props.circuitId,
          props.exerciseId,
          props.set.id,
          targetName,
          event.target.value
        );
      }
    }
  };

  let setComponent: JSX.Element = <div />;

  switch (props.exercise.setType) {
    case SetType.TIME_AND_REPS:
      setComponent = (
        <TimeAndRepsSet set={props.set} changeHandler={handleChange} />
      );
      break;
    case SetType.TIME:
      setComponent = <TimedSet set={props.set} changeHandler={handleChange} />;
      break;
    case SetType.TIME_AND_DISTANCE:
      setComponent = (
        <TimeAndDistanceSet set={props.set} changeHandler={handleChange} />
      );
      break;
    case SetType.WEIGHTS:
      setComponent = (
        <WeightsSet set={props.set} changeHandler={handleChange} />
      );
      break;
    case SetType.REPS:
      setComponent = <RepsSet set={props.set} changeHandler={handleChange} />;
      break;
    default:
      break;
  }

  return (
    <Grid
      item
      xs={12}
      container
      alignItems={'center'}
      spacing={2}
      className={props.set.markedDone ? classes.completedRow : ''}
    >
      <Grid item xs={2}>
        <Typography>{props.set.setNumber + 1}</Typography>
      </Grid>

      {setComponent}

      <Grid item xs={4}>
        <SetActionButtons
          deleteSetClickHandler={props.deleteClickHandler}
          toggleExerciseSetHandler={props.toggleExerciseSetHandler}
        />
      </Grid>
    </Grid>
  );
}

export interface SetProps {
  circuitId: string;
  exerciseId: string;
  exercise: ExerciseTypeVO;
  set: CircuitExerciseSet;
  deleteClickHandler: () => void;
  toggleExerciseSetHandler: () => void;
  updateWorkoutSetFieldHandler: (
    circuitId: string,
    exerciseId: string,
    setId: string,
    name: 'weight' | 'reps' | 'time' | 'distance',
    value: string
  ) => void;
}
