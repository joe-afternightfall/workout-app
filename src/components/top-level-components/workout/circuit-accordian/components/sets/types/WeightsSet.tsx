import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

export function WeightsSet(props: WeightsSetProps): JSX.Element {
  return (
    <>
      <Grid item xs={3}>
        <TextField
          fullWidth
          name={'weight'}
          variant={'outlined'}
          value={props.set.weight}
          onChange={props.changeHandler}
        />
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

export interface WeightsSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
