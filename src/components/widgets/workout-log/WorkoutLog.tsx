import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import { Workout } from 'workout-app-common-core';
import TopAppBar from '../../app-shell/TopAppBar';
import SwipeableViews from 'react-swipeable-views';
import LogList from './components/log-list/LogList';
import { State } from '../../../configs/redux/store';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import AllPastWorkouts from './components/AllPastWorkouts';
import { Button, Grid, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { groupWorkoutsByMonth } from '../../../utils/group-workouts';

const useStyles = makeStyles(() =>
  createStyles({
    swipeableViews: {
      width: '100%',
      height: '82vh',
      marginTop: '5vh',
      marginLeft: '-12px',
      position: 'absolute',
    },
  })
);

const WorkoutLog = (props: WorkoutLogProps): JSX.Element => {
  const classes = useStyles();
  const { pastWorkouts } = props;
  const [activeTab, setActiveTab] = useState(0);
  const lastThreeWorkouts = pastWorkouts && pastWorkouts.slice(0, 3);

  const forwardClickHandler = () => {
    setActiveTab(activeTab + 1);
  };

  const backClickHandler = () => {
    setActiveTab(activeTab - 1);
  };

  const handleViewChange = (index: number) => {
    setActiveTab(index);
  };

  let title = '';
  switch (activeTab) {
    case 0:
      title = 'Latest Workouts';
      break;
    case 1:
      title = 'All Workouts';
      break;
    case 2:
      title = '';
      break;
    default:
      break;
  }

  groupWorkoutsByMonth(pastWorkouts);

  return (
    <Grid item xs={12}>
      <TopAppBar
        hideToolbarMixin
        title={title}
        leftButton={
          activeTab !== 0 ? (
            <IconButton onClick={backClickHandler}>
              <ArrowBack />
            </IconButton>
          ) : undefined
        }
        rightButton={<Button onClick={forwardClickHandler}>{'More'}</Button>}
      />
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleViewChange}
        className={classes.swipeableViews}
        containerStyle={{ height: '100%' }}
      >
        <Grid item xs={12}>
          {pastWorkouts && <LogList workouts={lastThreeWorkouts} />}
        </Grid>
        <Grid item xs={12}>
          {pastWorkouts && (
            <AllPastWorkouts
              goBackHandler={backClickHandler}
              workouts={pastWorkouts}
            />
          )}
        </Grid>
      </SwipeableViews>
    </Grid>
  );
};

interface WorkoutLogProps {
  pastWorkouts: Workout[];
}

const mapStateToProps = (state: State): WorkoutLogProps => {
  return {
    pastWorkouts:
      state.applicationState.userProfile?.workouts &&
      state.applicationState.userProfile?.workouts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
  } as unknown as WorkoutLogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutLogProps =>
  ({} as unknown as WorkoutLogProps);

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLog);
