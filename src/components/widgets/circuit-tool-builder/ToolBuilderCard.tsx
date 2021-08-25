import {
  Tab,
  Tabs,
  Card,
  Grid,
  AppBar,
  CardHeader,
  CardContent,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from '../../shared/SwipeableViewTabPanel';
import BottomExerciseDialog from './components/BottomExerciseDialog';
import ManikinFlippableSides from '../muscle-selector/ManikinFlippableSides';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
    },
    viewRoot: {
      height: '100%',
      borderRadius: 8,
      backgroundColor: '#F6F6F6',
    },
  })
);

export default function ToolBuilderCard(
  props: ToolBuilderCardProps
): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();

  const [state, setState] = useState({
    circuitId: '',
    viewIndex: 0,
    circuitNickname: '',
  });

  const handleViewChange = (index: number) => {
    setState({
      ...state,
      viewIndex: index,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<Record<string, never>>,
    newValue: number
  ) => {
    setState({
      ...state,
      viewIndex: newValue,
    });
  };

  return (
    <Card raised={false}>
      <CardHeader
        style={{ padding: 0 }}
        title={
          <AppBar position={'static'} color={'default'}>
            <Tabs
              value={state.viewIndex}
              onChange={handleChange}
              indicatorColor={'primary'}
              textColor={'primary'}
              variant={'fullWidth'}
              aria-label="full width tabs example"
            >
              <Tab label={'Muscle Groups'} value={0} />
              <Tab label={'Exercise List'} value={1} />
            </Tabs>
          </AppBar>
        }
      />
      <CardContent style={{ padding: 0 }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={state.viewIndex}
          onChangeIndex={handleViewChange}
          className={classes.viewRoot}
        >
          <TabPanel value={state.viewIndex} index={0}>
            <Grid container item xs={12}>
              <Grid item xs={12}>
                <BottomExerciseDialog />
              </Grid>
              <Grid item xs={12}>
                <ManikinFlippableSides />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={state.viewIndex} index={1}>
            <Typography>{'Exercise List'}</Typography>
          </TabPanel>
        </SwipeableViews>
      </CardContent>
    </Card>
  );
}

export interface ToolBuilderCardProps {
  DELETE_ME?: undefined;
}
