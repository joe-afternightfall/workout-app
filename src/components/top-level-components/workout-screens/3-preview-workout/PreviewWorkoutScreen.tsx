import {
  Theme,
  withStyles,
  WithStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import PreviewWorkoutList from './components/PreviewWorkoutList';
import BaseWorkoutScreen from '../shared-components/BaseWorkoutScreen';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExercisesScreen extends Component<ExercisesScreenProps> {
  render(): JSX.Element {
    return <BaseWorkoutScreen centerComponent={<PreviewWorkoutList />} />;
  }
}

export type ExercisesScreenProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(ExercisesScreen);
