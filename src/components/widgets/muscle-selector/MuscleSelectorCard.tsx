import './muscle.css';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import MuscleGroupsManikin from './MuscleGroupsManikin';
import { Card, CardHeader, CardContent } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class MuscleSelectorCard extends Component<MuscleSelectorCardProps> {
  render(): JSX.Element {
    const { classes } = this.props;

    return (
      <Card>
        <CardHeader title={'Muscle Group Selector'} />

        <CardContent>
          <main>
            <div className={'muscle-groups'}>
              <h1>{'Muscle Group Selector'}</h1>

              <h2>{'Arms'}</h2>

              <label htmlFor={'biceps'}>{'Biceps'}</label>
              <input
                type={'checkbox'}
                className={'biceps muscles-helper'}
                id={'biceps'}
                value={' '}
              />
              <label htmlFor={'deltoids'}>{'Deltoids'}</label>
              <input
                type={'checkbox'}
                className={'deltoids muscles-helper'}
                id={'deltoids'}
                value={' '}
              />
              <label htmlFor={'forearms'}>{'Forearms'}</label>
              <input
                type={'checkbox'}
                className={'forearms muscles-helper'}
                id={'forearms'}
                value={' '}
              />
              <label htmlFor={'triceps'}>{'Triceps'}</label>
              <input
                type={'checkbox'}
                className={'triceps muscles-helper'}
                id={'triceps'}
                value={' '}
              />

              <h2>{'Back'}</h2>

              <label htmlFor={'trapezius'}>{'Trapezius'}</label>
              <input
                type={'checkbox'}
                className={'trapezius muscles-helper'}
                id={'trapezius'}
                value={' '}
              />

              <label htmlFor={'lats'}>{'Lats'}</label>
              <input
                type={'checkbox'}
                className={'lats muscles-helper'}
                id={'lats'}
                value={' '}
              />

              <h2>{'Core'}</h2>

              <label htmlFor={'abs'}>{'Abs'}</label>
              <input
                type={'checkbox'}
                className={'abs muscles-helper'}
                id={'abs'}
                value={' '}
              />
              <label htmlFor={'obliques'}>{'Obliques'}</label>
              <input
                type={'checkbox'}
                className={'obliques muscles-helper'}
                id={'obliques'}
                value={' '}
              />
              <label htmlFor={'pectorals'}>{'Pectorals'}</label>
              <input
                type={'checkbox'}
                className={'pectorals muscles-helper'}
                id={'pectorals'}
                value={' '}
              />

              <h2>{'Legs'}</h2>

              <label htmlFor={'adductors'}>{'Adductors'}</label>
              <input
                type={'checkbox'}
                className={'adductors muscles-helper'}
                id={'adductors'}
                value={' '}
              />

              <label htmlFor={'calves'}>{'Calves'}</label>
              <input
                type={'checkbox'}
                className={'calves muscles-helper'}
                id={'calves'}
                value={' '}
              />

              <label htmlFor={'hamstrings'}>{'Hamstrings'}</label>
              <input
                type={'checkbox'}
                className={'hamstrings muscles-helper'}
                id={'hamstrings'}
                value={' '}
              />

              <label htmlFor={'glutes'}>{'Glutes'}</label>
              <input
                type={'checkbox'}
                className={'glutes muscles-helper'}
                id={'glutes'}
                value={' '}
              />

              <label htmlFor={'quads'}>{'Quads'}</label>
              <input
                type={'checkbox'}
                className={'quads muscles-helper'}
                id={'quads'}
                value={' '}
              />

              <MuscleGroupsManikin />
            </div>
          </main>
        </CardContent>
      </Card>
    );
  }
}

export interface MuscleSelectorCardProps extends WithStyles<typeof styles> {
  DELETE_ME?: undefined;
}

export default withStyles(styles, { withTheme: true })(MuscleSelectorCard);
