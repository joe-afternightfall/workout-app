import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../../shared/SwipeableViewTabPanel';
import { Grid, Typography } from '@material-ui/core';
import FrontSide from '../../muscle-selector/manikin/FrontSide';
import FrontSideControls from '../../muscle-selector/controls/FrontSideControls';

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
        <Grid container item xs={12} justify={'center'}>
          <Grid item xs={4}>
            <FrontSideControls />
          </Grid>
          <Grid item xs={8}>
            <FrontSide />
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
