import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import DateInfo from './date-info/DateInfo';
import { Styles } from '@material-ui/styles';
import Stopwatch from './stopwatch/Stopwatch';
import Circuits from './circuit-accordian/Circuits';
import { Grid, Typography } from '@material-ui/core';
import AddCircuitDialog from './circuit-accordian/dialogs/AddCircuitDialog';
import WorkoutDoneDialog from './circuit-accordian/dialogs/WorkoutDoneDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

export interface CircuitExerciseSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  time: string;
  distance: string;
  markedDone: boolean;
}

export interface CircuitExercise {
  id: string;
  exerciseId: string;
  sets: CircuitExerciseSet[];
}

export interface WorkoutCircuitProps {
  id: string;
  name: string;
  exercises: CircuitExercise[];
}

class WorkoutScreen extends Component<WorkoutScreenProps> {
  render(): JSX.Element {
    const { circuits } = this.props;
    return (
      <Grid container>
        <Grid container item xs={6} alignItems={'center'} spacing={2}>
          <Grid item xs={6}>
            <DateInfo />
          </Grid>
          <Grid item>
            <AddCircuitDialog />
          </Grid>
          <Grid item>
            <WorkoutDoneDialog
              disabled={circuits.length === 0}
              saveWorkoutHandler={this.props.saveWorkoutHandler}
            />
          </Grid>
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Stopwatch />
          </Grid>
        </Grid>

        {circuits.length === 0 ? (
          <Grid
            container
            alignItems={'center'}
            justifyContent={'center'}
            style={{ height: '60vh' }}
          >
            <Typography>{'add a circuit to get started'}</Typography>
          </Grid>
        ) : (
          <Circuits />
        )}
      </Grid>
    );
  }
}

export interface WorkoutScreenProps extends WithStyles<typeof styles> {
  circuits: WorkoutCircuitProps[];
  saveWorkoutHandler: () => void;
}

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
