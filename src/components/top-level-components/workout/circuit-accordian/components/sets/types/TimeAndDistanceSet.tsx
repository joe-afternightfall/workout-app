import React, { ChangeEvent } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { CircuitExerciseSet } from '../../../../WorkoutScreen';
import { Grid, TextField } from '@material-ui/core';
import TimeField from './text-fields/TimeField';

const useStyles = makeStyles(() =>
  createStyles({
    textfield: {
      width: '100%',
    },
  })
);

export default function TimeAndDistanceSet(
  props: TimeAndDistanceSetProps
): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={3}>
        <TimeField set={props.set} changeHandler={props.timeChangeHandler} />
      </Grid>

      <Grid item xs={3}>
        <TextField
          name={'distance'}
          variant={'outlined'}
          className={classes.textfield}
          value={props.set.distance}
          onChange={props.changeHandler}
        />
      </Grid>
    </>
  );
}

export interface TimeAndDistanceSetProps {
  set: CircuitExerciseSet;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  timeChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
