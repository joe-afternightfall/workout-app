import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    textfield: {
      width: '100%',
    },
  })
);

export default function TimeAndRepsSet(
  props: TimeAndRepsSetProps
): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <TextField
          name={'time'}
          variant={'outlined'}
          className={classes.textfield}
          value={props.set.time}
          onChange={props.changeHandler}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          name={'reps'}
          variant={'outlined'}
          className={classes.textfield}
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
}