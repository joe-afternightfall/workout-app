import React, { ChangeEvent } from 'react';
import { CircuitExerciseSet } from '../../WorkoutScreen';
import AppTooltip from '../../../../app-shell/AppTooltip';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { Button, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    confirmButton: {
      background: '#C9F0DE',
      color: '#008E62',
      '&:hover': {
        background: '#A2EAC9',
      },
    },
    completedRow: {
      background: '#E4F3EC',
    },
    deleteButton: {
      background: '#F5DADB',
      color: '#D41417',
      '&:hover': {
        background: '#F4C3C3',
      },
    },
  })
);

export default function Set(props: SetProps): JSX.Element {
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const regExp = new RegExp('^[0-9]*$');

    if (regExp.test(event.target.value)) {
      const targetName = event.target.name;
      if (targetName === 'weight' || targetName === 'reps') {
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

  const markAsDone = () => {
    props.toggleExerciseSetHandler();
  };

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

      <Grid item xs={3}>
        <TextField
          value={props.set.weight}
          name={'weight'}
          style={{ width: '100%' }}
          variant={'outlined'}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={3}>
        <TextField
          value={props.set.reps}
          name={'reps'}
          style={{ width: '100%' }}
          variant={'outlined'}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={4}>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item>
            <AppTooltip
              element={
                <Button
                  className={classes.deleteButton}
                  onClick={() => {
                    props.deleteClickHandler();
                  }}
                >
                  <RemoveIcon />
                </Button>
              }
              title={'Delete Set'}
              placement={'left'}
            />
          </Grid>

          <Grid item>
            <AppTooltip
              element={
                <Button className={classes.confirmButton} onClick={markAsDone}>
                  <CheckIcon />
                </Button>
              }
              title={'Mark Done'}
              placement={'right'}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface SetProps {
  circuitId: string;
  exerciseId: string;
  set: CircuitExerciseSet;
  deleteClickHandler: () => void;
  toggleExerciseSetHandler: () => void;
  updateWorkoutSetFieldHandler: (
    circuitId: string,
    exerciseId: string,
    setId: string,
    name: 'weight' | 'reps',
    value: string
  ) => void;
}
