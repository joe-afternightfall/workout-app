import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Grid, Typography } from '@material-ui/core';
import TabPanel from '../../../shared/SwipeableViewTabPanel';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import ManikinFlippableSides from '../../muscle-selector/ManikinFlippableSides';
import BottomExerciseDialog from './BottomExerciseDialog';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
      // height: 300,
      // borderRadius: 8,
      // backgroundColor: '#282d35',
      backgroundColor: '#ececec',
      // backgroundColor: '#F6F6F6',
    },
  })
);

export default function BuilderViews(props: BuilderViewsProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={props.selectedIndex}
      onChangeIndex={props.viewChangeHandler}
      className={classes.root}
    >
      <TabPanel value={props.selectedIndex} index={0}>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <BottomExerciseDialog />
          </Grid>
          <Grid item xs={12}>
            <ManikinFlippableSides />
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={props.selectedIndex} index={1}>
        <Typography>{'Exercise List'}</Typography>
      </TabPanel>
    </SwipeableViews>
  );
}

export interface BuilderViewsProps {
  selectedIndex: number;
  viewChangeHandler: (index: number) => void;
}
