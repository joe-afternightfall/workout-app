import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import TimeField from './text-fields/TimeField';

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
    <>
      <Grid item xs={3}>
        <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
      </Grid>

      <Grid item xs={3} />
    </>
  );
}

export interface TimedSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
