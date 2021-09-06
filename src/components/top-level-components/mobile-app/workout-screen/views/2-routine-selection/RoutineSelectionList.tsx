import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import SelectionCard from '../components/SelectionCard';
import { isOdd } from '../../../../../../utils/number-util';
import { State } from '../../../../../../configs/redux/store';
import { selectedRoutine } from '../../../../../../creators/new-workout/workout-selections';
import { RoutineTemplateVO } from '../../../../../../configs/models/workout/RoutineTemplateVO';

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

export interface RoutineSelectionListProps {
  routinesForCategory: RoutineTemplateVO[];
  selectRoutineHandler: (routine: RoutineTemplateVO) => void;
}

const mapStateToProps = (state: State): RoutineSelectionListProps => {
  const selectedWorkoutCategory = state.workoutState.selectedWorkoutCategory;

  const routinesForCategory: RoutineTemplateVO[] =
    state.workoutState.configs.routineTemplates.filter(
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
      dispatch(selectedRoutine(routine));
    },
  } as unknown as RoutineSelectionListProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoutineSelectionList);
