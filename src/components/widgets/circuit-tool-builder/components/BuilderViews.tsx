import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../../shared/SwipeableViewTabPanel';
import { Button, Grid, Typography } from '@material-ui/core';
import FrontSide from '../../muscle-selector/manikin/FrontSide';
import FrontSideControls from '../../muscle-selector/controls/FrontSideControls';
import BackSideControls from '../../muscle-selector/controls/BackSideControls';
import BackSide from '../../muscle-selector/manikin/BackSide';

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
  const [displayFront, setDisplayFront] = useState<boolean>(true);

  return (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={props.selectedIndex}
      onChangeIndex={props.viewChangeHandler}
      className={classes.root}
    >
      <TabPanel value={props.selectedIndex} index={0}>
        <Grid container item xs={12}>
          <Grid item xs={12} container justify={'flex-end'}>
            <Grid item>
              <Button
                onClick={() => {
                  setDisplayFront(!displayFront);
                }}
              >
                {displayFront ? 'Back Muscle Groups' : 'Front Muscle Groups'}
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {displayFront ? <FrontSideControls /> : <BackSideControls />}
          </Grid>
          <Grid item xs={8}>
            {displayFront ? <FrontSide /> : <BackSide />}
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
