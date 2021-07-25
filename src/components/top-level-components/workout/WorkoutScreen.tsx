import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import Stopwatch from './stopwatch/Stopwatch';
import Circuit from './circuit-accordian/Circuit';
import { Grid, Typography } from '@material-ui/core';
import NewCircuitDialog from './circuit-accordian/NewCircuitDialog';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  root: {
    width: '100%',
  },
});

export interface NewCircuitProps {
  id: string;
  type: string;
}

class WorkoutScreen extends Component<WorkoutScreenProps> {
  state = {
    circuits: [],
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const addCircuit = (props: NewCircuitProps) => {
      this.setState({
        circuits: [
          ...this.state.circuits,
          {
            id: props.id,
            type: props.type,
          },
        ],
      });
    };

    const handleDelete = (id: string) => {
      const circuits = this.state.circuits;
      const foundCircuit = circuits.find((circuit: string) => circuit === id);
      if (foundCircuit) {
        const foundIndex = circuits.indexOf(foundCircuit);
        circuits.splice(foundIndex, 1);
        this.setState({
          circuits: circuits,
        });
      }
    };

    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography>{'Workout'}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Stopwatch />
        </Grid>

        <Grid item xs={12}>
          <NewCircuitDialog addCircuitHandler={addCircuit} />
        </Grid>

        {this.state.circuits
          ? this.state.circuits.map((circuitId: string, index: number) => {
              return (
                <Grid key={index} item xs={12}>
                  <Circuit id={circuitId} deleteClickHandler={handleDelete} />
                </Grid>
              );
            })
          : undefined}
      </Grid>
    );
  }
}

export type WorkoutScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
