import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import TimerTest from '../widgets/workout/timer/TimerTest';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class WorkoutScreen extends Component<WorkoutScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div>
        <span>{'Workout'}</span>
        <TimerTest />
      </div>
    );
  }
}

export type WorkoutScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(WorkoutScreen);
