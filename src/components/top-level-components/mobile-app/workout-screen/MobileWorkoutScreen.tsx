import React from 'react';
import {
  Theme,
  useTheme,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from './views/components/TabPanel';
import FolderList from './views/3-preview-list/TossPreview';
import MessageAppBar from './views/components/MessageAppBar';
import WorkoutSelectionList from './views/1-workout-selection/WorkoutSelectionList';
import RoutineSelectionList from './views/2-routine-selection/RoutineSelectionList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      height: '8vh',
    },
  })
);

export default function MobileWorkoutScreen(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
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
            <FolderList />
          </TabPanel>
        </SwipeableViews>
      </Grid>
    </Grid>
  );
}
