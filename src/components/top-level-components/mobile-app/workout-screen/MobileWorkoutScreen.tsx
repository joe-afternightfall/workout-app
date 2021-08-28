import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MobileWorkoutScreen extends Component<MobileWorkoutScreenProps> {
  render(): JSX.Element {
    // const { classes } = this.props;

    return <div>MOBILE WORKOUT SCREEN</div>;
  }
}

export interface MobileWorkoutScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MobileWorkoutScreen);
