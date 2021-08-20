import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import { Manikin } from './Manikin';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import SectionTitle from './controls/SectionTitle';
import SelectorControl from './controls/SelectorControl';
import { Card, CardHeader, CardContent, Grid } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({
  cardHeader: {
    background: '#00bcd4',
    color: '#eee',
    textAlign: 'center',
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
          <Grid container>
            <Grid item xs={4}>
              <SectionTitle title={'Arms'} />
              <SelectorControl inputId={'biceps'} title={'Biceps'} />
              <SelectorControl inputId={'deltoids'} title={'Deltoids'} />
              <SelectorControl inputId={'forearms'} title={'Forearms'} />
              <SelectorControl inputId={'triceps'} title={'Triceps'} />

              <SectionTitle title={'Back'} />
              <SelectorControl inputId={'trapezius'} title={'Trapezius'} />
              <SelectorControl inputId={'lats'} title={'Lats'} />

              <SectionTitle title={'Core'} />
              <SelectorControl inputId={'abs'} title={'Abs'} />
              <SelectorControl inputId={'obliques'} title={'Obliques'} />
              <SelectorControl inputId={'pectorals'} title={'Pectorals'} />

              <SectionTitle title={'Legs'} />
              <SelectorControl inputId={'adductors'} title={'Adductors'} />
              <SelectorControl inputId={'calves'} title={'Calves'} />
              <SelectorControl inputId={'hamstrings'} title={'Hamstrings'} />
              <SelectorControl inputId={'glutes'} title={'Glutes'} />
              <SelectorControl inputId={'quads'} title={'Quads'} />
            </Grid>
            <Grid item xs={8}>
              <Manikin />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export type MuscleSelectorCardProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(MuscleSelectorCard);
