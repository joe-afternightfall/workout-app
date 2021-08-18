import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import MuscleSelectorCard from '../../widgets/muscle-selector/MuscleSelectorCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class CircuitBuilderScreen extends Component<CircuitBuilderScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Grid xs={12} item container>
        <Grid item xs={12} md={8}>
          <MuscleSelectorCard />
        </Grid>
      </Grid>
    );
  }
}

export type CircuitBuilderScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(CircuitBuilderScreen);
