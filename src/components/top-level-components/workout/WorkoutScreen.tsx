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
import { Button, Grid, Typography } from '@material-ui/core';
import { ExerciseVO } from '../../../configs/models/ExerciseVO';
import AddCircuitDialog from './circuit-accordian/dialogs/AddCircuitDialog';

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
          <Grid container spacing={3}>
            {circuits.map((circuit: NewCircuitProps, index: number) => {
              return (
                <Grid key={index} item xs={12}>
                  <Circuit
                    circuit={circuit}
                    exercises={exercises}
                    deleteClickHandler={this.props.deleteCircuitHandler}
                    addExerciseHandler={this.props.addExerciseHandler}
                    deleteExerciseHandler={this.props.deleteExerciseHandler}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    );
  }
}

export interface WorkoutScreenProps extends WithStyles<typeof styles> {
  exercises: ExerciseVO[];
  circuits: NewCircuitProps[];
  deleteCircuitHandler: (id: string) => void;
  saveWorkoutHandler: () => void;
  addExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
}

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
