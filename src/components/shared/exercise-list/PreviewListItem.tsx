import React from 'react';
import {
  Segment,
  isSuperset,
  ExerciseVO,
  isStraightSet,
  sortSegmentExercises,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import SuperSetItem from './SuperSetItem';
import SingleSetItem from './SingleSetItem';
import { Draggable } from 'react-smooth-dnd';
import { State } from '../../../configs/redux/store';
import { PhaseTypeEditingSegment } from '../../../configs/types';
import EditOptions from '../../top-level-components/workout-routines-screen/views/3-preview-list/components/edit-set/components/EditOptions';

const PreviewListItem = (
  props: PreviewListItemProps & PassedInProps
): JSX.Element => {
  const sortedExercises = sortSegmentExercises(props.segment.exercises);
  const { displayEditOptions } = props;
  let displayItem = <div />;
  const isSuperSetItem = isSuperset(props.segment.trainingSetTypeId);

  if (isStraightSet(props.segment.trainingSetTypeId)) {
    displayItem = (
      <SingleSetItem
        segmentId={props.segment.id}
        workoutExercise={sortedExercises[0]}
      />
    );
  } else if (isSuperSetItem) {
    displayItem = (
      <SuperSetItem
        upNextCard={false}
        segmentId={props.segment.id}
        firstExercise={sortedExercises[0]}
        secondExercise={sortedExercises[1]}
      />
    );
  }

  return displayEditOptions ? (
    <Draggable key={props.segment.id}>
      <EditOptions
        superset={isSuperSetItem}
        segmentId={props.segment.id}
        orderNumber={props.segment.order}
        phaseType={props.phaseType}
      />
      <Card>{displayItem}</Card>
    </Draggable>
  ) : (
    displayItem
  );
};

interface PassedInProps {
  segment: Segment;
  phaseType: PhaseTypeEditingSegment;
}

interface PreviewListItemProps {
  exercises: ExerciseVO[];
  displayEditOptions: boolean;
}

const mapStateToProps = (state: State): PreviewListItemProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
    displayEditOptions: state.workoutState.displayEditOptions,
  } as unknown as PreviewListItemProps;
};

export default connect(mapStateToProps)(PreviewListItem);
