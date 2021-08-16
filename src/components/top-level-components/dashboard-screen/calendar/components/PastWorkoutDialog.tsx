import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { WorkoutVO } from '../../../../../configs/models/WorkoutVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export default function PastWorkoutDialog(
  props: PastWorkoutDialogProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>
          {`Workout Info for: ${props.workout && props.workout.workoutDate}`}
        </Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Typography>
          {props.workout &&
            props.workout.circuits.map((circuit, index: number) => {
              return (
                <Grid key={index} container>
                  <Grid item xs={12}>
                    <Typography>{circuit.name}</Typography>
                    <Typography>{JSON.stringify(circuit.exercises)}</Typography>
                  </Grid>
                </Grid>
              );
            })}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}

export interface PastWorkoutDialogProps {
  open: boolean;
  workout: WorkoutVO | undefined;
  closeClickHandler: () => void;
}
