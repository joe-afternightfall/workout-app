import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import ProfileCard from './ProfileCard';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ProfileScreen extends Component<ProfileScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography>{'Profile'}</Typography>
        </Grid>

        <ProfileCard />
      </Grid>
    );
  }
}

export type ProfileScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ProfileScreen);
