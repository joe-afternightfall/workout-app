import React from 'react';
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  Segment,
  ExerciseVO,
  isSuperset,
  isCircuitSet,
  isStraightSet,
  WorkoutExercise,
  getPhaseName,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import { AppTheme } from '../../../../configs/theme/app-theme';
import SuperSetItem from '../../../shared/exercise-list/SuperSetItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SingleSetItem from '../../../shared/exercise-list/SingleSetItem';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: 12,
    },
    list: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: 0,
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

  if (props.lastSegment && !props.lastExerciseOfWorkout) {
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
          workoutExercise={exercise}
        />
      );
    });
  } else if (nextSegment && isSuperset(nextSegment.trainingSetTypeId)) {
    display = (
      <SuperSetItem
        upNextCard={true}
        displayUpNextTitle
        firstExercise={workoutExercises[0]}
        secondExercise={workoutExercises[1]}
      />
    );
  }

  return (
    <Card className={classes.root}>
      <Grid item xs={12} container>
        <List className={classes.list}>{display}</List>
      </Grid>
    </Card>
  );
};

interface PassedInProps {
  lastSegment: boolean;
  lastExerciseOfWorkout: boolean;
}

interface UpNextCardProps {
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
  const workoutConfigurations = state.applicationState.workoutConfigurations;
  const configPhases = workoutConfigurations.phases;
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
      const phaseName = getPhaseName(configPhases, nextPhase.phaseId);
      if (phaseName) {
        nextPhaseTitle = phaseName;
      }
      exercisesLength = nextPhase.segments.length;
    }
  }

  return {
    nextSegment: foundSegment,
    exercises: workoutConfigurations.exercises,
    nextPhaseTitle: nextPhaseTitle,
    exercisesLength: exercisesLength,
  } as unknown as UpNextCardProps;
};

export default connect(mapStateToProps)(UpNextCard);
