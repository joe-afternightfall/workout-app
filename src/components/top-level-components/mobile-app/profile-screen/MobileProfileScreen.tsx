import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MobileProfileScreen extends Component<MobileProfileScreenProps> {
  render(): JSX.Element {
    // const { classes } = this.props;

    return (
      <div>
        <span>Profile Screen</span>
      </div>
    );
  }
}

interface MobileProfileScreenProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MobileProfileScreen);
