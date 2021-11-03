import React from 'react';
import { connect } from 'react-redux';
import EditOptions from './components/edit-set/components/EditOptions';
import { State } from '../../../../../../configs/redux/store';
import SuperSetItem from '../../../shared/exercise-list/SuperSetItem';
import SingleSetItem from '../../../shared/exercise-list/SingleSetItem';
import {
  Segment,
  ExerciseVO,
  sortSegmentExercises,
  isStraightSet,
  isCircuitSet,
  buildRepsAndSets,
  isSuperset,
} from 'workout-app-common-core';
import { Card } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Draggable } from 'react-smooth-dnd';
import { getExerciseName } from '../../../../../../utils/get-name';

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
    const exerciseName = getExerciseName(
      props.exercises,
      sortedExercises[0].exerciseId
    );
    const singleSetItem = (
      <SingleSetItem
        segmentId={props.segment.id}
        exerciseTitle={exerciseName ? exerciseName : ''}
        repsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
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
    const firstExerciseTitle = getExerciseName(
      props.exercises,
      sortedExercises[0].exerciseId
    );
    const secondExerciseTitle = getExerciseName(
      props.exercises,
      sortedExercises[1].exerciseId
    );
    const superSetItem = (
      <SuperSetItem
        segmentId={props.segment.id}
        displayEditOptions={props.displayEditOptions}
        firstExerciseTitle={firstExerciseTitle ? firstExerciseTitle : ''}
        firstExerciseRepsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
        secondExerciseTitle={secondExerciseTitle ? secondExerciseTitle : ''}
        secondExerciseRepsAndSets={buildRepsAndSets(sortedExercises[1].sets)}
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
    exercises: state.workoutState.configs.exercises,
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as PreviewListItemProps;
};

const mapDispatchToProps = (): PreviewListItemProps =>
  ({} as unknown as PreviewListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewListItem);
