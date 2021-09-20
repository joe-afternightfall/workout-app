import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import TransitionTab from './TransitionTab';
import { AnimatePresence } from 'framer-motion';
import { State } from '../../../../configs/redux/store';
import MessageAppBar from './views/components/MessageAppBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditSet from './views/3-preview-list/components/edit-set/EditSet';
import PreviewWorkoutList from './views/3-preview-list/PreviewWorkoutList';
import WorkoutSelectionList from './views/1-workout-selection/WorkoutSelectionList';
import RoutineSelectionList from './views/2-routine-selection/RoutineSelectionList';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '7vh',
    },
  })
);

const MobileWorkoutScreen = (props: MobileWorkoutScreenProps): JSX.Element => {
  const classes = useStyles();
  const [direction, setDirection] = React.useState<1 | -1>(1);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const goForward = () => {
    setDirection(1);
    setActiveIndex(activeIndex + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setActiveIndex(activeIndex - 1);
  };

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        {!props.displayEditSet && (
          <>
            <MessageAppBar activeTab={activeIndex} clickHandler={goBack} />
            <div className={classes.toolbar} />
          </>
        )}

        <AnimatePresence>
          <TransitionTab
            framerKey={0}
            direction={direction}
            isVisible={activeIndex === 0}
            component={<WorkoutSelectionList goForwardHandler={goForward} />}
          />
          <TransitionTab
            framerKey={1}
            direction={direction}
            isVisible={activeIndex === 1}
            component={<RoutineSelectionList goForwardHandler={goForward} />}
          />
          <TransitionTab
            framerKey={2}
            direction={direction}
            isVisible={activeIndex === 2}
            component={<PreviewWorkoutList />}
          />
          <TransitionTab
            framerKey={3}
            direction={direction}
            isVisible={props.displayEditSet}
            component={<EditSet />}
          />
        </AnimatePresence>
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
