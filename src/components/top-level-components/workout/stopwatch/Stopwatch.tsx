import React from 'react';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Styles } from '@material-ui/styles';
import PauseIcon from '@material-ui/icons/Pause';
import { Button, Grid } from '@material-ui/core';
import StopwatchDisplay from './StopwatchDisplay';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  button: {
    width: '75%',
  },
});

class Stopwatch extends React.Component<StopwatchProps> {
  state = {
    running: false,
    currentTimeMs: 0,
    currentTimeSec: 0,
    currentTimeMin: 0,
    watch: 0,
  };

  start = (): void => {
    if (!this.state.running) {
      this.setState({
        running: true,
        watch: setInterval(() => this.pace(), 10),
      });
    }
  };

  stop = (): void => {
    this.setState({ running: false });
    if (this.state.watch !== null) {
      clearInterval(this.state.watch);
    }
  };

  pace = (): void => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({
        currentTimeSec: this.state.currentTimeSec + 1,
        currentTimeMs: 0,
      });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({
        currentTimeMin: this.state.currentTimeMin + 1,
        currentTimeSec: 0,
      });
    }
  };

  reset = (): void => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid style={{ textAlign: 'right' }} container alignItems={'center'}>
        <Grid item xs={4}>
          <StopwatchDisplay
            minutes={this.state.currentTimeMin}
            seconds={this.state.currentTimeSec}
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            variant={'contained'}
            color={this.state.running ? 'secondary' : 'primary'}
            className={classes.button}
            startIcon={this.state.running ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={this.state.running ? this.stop : this.start}
          >
            {this.state.running ? 'Pause' : 'Start'}
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            className={classes.button}
            variant={'contained'}
            onClick={this.reset}
          >
            {'Reset'}
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export type StopwatchProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(Stopwatch);