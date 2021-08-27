import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MobileExercisesScreen extends Component<MobileExercisesScreenProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <div>
        <span>test</span>
      </div>
    );
  }
}

export interface MobileExercisesScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MobileExercisesScreen);
