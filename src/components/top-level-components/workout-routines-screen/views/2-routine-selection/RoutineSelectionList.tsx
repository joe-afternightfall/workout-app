import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import SelectionCard from '../components/SelectionCard';
import { isOdd } from '../../../../../utils/number-util';
import { State } from '../../../../../configs/redux/store';
import { RoutineTemplateVO } from 'workout-app-common-core';
import { selectedRoutine } from '../../../../../creators/workout/workout-selections';
import { getExerciseImagesForRoutine } from '../../../../../services/exercise-images';

const RoutineSelectionList = (
  props: RoutineSelectionListProps & PassedInProps
): JSX.Element => {
  return (
    <>
      {props.routinesForCategory.map(
        (routine: RoutineTemplateVO, index: number) => {
          return (
            <Grid key={routine.id} item xs={12}>
              <SelectionCard
                title={routine.name}
                addTopMargin={index > 0}
                clickHandler={() => {
                  props.selectRoutineHandler(routine);
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

interface RoutineSelectionListProps {
  routinesForCategory: RoutineTemplateVO[];
  selectRoutineHandler: (routine: RoutineTemplateVO) => void;
}

const mapStateToProps = (state: State): RoutineSelectionListProps => {
  const selectedWorkoutCategory = state.workoutState.selectedWorkoutCategory;

  const routinesForCategory: RoutineTemplateVO[] =
    state.applicationState.workoutConfigurations.routineTemplates.filter(
      (template: RoutineTemplateVO) =>
        template.workoutCategoryId === selectedWorkoutCategory.id
    );
  return {
    routinesForCategory: routinesForCategory,
  } as unknown as RoutineSelectionListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutineSelectionListProps =>
  ({
    selectRoutineHandler: (routine: RoutineTemplateVO) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        getExerciseImagesForRoutine(routine)
      );
      dispatch(selectedRoutine(routine));
    },
  } as unknown as RoutineSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineSelectionList);
