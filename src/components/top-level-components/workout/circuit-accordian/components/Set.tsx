import {
  Button,
  Fade,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutlineOutlined';
import { CircuitExerciseSet } from '../../WorkoutScreen';

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
            <Tooltip
              arrow
              interactive
              enterDelay={500}
              leaveDelay={200}
              placement={'left'}
              title={'Delete Set'}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Button
                className={classes.deleteButton}
                onClick={() => {
                  props.deleteClickHandler();
                }}
              >
                <RemoveIcon />
              </Button>
            </Tooltip>
          </Grid>

          <Grid item>
            <Tooltip
              arrow
              interactive
              enterDelay={500}
              leaveDelay={200}
              placement={'right'}
              title={'Mark Done'}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Button className={classes.confirmButton} onClick={markAsDone}>
                <CheckIcon />
              </Button>
            </Tooltip>
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
