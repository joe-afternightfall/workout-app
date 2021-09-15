import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import TabPanel from './views/components/TabPanel';
import SwipeableViews from 'react-swipeable-views';
import EditSet from './views/3-preview-list/EditSet';
import MessageAppBar from './views/components/MessageAppBar';
import PreviewWorkoutList from './views/3-preview-list/PreviewWorkoutList';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import WorkoutSelectionList from './views/1-workout-selection/WorkoutSelectionList';
import RoutineSelectionList from './views/2-routine-selection/RoutineSelectionList';
import { State } from '../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '7vh',
    },
  })
);

const MobileWorkoutScreen = (props: MobileWorkoutScreenProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return props.displayEditSet ? (
    <EditSet />
  ) : (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        <MessageAppBar
          activeTab={value}
          clickHandler={() => {
            const newTab = value - 1;
            handleChangeIndex(newTab);
          }}
        />

        <div className={classes.toolbar} />

        <SwipeableViews
          disabled
          index={value}
          onChangeIndex={handleChangeIndex}
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          containerStyle={{
            transition: 'transform 0.35s cubic-bezier(0.15, 0.3, 0.25, 1) 0s',
          }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <WorkoutSelectionList
              goForwardHandler={() => {
                handleChangeIndex(1);
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <RoutineSelectionList
              goForwardHandler={() => {
                handleChangeIndex(2);
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <PreviewWorkoutList />
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
};

export interface MobileWorkoutScreenProps {
  displayEditSet: boolean;
}

const mapStateToProps = (state: State): MobileWorkoutScreenProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as MobileWorkoutScreenProps;
};

export default connect(mapStateToProps)(MobileWorkoutScreen);
