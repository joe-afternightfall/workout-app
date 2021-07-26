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

    const deleteCircuit = (id: string) => {
      const circuits = this.state.circuits;
      const foundCircuit = circuits.find(
        (circuit: NewCircuitProps) => circuit.id === id
      );
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
          ? this.state.circuits.map(
              (circuit: NewCircuitProps, index: number) => {
                return (
                  <Grid key={index} item xs={12}>
                    <Circuit
                      circuit={circuit}
                      deleteClickHandler={deleteCircuit}
                    />
                  </Grid>
                );
              }
            )
          : undefined}
      </Grid>
    );
  }
}

export type WorkoutScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
