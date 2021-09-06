import React from 'react';
import { connect } from 'react-redux';
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

const PreviewListItem = (
  props: PreviewListItemProps & PassedInProps
): JSX.Element => {
  const sortedExercises = sortSegmentExercises(props.segment.exercises);

  if (sortedExercises.length === 1) {
    return (
      <SingleListItem
        exerciseTitle={`${props.segment.order} ${getExerciseName(
          props.exercises,
          sortedExercises[0].exerciseId
        )}`}
        repsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
      />
    );
  } else if (sortedExercises.length === 2) {
    return (
      <SuperSetItem
        firstExerciseTitle={`${props.segment.order} ${getExerciseName(
          props.exercises,
          sortedExercises[0].exerciseId
        )}`}
        firstExerciseRepsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
        secondExerciseTitle={`${props.segment.order} ${getExerciseName(
          props.exercises,
          sortedExercises[1].exerciseId
        )}`}
        secondExerciseRepsAndSets={buildRepsAndSets(sortedExercises[1].sets)}
      />
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
}

const mapStateToProps = (state: State): PreviewListItemProps => {
  return {
    exercises: state.workoutState.configs.exercises,
  } as unknown as PreviewListItemProps;
};

const mapDispatchToProps = (): PreviewListItemProps =>
  ({} as unknown as PreviewListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewListItem);
