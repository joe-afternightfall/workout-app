import {
  Theme,
  withStyles,
  WithStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import PreviewWorkoutList from './components/PreviewWorkoutList';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExercisesScreen extends Component<ExercisesScreenProps> {
  render(): JSX.Element {
    return (
      <Grid container justify={'center'}>
        <Grid item xs={12}>
          <PreviewWorkoutList />
        </Grid>
      </Grid>
    );
  }
}

export type ExercisesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
