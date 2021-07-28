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
import Circuit from './circuit-accordian/Circuit';
import { Grid, Typography } from '@material-ui/core';
import { ExerciseVO } from '../../../configs/models/ExerciseVO';
import NewCircuitDialog from './circuit-accordian/dialogs/NewCircuitDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

// todo: rename prop to WorkoutCircuitProps
export interface NewCircuitProps {
  [key: string]: string | string[];
  id: string;
  type: string;
  exerciseIds: string[];
}

class WorkoutScreen extends Component<WorkoutScreenProps> {
  render(): JSX.Element {
    const { circuits, exercises } = this.props;
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>{'Workout'}</Typography>
          <DateInfo />
        </Grid>

        <Grid item xs={6}>
          <Stopwatch />
        </Grid>

        <Grid item xs={12}>
          <NewCircuitDialog />
        </Grid>

        {circuits.map((circuit: NewCircuitProps, index: number) => {
          return (
            <Grid key={index} item xs={12}>
              <Circuit
                circuit={circuit}
                exercises={exercises}
                deleteClickHandler={this.props.deleteCircuitHandler}
                addExerciseHandler={this.props.addExerciseHandler}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export interface WorkoutScreenProps extends WithStyles<typeof styles> {
  exercises: ExerciseVO[];
  circuits: NewCircuitProps[];
  deleteCircuitHandler: (id: string) => void;
  addExerciseHandler: (circuitId: string, exerciseId: string) => void;
}

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
