import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { Styles } from '@material-ui/styles';
import ToolBuilderCard from '../../widgets/circuit-tool-builder/ToolBuilderCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class CircuitBuilderScreen extends Component<CircuitBuilderScreenProps> {
  render(): JSX.Element {
    return (
      <Grid xs={12} item container>
        <Grid item xs={5} />
        <Grid item xs={7}>
          <ToolBuilderCard />
        </Grid>
      </Grid>
    );
  }
}

export type CircuitBuilderScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(CircuitBuilderScreen);
