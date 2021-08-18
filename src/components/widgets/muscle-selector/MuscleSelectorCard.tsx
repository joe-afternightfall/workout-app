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

              <input
                type={'checkbox'}
                className={'biceps muscles-helper'}
                id={'biceps'}
                value={' '}
              />
              <label htmlFor={'biceps'}>{'Biceps'}</label>

              <input
                type={'checkbox'}
                className={'deltoids muscles-helper'}
                id={'deltoids'}
                value={' '}
              />
              <label htmlFor={'deltoids'}>{'Deltoids'}</label>

              <input
                type={'checkbox'}
                className={'forearms muscles-helper'}
                id={'forearms'}
                value={' '}
              />
              <label htmlFor={'forearms'}>{'Forearms'}</label>

              <input
                type={'checkbox'}
                className={'triceps muscles-helper'}
                id={'triceps'}
                value={' '}
              />
              <label htmlFor={'triceps'}>{'Triceps'}</label>

              <h2>{'Back'}</h2>

              <input
                type={'checkbox'}
                className={'trapezius muscles-helper'}
                id={'trapezius'}
                value={' '}
              />
              <label htmlFor={'trapezius'}>{'Trapezius'}</label>

              <input
                type={'checkbox'}
                className={'lats muscles-helper'}
                id={'lats'}
                value={' '}
              />
              <label htmlFor={'lats'}>{'Lats'}</label>

              <h2>{'Core'}</h2>

              <input
                type={'checkbox'}
                className={'abs muscles-helper'}
                id={'abs'}
                value={' '}
              />
              <label htmlFor={'abs'}>{'Abs'}</label>

              <input
                type={'checkbox'}
                className={'obliques muscles-helper'}
                id={'obliques'}
                value={' '}
              />
              <label htmlFor={'obliques'}>{'Obliques'}</label>

              <input
                type={'checkbox'}
                className={'pectorals muscles-helper'}
                id={'pectorals'}
                value={' '}
              />
              <label htmlFor={'pectorals'}>{'Pectorals'}</label>

              <h2>{'Legs'}</h2>

              <input
                type={'checkbox'}
                className={'adductors muscles-helper'}
                id={'adductors'}
                value={' '}
              />
              <label htmlFor={'adductors'}>{'Adductors'}</label>

              <input
                type={'checkbox'}
                className={'calves muscles-helper'}
                id={'calves'}
                value={' '}
              />
              <label htmlFor={'calves'}>{'Calves'}</label>

              <input
                type={'checkbox'}
                className={'hamstrings muscles-helper'}
                id={'hamstrings'}
                value={' '}
              />
              <label htmlFor={'hamstrings'}>{'Hamstrings'}</label>

              <input
                type={'checkbox'}
                className={'glutes muscles-helper'}
                id={'glutes'}
                value={' '}
              />
              <label htmlFor={'glutes'}>{'Glutes'}</label>

              <input
                type={'checkbox'}
                className={'quads muscles-helper'}
                id={'quads'}
                value={' '}
              />
              <label htmlFor={'quads'}>{'Quads'}</label>

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
