import React from 'react';
import { connect } from 'react-redux';
import EditOptions from './components/edit-set/components/EditOptions';
import {
  isSuperset,
  isCircuitSet,
  isStraightSet,
} from '../../../../../../utils/active-workout';
import {
  getExerciseName,
  buildRepsAndSets,
  sortSegmentExercises,
} from '../../../../../../utils/workout-configs';
import { State } from '../../../../../../configs/redux/store';
import SuperSetItem from '../../../shared/exercise-list/SuperSetItem';
import SingleSetItem from '../../../shared/exercise-list/SingleSetItem';
import { Segment } from '../../../../../../configs/models/AppInterfaces';
import { ExerciseVO } from '../../../../../../configs/models/configurations/ExerciseVO';
import { Card } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Draggable } from 'react-smooth-dnd';

const useStyles = makeStyles((theme: Theme) =>
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
    return props.displayEditOptions ? (
      <Draggable key={props.segment.id}>
        <EditOptions
          segmentId={props.segment.id}
          orderNumber={props.segment.order}
        />

        <Card className={classes.editingCard}>
          <SingleSetItem
            segmentId={props.segment.id}
            exerciseTitle={getExerciseName(
              props.exercises,
              sortedExercises[0].exerciseId
            )}
            repsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
          />
        </Card>
      </Draggable>
    ) : (
      <SingleSetItem
        segmentId={props.segment.id}
        exerciseTitle={getExerciseName(
          props.exercises,
          sortedExercises[0].exerciseId
        )}
        repsAndSets={buildRepsAndSets(sortedExercises[0].sets)}
      />
    );
  } else if (isSuperset(props.segment.trainingSetTypeId)) {
    return props.displayEditOptions ? (
      <Draggable key={props.segment.id}>
        <EditOptions
          superset
          segmentId={props.segment.id}
          orderNumber={props.segment.order}
        />

        <Card className={classes.editingCard}>
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
            secondExerciseRepsAndSets={buildRepsAndSets(
              sortedExercises[1].sets
            )}
          />
        </Card>
      </Draggable>
    ) : (
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
