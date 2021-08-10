import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';

const useStyles = makeStyles(() =>
  createStyles({
    textfield: {
      width: '50%',
    },
  })
);

export default function TimedSet(props: TimedSetProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <TextField
        name={'time'}
        variant={'outlined'}
        className={classes.textfield}
        value={props.set.time}
        onChange={props.changeHandler}
      />
    </Grid>
  );
}

export interface TimedSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
