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
import { Button, Grid, Typography } from '@material-ui/core';
import AddCircuitDialog from './circuit-accordian/dialogs/AddCircuitDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

export interface CircuitExerciseSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  markedDone: boolean;
}

export interface CircuitExercise {
  id: string;
  exerciseId: string;
  sets: CircuitExerciseSet[];
}

// todo: rename prop to WorkoutCircuitProps
export interface NewCircuitProps {
  id: string;
  name: string;
  exercises: CircuitExercise[];
}

class WorkoutScreen extends Component<WorkoutScreenProps> {
  render(): JSX.Element {
    const { circuits } = this.props;
    return (
      <Grid container>
        <Grid item xs={6}>
          <DateInfo />
        </Grid>

        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Stopwatch />
          </Grid>
          <Grid container item xs={12} justify={'flex-end'}>
            <Grid item xs={6}>
              <Button onClick={this.props.saveWorkoutHandler}>{'Save'}</Button>
            </Grid>

            <Grid item xs={6}>
              <AddCircuitDialog />
            </Grid>
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
  circuits: NewCircuitProps[];
  saveWorkoutHandler: () => void;
}

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
