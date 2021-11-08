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

class MobileExercisesScreen extends Component<MobileExercisesScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container item xs={12}>
        <ExercisesWidget />
      </Grid>
    );
  }
}

export type MobileExercisesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MobileExercisesScreen);
