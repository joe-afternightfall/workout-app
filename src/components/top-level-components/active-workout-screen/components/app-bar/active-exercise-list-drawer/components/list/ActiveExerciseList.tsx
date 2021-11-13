import React, { useState } from 'react';
import { List } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';
import DoneSection from './components/DoneSection';
import CategoryHeader from '../shared/CategoryHeader';
import NextSegmentSection from './components/NextSegmentSection';
import PreviewListItem from '../../../../../../../shared/exercise-list/PreviewListItem';
import NewSegmentBottomActionButtons from '../../../../../../../shared/action-buttons/new-segment-bottom-action-buttons/NewSegmentBottomActionButtons';
import { Dispatch } from 'redux';
import {
  checkIfPhaseSelectionRequired,
  toggleExerciseWidgetOnRoutinePreviewPage,
} from '../../../../../../../../creators/workout/workout-selections';
import { connect } from 'react-redux';
import { State } from '../../../../../../../../configs/redux/store';
import ExercisesWidget from '../../../../../../../widgets/exercises/ExercisesWidget';

const ActiveExerciseList = (
  props: ActiveExerciseListProps & PassedInProps
): JSX.Element => {
  const {
    displayEditOptions,
    nextSegments,
    doneSegments,
    currentSegment,
    displayExerciseWidget,
    displayBottomActionButtons,
    toggleSelectedExerciseHandler,
  } = props;
  let display;
  const [segmentType, setSegmentType] = useState<'straight' | 'super'>(
    'straight'
  );

  const openExerciseWidget = (type: 'straight' | 'super') => {
    setSegmentType(type);
    props.toggleExerciseWidgetHandler(true);
    props.phaseSelectionRequiredHandler();
  };

  const hideExerciseWidget = () => {
    props.toggleExerciseWidgetHandler(false);
  };

  if (displayExerciseWidget) {
    display = (
      <ExercisesWidget
        addToSegment
        alwaysDisplayBackButton={true}
        segmentType={segmentType}
        backToRoutineHandler={hideExerciseWidget}
      />
    );
  } else {
    display = (
      <List>
        {doneSegments.length > 0 && <DoneSection doneSegments={doneSegments} />}

        <CategoryHeader title={'Current'} />

        <PreviewListItem segment={currentSegment} phaseType={'activeWorkout'} />

        {nextSegments.map((segment, index) => {
          const displayDivider = nextSegments.length !== index + 1;
          return (
            <NextSegmentSection
              key={index}
              segment={segment}
              displayEditOptions={displayEditOptions}
              displayDivider={displayDivider}
              toggleSelectedExerciseHandler={toggleSelectedExerciseHandler}
            />
          );
        })}

        {displayBottomActionButtons && (
          <NewSegmentBottomActionButtons
            straightSetClickHandler={() => {
              openExerciseWidget('straight');
            }}
            superSetClickHandler={() => {
              openExerciseWidget('super');
            }}
          />
        )}
      </List>
    );
  }

  return display;
};

interface ActiveExerciseListProps {
  nextSegments: Segment[];
  doneSegments: Segment[];
  currentSegment: Segment;
  toggleExerciseWidgetHandler: (open: boolean) => void;
  phaseSelectionRequiredHandler: () => void;
  displayExerciseWidget: boolean;
  displayEditOptions: boolean;
}

interface PassedInProps {
  toggleSelectedExerciseHandler: (
    open: boolean,
    segment: Segment | null
  ) => void;
  displayBottomActionButtons: boolean;
}

const mapStateToProps = (state: State): ActiveExerciseListProps => {
  const doneSegments: Segment[] = [];
  const nextSegments: Segment[] = [];
  const currentPhase = state.workoutState.currentPhase;

  currentPhase.segments.map((segment) => {
    let numberOfExercisesDone = 0;
    segment.exercises.map((exercise) => {
      const numberOfSets = exercise.sets.length;
      let markedDoneSets = 0;
      exercise.sets.map((set) => {
        if (set.markedDone) {
          markedDoneSets++;
        }
      });
      if (numberOfSets === markedDoneSets) {
        numberOfExercisesDone++;
      }
    });
    if (numberOfExercisesDone === segment.exercises.length) {
      doneSegments.push(segment);
    }
  });

  const currentSegment = currentPhase.segments.find(
    (segment: Segment) =>
      segment.order === state.workoutState.currentSegmentIndex
  );

  currentPhase.segments.map((segment) => {
    const foundIndex = doneSegments.indexOf(segment);
    if (foundIndex === -1 && segment !== currentSegment) {
      nextSegments.push(segment);
    }
  });

  return {
    doneSegments: doneSegments,
    currentSegment: currentSegment,
    nextSegments: nextSegments,
    displayExerciseWidget: state.workoutState.displayExerciseWidget,
    displayEditOptions: state.workoutState.editOptions.open,
  } as unknown as ActiveExerciseListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveExerciseListProps =>
  ({
    toggleExerciseWidgetHandler: (open: boolean) => {
      dispatch(toggleExerciseWidgetOnRoutinePreviewPage(open));
    },
    phaseSelectionRequiredHandler: () => {
      dispatch(checkIfPhaseSelectionRequired('activeWorkout'));
    },
  } as unknown as ActiveExerciseListProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveExerciseList);
