import React, { ChangeEvent } from 'react';
import TimeField from './text-fields/TimeField';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export default function TimeAndRepsSet(
  props: TimeAndRepsSetProps
): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
      </Grid>

      <Grid item xs={3}>
        <TextField
          fullWidth
          name={'reps'}
          variant={'outlined'}
          value={props.set.reps}
          onChange={props.changeHandler}
        />
      </Grid>
    </>
  );
}

export interface TimeAndRepsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
