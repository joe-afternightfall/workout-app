import React from 'react';
import { teal } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import WorkoutSelectionList from './1-workout-selection/WorkoutSelectionList';
import RoutineSelectionList from './2-routine-selection/RoutineSelectionList';
import PreviewList from './3-preview-list/PreviewList';
import MessageAppBar from './components/MessageAppBar';
import Typography from '@material-ui/core/Typography';
import FolderList from './3-preview-list/TossPreview';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    toolbar: theme.mixins.toolbar,
    actionArea: {
      color: '#fff',
      backgroundColor: teal[500],
      height: '13vh',
      // backgroundColor: '#404040',
      // backgroundColor: '#635cf4',
      // backgroundColor: '#534d9f',
      // backgroundColor: '#3CBDEDFF',
    },
  })
);

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function WorkoutSwipeableViews(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div>
      <MessageAppBar
        activeTab={value}
        clickHandler={() => {
          const newTab = value - 1;
          handleChangeIndex(newTab);
        }}
      />

      <div className={classes.toolbar} />

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
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
          <Typography>{'LATEST WORK SWIPE stuff'}</Typography>
          <FolderList />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
