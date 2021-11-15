import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { isOdd } from '../../../../utils/number-util';
import { State } from '../../../../configs/redux/store';
import { routerActions } from 'connected-react-router';
import { WorkoutCategoryVO } from 'workout-app-common-core';
import SelectionCard from '../shared-components/SelectionCard';
import WorkoutScreensAppBar from '../shared-components/WorkoutScreensAppBar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditSet from '../3-preview-workout/components/edit-set/EditSet';
import { ROUTINES_SCREEN_PATH } from '../../../../configs/constants/app-routing';
import { selectedWorkoutCategory } from '../../../../creators/workout/workout-selections';

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

  const goBack = () => {
    setActiveIndex(activeIndex - 1);
  };

  return (
    <Grid container justify={'center'}>
      <Grid item xs={12}>
        {!props.displayEditSet && (
          <>
            <WorkoutScreensAppBar
              activeTab={activeIndex}
              clickHandler={goBack}
            />
            <div className={classes.toolbar} />
          </>
        )}

        {props.workoutCategories.map(
          (category: WorkoutCategoryVO, index: number) => {
            return (
              <Grid key={category.id} item xs={12}>
                <SelectionCard
                  title={category.name}
                  addTopMargin={index > 0}
                  clickHandler={() => {
                    props.selectWorkoutCategoryHandler(category);
                  }}
                  justify={isOdd(index) ? 'flex-end' : 'flex-start'}
                />
              </Grid>
            );
          }
        )}

        {props.displayEditSet && <EditSet />}
      </Grid>
    </Grid>
  );
};

interface AllWorkoutsScreenProps {
  displayEditSet: boolean;
  workoutCategories: WorkoutCategoryVO[];
  selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => void;
}

const mapStateToProps = (state: State): AllWorkoutsScreenProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
    workoutCategories:
      state.applicationState.workoutConfigurations.workoutCategories,
  } as unknown as AllWorkoutsScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): AllWorkoutsScreenProps =>
  ({
    selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => {
      dispatch(selectedWorkoutCategory(category));
      dispatch(routerActions.push(ROUTINES_SCREEN_PATH));
    },
  } as unknown as AllWorkoutsScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(AllWorkoutsScreen);
