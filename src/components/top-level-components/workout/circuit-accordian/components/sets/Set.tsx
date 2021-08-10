import RepsSet from './types/RepsSet';
import TimedSet from './types/TimedSet';
import React, { ChangeEvent } from 'react';
import {
  UpdateTimeSetFieldProps,
  UpdateWorkoutSetFieldProps,
} from '../../../../../../creators/workout';
import { WeightsSet } from './types/WeightsSet';
import SetActionButtons from './SetActionButtons';
import TimeAndRepsSet from './types/TimeAndRepsSet';
import { Grid, Typography } from '@material-ui/core';
import TimeAndDistanceSet from './types/TimeAndDistanceSet';
import { CircuitExerciseSet } from '../../../WorkoutScreen';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SetType } from '../../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';
import { ExerciseTypeVO } from '../../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

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
        targetName === 'distance'
      ) {
        props.updateWorkoutSetFieldHandler({
          circuitId: props.circuitId,
          exerciseId: props.exerciseId,
          setId: props.set.id,
          name: targetName,
          value: event.target.value,
        });
      }
    }
  };

  const handleTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('^[0-9]*$');

    if (regExp.test(event.target.value)) {
      const targetName = event.target.name;

      if (
        targetName === 'hours' ||
        targetName === 'minutes' ||
        targetName === 'seconds'
      ) {
        props.updateTimeSetFieldHandler({
          circuitId: props.circuitId,
          exerciseId: props.exerciseId,
          setId: props.set.id,
          name: targetName,
          value: event.target.value,
        });
      }
    }
  };

  let setComponent: JSX.Element = <div />;

  switch (props.exercise.setType) {
    case SetType.TIME_AND_REPS:
      setComponent = (
        <TimeAndRepsSet
          set={props.set}
          changeHandler={handleChange}
          timeChangeHandler={handleTimeChange}
        />
      );
      break;
    case SetType.TIME:
      setComponent = (
        <TimedSet
          set={props.set}
          changeHandler={handleTimeChange}
          timeChangeHandler={handleTimeChange}
        />
      );
      break;
    case SetType.TIME_AND_DISTANCE:
      setComponent = (
        <TimeAndDistanceSet
          set={props.set}
          changeHandler={handleChange}
          timeChangeHandler={handleTimeChange}
        />
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
  updateWorkoutSetFieldHandler: (props: UpdateWorkoutSetFieldProps) => void;
  updateTimeSetFieldHandler: (props: UpdateTimeSetFieldProps) => void;
}
