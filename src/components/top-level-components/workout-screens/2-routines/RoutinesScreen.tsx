import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { isOdd } from '../../../../utils/number-util';
import { routerActions } from 'connected-react-router';
import { State } from '../../../../configs/redux/store';
import { RoutineTemplateVO } from 'workout-app-common-core';
import SelectionCard from '../shared-components/SelectionCard';
import BaseWorkoutScreen from '../shared-components/BaseWorkoutScreen';
import { selectedRoutine } from '../../../../creators/workout/workout-selections';
import { getExerciseImagesForRoutine } from '../../../../services/exercise-images';
import { PREVIEW_WORKOUT_SCREEN_PATH } from '../../../../configs/constants/app-routing';

const RoutinesScreen = (props: RoutinesScreenProps): JSX.Element => {
  return (
    <BaseWorkoutScreen
      centerComponent={
        <Grid container justify={'center'}>
          {props.routinesForCategory.map(
            (routine: RoutineTemplateVO, index: number) => {
              return (
                <Grid key={routine.id} item xs={12}>
                  <SelectionCard
                    title={routine.name}
                    addTopMargin={index > 0}
                    clickHandler={() => {
                      props.selectRoutineHandler(routine);
                    }}
                    justify={isOdd(index) ? 'flex-end' : 'flex-start'}
                  />
                </Grid>
              );
            }
          )}
        </Grid>
      }
    />
  );
};

interface RoutinesScreenProps {
  routinesForCategory: RoutineTemplateVO[];
  selectRoutineHandler: (routine: RoutineTemplateVO) => void;
}

const mapStateToProps = (state: State): RoutinesScreenProps => {
  const selectedWorkoutCategory = state.workoutState.selectedWorkoutCategory;

  const routinesForCategory: RoutineTemplateVO[] =
    state.applicationState.workoutConfigurations.routineTemplates.filter(
      (template: RoutineTemplateVO) =>
        template.workoutCategoryId === selectedWorkoutCategory.id
    );
  return {
    routinesForCategory: routinesForCategory,
  } as unknown as RoutinesScreenProps;
};

const mapDispatchToProps = (dispatch: Dispatch): RoutinesScreenProps =>
  ({
    selectRoutineHandler: (routine: RoutineTemplateVO) => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        getExerciseImagesForRoutine(routine)
      );
      dispatch(selectedRoutine(routine));
      dispatch(routerActions.push(PREVIEW_WORKOUT_SCREEN_PATH));
    },
  } as unknown as RoutinesScreenProps);

export default connect(mapStateToProps, mapDispatchToProps)(RoutinesScreen);
