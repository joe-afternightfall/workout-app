import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import ExercisesWidget from '../../widgets/exercises/ExercisesWidget';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExercisesScreen extends Component<ExercisesScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container justify={'center'}>
        <Grid item xs={12}>
          <ExercisesWidget alwaysDisplayBackButton={false} />
        </Grid>
      </Grid>
    );
  }
}

export type ExercisesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
