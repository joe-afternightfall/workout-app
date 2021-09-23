import React from 'react';
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  Segment,
  WorkoutExercise,
} from '../../../../../configs/models/AppInterfaces';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';
import {
  isCircuitSet,
  isStraightSet,
  isSuperset,
} from '../../../../../utils/active-workout';
import SingleSetItem from '../../shared/exercise-list/SingleSetItem';
import {
  buildRepsAndSets,
  getExerciseName,
  getPhaseName,
} from '../../../../../utils/workout-configs';
import SuperSetItem from '../../shared/exercise-list/SuperSetItem';
import { ExerciseVO } from '../../../../../configs/models/configurations/ExerciseVO';
import clsx from 'clsx';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import confettiEmoji from '../../../../../configs/icons/confetti-emoji.png';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      width: '100%',
    },
    list: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
    },
    bottomMargin: {
      marginBottom: 12,
    },
    highlight: {
      color: theme.palette.custom.colors.active,
    },
    listItemText: {
      paddingLeft: 12,
    },
    itemIconWrapper: {
      // todo: come back and assign palette color
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
      height: '13vh',
    },
  })
);

const UpNextCard = (props: UpNextCardProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  let display = <div />;

  const nextSegment = props.nextSegment;
  const workoutExercises = nextSegment ? nextSegment.exercises : [];
  const straightSet =
    nextSegment && isStraightSet(nextSegment.trainingSetTypeId);
  const circuitSet = nextSegment && isCircuitSet(nextSegment.trainingSetTypeId);

  if (props.lastSegment && props.lastExerciseOfWorkout) {
    display = (
      <ListItem>
        <ListItemIcon className={classes.itemIconWrapper}>
          <img src={confettiEmoji} alt={'confetti'} />
        </ListItemIcon>
        <ListItemText
          className={classes.listItemText}
          primary={'Done with Workout'}
          secondary={'time to celebrate'}
        />
      </ListItem>
    );
  } else if (props.lastSegment) {
    display = (
      <ListItem>
        <ListItemIcon className={classes.itemIconWrapper} />
        <ListItemText
          className={classes.listItemText}
          primary={`Next Up: ${props.nextPhaseTitle}`}
          secondary={`exercises: ${props.exercisesLength}`}
        />
      </ListItem>
    );
  } else if (straightSet || circuitSet) {
    workoutExercises.map((exercise: WorkoutExercise) => {
      display = (
        <SingleSetItem
          displayUpNextTitle
          key={exercise.id}
          exerciseTitle={getExerciseName(props.exercises, exercise.exerciseId)}
          repsAndSets={buildRepsAndSets(exercise.sets)}
        />
      );
    });
  } else if (nextSegment && isSuperset(nextSegment.trainingSetTypeId)) {
    display = (
      <SuperSetItem
        displayUpNextTitle
        firstExerciseTitle={getExerciseName(
          props.exercises,
          workoutExercises[0].exerciseId
        )}
        firstExerciseRepsAndSets={buildRepsAndSets(workoutExercises[0].sets)}
        secondExerciseTitle={getExerciseName(
          props.exercises,
          workoutExercises[1].exerciseId
        )}
        secondExerciseRepsAndSets={buildRepsAndSets(workoutExercises[1].sets)}
      />
    );
  }

  return (
    <Card
      className={clsx(classes.root, {
        [classes.bottomMargin]: props.bottomMargin,
      })}
    >
      <Grid item xs={12} container>
        <List className={classes.list}>{display}</List>
      </Grid>
    </Card>
  );
};

interface PassedInProps {
  bottomMargin?: boolean;
  lastSegment: boolean;
  lastExerciseOfWorkout: boolean;
}

export interface UpNextCardProps {
  nextSegment: Segment | undefined;
  exercises: ExerciseVO[];
  nextPhaseTitle: string;
  exercisesLength: number;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): UpNextCardProps => {
  const workoutState = state.workoutState;
  const foundSegment = workoutState.currentPhase.segments.find(
    (segment) => segment.order === workoutState.currentSegmentIndex + 1
  );
  const phaseOrder = workoutState.currentPhase.order;
  let nextPhaseTitle = '';
  let exercisesLength = -1;

  if (!ownProps.lastExerciseOfWorkout && ownProps.lastSegment) {
    const nextPhase = workoutState.activeWorkout.routine.phases.find(
      (phase) => phase.order === phaseOrder + 1
    );

    if (nextPhase) {
      nextPhaseTitle = getPhaseName(
        workoutState.configs.phases,
        nextPhase.phaseId
      );
      exercisesLength = nextPhase.segments.length;
    }
  }

  return {
    nextSegment: foundSegment,
    exercises: workoutState.configs.exercises,
    nextPhaseTitle: nextPhaseTitle,
    exercisesLength: exercisesLength,
  } as unknown as UpNextCardProps;
};

export default connect(mapStateToProps)(UpNextCard);
