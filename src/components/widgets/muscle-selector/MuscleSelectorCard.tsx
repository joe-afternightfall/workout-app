import './muscle.css';
import './muscle';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import Manikin from './Manikin';
import {
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import SelectorControls from './SelectorControls';
import SectionTitle from './controls/SectionTitle';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  cardHeader: {
    // margin: '-0.5rem -1rem 1rem',
    // padding: '0 1rem 0.75rem',
    background: '#00bcd4',
    color: '#eee',
    textAlign: 'center',
    // fontSize: '1.25rem',
  },
  sectionTitle: {},
});

class MuscleSelectorCard extends Component<MuscleSelectorCardProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader
          className={classes.cardHeader}
          title={'Muscle Group Selector'}
        />

        <CardContent>
          <div className={'muscle-groups'}>
            <SectionTitle title={'Arms'} />
            <SelectorControls inputId={'biceps'} title={'Biceps'} />
            <SelectorControls inputId={'deltoids'} title={'Deltoids'} />
            <SelectorControls inputId={'forearms'} title={'Forearms'} />
            <SelectorControls inputId={'triceps'} title={'Triceps'} />

            <SectionTitle title={'Back'} />
            <SelectorControls inputId={'trapezius'} title={'Trapezius'} />
            <SelectorControls inputId={'lats'} title={'Lats'} />

            <SectionTitle title={'Core'} />
            <SelectorControls inputId={'abs'} title={'Abs'} />
            <SelectorControls inputId={'obliques'} title={'Obliques'} />
            <SelectorControls inputId={'pectorals'} title={'Pectorals'} />

            <SectionTitle title={'Legs'} />
            <SelectorControls inputId={'adductors'} title={'Adductors'} />
            <SelectorControls inputId={'calves'} title={'Calves'} />
            <SelectorControls inputId={'hamstrings'} title={'Hamstrings'} />
            <SelectorControls inputId={'glutes'} title={'Glutes'} />
            <SelectorControls inputId={'quads'} title={'Quads'} />

            <Manikin />
          </div>
        </CardContent>
      </Card>
    );
  }
}

export interface MuscleSelectorCardProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MuscleSelectorCard);
