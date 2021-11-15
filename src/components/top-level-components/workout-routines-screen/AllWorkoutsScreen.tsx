import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { State } from '../../../configs/redux/store';
import MessageAppBar from './views/components/MessageAppBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditSet from './views/3-preview-list/components/edit-set/EditSet';
import PreviewWorkoutList from './views/3-preview-list/PreviewWorkoutList';
import WorkoutSelectionList from './views/1-category-selection/WorkoutSelectionList';
import RoutineSelectionList from './views/2-routine-selection/RoutineSelectionList';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '7vh',
    },
  })
);

const AllWorkoutsScreen = (props: AllWorkoutsScreenProps): JSX.Element => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const goForward = () => {
    setActiveIndex(activeIndex + 1);
  };

  const goBack = () => {
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

        {activeIndex === 0 && (
          <WorkoutSelectionList goForwardHandler={goForward} />
        )}

        {activeIndex === 1 && (
          <RoutineSelectionList goForwardHandler={goForward} />
        )}

        {activeIndex === 2 && <PreviewWorkoutList />}

        {props.displayEditSet && <EditSet />}
      </Grid>
    </Grid>
  );
};

interface AllWorkoutsScreenProps {
  displayEditSet: boolean;
}

const mapStateToProps = (state: State): AllWorkoutsScreenProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as AllWorkoutsScreenProps;
};

export default connect(mapStateToProps)(AllWorkoutsScreen);
