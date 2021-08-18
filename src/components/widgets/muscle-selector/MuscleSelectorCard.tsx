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
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';
import SelectorControls from './SelectorControls';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  cardHeader: {
    // margin: '-0.5rem -1rem 1rem',
    // padding: '0 1rem 0.75rem',
    background: '#00bcd4',
    color: '#eee',
    textAlign: 'center',
    // fontSize: '1.25rem',
  },
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
          <Grid container item xs={12}>
            <div className={'muscle-groups'}>
              <h2>{'Arms'}</h2>

              <SelectorControls inputId={'biceps'} title={'Biceps'} />
              <SelectorControls inputId={'deltoids'} title={'Deltoids'} />
              <SelectorControls inputId={'forearms'} title={'Forearms'} />
              <SelectorControls inputId={'triceps'} title={'Triceps'} />

              <h2>{'Back'}</h2>

              <SelectorControls inputId={'trapezius'} title={'Trapezius'} />
              <SelectorControls inputId={'lats'} title={'Lats'} />

              <h2>{'Core'}</h2>
              <SelectorControls inputId={'abs'} title={'Abs'} />
              <SelectorControls inputId={'obliques'} title={'Obliques'} />
              <SelectorControls inputId={'pectorals'} title={'Pectorals'} />

              <h2>{'Legs'}</h2>
              <SelectorControls inputId={'adductors'} title={'Adductors'} />
              <SelectorControls inputId={'calves'} title={'Calves'} />
              <SelectorControls inputId={'hamstrings'} title={'Hamstrings'} />
              <SelectorControls inputId={'glutes'} title={'Glutes'} />
              <SelectorControls inputId={'quads'} title={'Quads'} />

              <Manikin />
            </div>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export interface MuscleSelectorCardProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MuscleSelectorCard);
