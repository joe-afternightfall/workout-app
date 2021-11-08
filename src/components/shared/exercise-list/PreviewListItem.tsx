import React from 'react';
import {
  Segment,
  isSuperset,
  ExerciseVO,
  isCircuitSet,
  isStraightSet,
  sortSegmentExercises,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core';
import SuperSetItem from './SuperSetItem';
import SingleSetItem from './SingleSetItem';
import { Draggable } from 'react-smooth-dnd';
import { State } from '../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import EditOptions from '../../top-level-components/workout-routines-screen/views/3-preview-list/components/edit-set/components/EditOptions';

const useStyles = makeStyles(() =>
  createStyles({
    editingCard: {
      margin: '12px 0',
    },
  })
);

const PreviewListItem = (
  props: PreviewListItemProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const sortedExercises = sortSegmentExercises(props.segment.exercises);

  if (
    isStraightSet(props.segment.trainingSetTypeId) ||
    isCircuitSet(props.segment.trainingSetTypeId)
  ) {
    const singleSetItem = (
      <SingleSetItem
        segmentId={props.segment.id}
        workoutExercise={sortedExercises[0]}
      />
    );
    return props.displayEditOptions ? (
      <Draggable key={props.segment.id}>
        <EditOptions
          segmentId={props.segment.id}
          orderNumber={props.segment.order}
        />

        <Card className={classes.editingCard}>{singleSetItem}</Card>
      </Draggable>
    ) : (
      singleSetItem
    );
  } else if (isSuperset(props.segment.trainingSetTypeId)) {
    const superSetItem = (
      <SuperSetItem
        upNextCard={false}
        segmentId={props.segment.id}
        firstExercise={sortedExercises[0]}
        secondExercise={sortedExercises[1]}
      />
    );
    return props.displayEditOptions ? (
      <Draggable key={props.segment.id}>
        <EditOptions
          superset
          segmentId={props.segment.id}
          orderNumber={props.segment.order}
        />
        <Card className={classes.editingCard}>{superSetItem}</Card>
      </Draggable>
    ) : (
      superSetItem
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
    exercises: state.applicationState.workoutConfigurations.exercises,
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as PreviewListItemProps;
};

export default connect(mapStateToProps)(PreviewListItem);
