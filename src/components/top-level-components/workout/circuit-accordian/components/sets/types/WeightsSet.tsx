import React, { ChangeEvent } from 'react';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    textfield: {
      width: '100%',
    },
  })
);

export function WeightsSet(props: WeightsSetProps): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <TextField
          name={'weight'}
          className={classes.textfield}
          variant={'outlined'}
          value={props.set.weight}
          onChange={props.changeHandler}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          value={props.set.reps}
          name={'reps'}
          style={{ width: '100%' }}
          variant={'outlined'}
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
