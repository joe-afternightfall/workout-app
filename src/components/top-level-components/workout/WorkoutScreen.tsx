import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import {
  Button,
  Card,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import WorkoutCard from '../../widgets/workout/WorkoutCard';
import Stopwatch from '../../widgets/workout/stopwatch/Stopwatch';
import { Container, Draggable } from 'react-smooth-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import { v4 as uuidv4 } from 'uuid';
import Circuit from './circuit-accordian/Circuit';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    width: '100%',
  },
});

class WorkoutScreen extends Component<WorkoutScreenProps> {
  state = {
    circuits: [],
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const addCircuit = (id: string) => {
      this.setState({
        circuits: [...this.state.circuits, id],
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
          <Button
            onClick={() => {
              addCircuit(uuidv4());
            }}
          >
            {'Click to add circuit'}
          </Button>
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
