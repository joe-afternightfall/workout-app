import React from 'react';
import { connect } from 'react-redux';
import EditOptions from './EditOptions';
import {
  getExerciseName,
  buildRepsAndSets,
  sortSegmentExercises,
} from '../../../../../../utils/workout-configs';
import SuperSetItem from '../../../shared/SuperSetItem';
import SingleListItem from '../../../shared/SingleListItem';
import { State } from '../../../../../../configs/redux/store';
import { Segment } from '../../../../../../configs/models/AppInterfaces';
import { ExerciseVO } from '../../../../../../configs/models/configurations/ExerciseVO';
import {
  isCircuitSet,
  isStraightSet,
  isSuperset,
} from '../../../../../../utils/active-workout';

const PreviewListItem = (
  props: PreviewListItemProps & PassedInProps
): JSX.Element => {
  const sortedExercises = sortSegmentExercises(props.segment.exercises);

  if (
    isStraightSet(props.segment.trainingSetTypeId) ||
    isCircuitSet(props.segment.trainingSetTypeId)
  ) {
    return (
      <>
        {props.displayEditOptions && <EditOptions />}
        <SingleListItem
          segmentId={props.segment.id}
          exerciseTitle={getExerciseName(
            props.exercises,
            sortedExercises[0].exerciseId
          )}
          repsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
        />
      </>
    );
  } else if (isSuperset(props.segment.trainingSetTypeId)) {
    return (
      <>
        {props.displayEditOptions && <EditOptions superset />}
        <SuperSetItem
          segmentId={props.segment.id}
          displayEditOptions={props.displayEditOptions}
          firstExerciseTitle={getExerciseName(
            props.exercises,
            sortedExercises[0].exerciseId
          )}
          firstExerciseRepsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
          secondExerciseTitle={getExerciseName(
            props.exercises,
            sortedExercises[1].exerciseId
          )}
          secondExerciseRepsAndSets={buildRepsAndSets(sortedExercises[1].sets)}
        />
      </>
    );
  } else {
    return <React.Fragment />;
  }
};

interface PassedInProps {
  segment: Segment;
}

interface PreviewListItemProps {
  exercises: ExerciseVO[];
  displayEditOptions: boolean;
}

const mapStateToProps = (state: State): PreviewListItemProps => {
  return {
    exercises: state.workoutState.configs.exercises,
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as PreviewListItemProps;
};

const mapDispatchToProps = (): PreviewListItemProps =>
  ({} as unknown as PreviewListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewListItem);
