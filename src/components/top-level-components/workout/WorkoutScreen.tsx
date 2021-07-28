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

export interface NewCircuitProps {
  id: string;
  type: string;
}

class WorkoutScreen extends Component<WorkoutScreenProps> {
  state = {
    circuits: [],
  };

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
}

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
