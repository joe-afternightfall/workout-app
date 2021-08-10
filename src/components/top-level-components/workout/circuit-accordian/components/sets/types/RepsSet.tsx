import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export default function RepsSet(props: RepsSetProps): JSX.Element {
  return (
    <Grid item xs={6}>
      <TextField
        fullWidth
        name={'reps'}
        variant={'outlined'}
        value={props.set.reps}
        onChange={props.changeHandler}
      />
    </Grid>
  );
}

export interface RepsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
