import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import { isOdd } from '../../../../../utils/number-util';
import { State } from '../../../../../configs/redux/store';
import { selectedWorkoutCategory } from '../../../../../creators/workout/workout-selections';
import { WorkoutCategoryVO } from 'workout-app-common-core';

const WorkoutSelectionList = (
  props: WorkoutSelectionListProps & PassedInProps
): JSX.Element => {
  return (
    <>
      {props.workoutCategories.map(
        (category: WorkoutCategoryVO, index: number) => {
          return (
            <Grid key={category.id} item xs={12}>
              <SelectionCard
                title={category.name}
                addTopMargin={index > 0}
                clickHandler={() => {
                  props.selectWorkoutCategoryHandler(category);
                  props.goForwardHandler();
                }}
                justify={isOdd(index) ? 'flex-end' : 'flex-start'}
              />
            </Grid>
          );
        }
      )}
    </>
  );
};

interface PassedInProps {
  goForwardHandler: () => void;
}

interface WorkoutSelectionListProps {
  workoutCategories: WorkoutCategoryVO[];
  selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => void;
}

const mapStateToProps = (state: State): WorkoutSelectionListProps => {
  return {
    workoutCategories:
      state.applicationState.workoutConfigurations.workoutCategories,
  } as unknown as WorkoutSelectionListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WorkoutSelectionListProps =>
  ({
    selectWorkoutCategoryHandler: (category: WorkoutCategoryVO) => {
      dispatch(selectedWorkoutCategory(category));
    },
  } as unknown as WorkoutSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutSelectionList);
