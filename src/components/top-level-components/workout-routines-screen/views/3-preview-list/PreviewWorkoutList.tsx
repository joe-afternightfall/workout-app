import React, { useState } from 'react';
import clsx from 'clsx';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { routerActions } from 'connected-react-router';
import { ListSubheader, Paper } from '@material-ui/core';
import { State } from '../../../../../configs/redux/store';
import WorkoutListDivider from '../../../../shared/exercise-list/WorkoutListDivider';
import {
  PhaseVO,
  Phase,
  Segment,
  sortPhaseSegments,
} from 'workout-app-common-core';
import { ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../configs/constants/app';
import PreviewListItem from '../../../../shared/exercise-list/PreviewListItem';
import {
  toggleExerciseWidgetOnRoutinePreviewPage,
  startWorkout,
  checkIfPhaseSelectionRequired,
} from '../../../../../creators/workout/workout-selections';
import BottomActionButtons from './components/edit-set/components/BottomActionButtons';
import { Container, DropResult } from 'react-smooth-dnd';
import { updateSegmentOrder } from '../../../../../creators/workout/update-workout';
import { getPhaseName } from 'workout-app-common-core';
import ExercisesWidget from '../../../../widgets/exercises/ExercisesWidget';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '87vh',
      overflow: 'scroll',
    },
    darkBackground: {
      background: '#303030',
    },
    subHeader: {
      zIndex: 2,
    },
    listWrapper: {
      border: 'none',
      width: '100%',
      paddingTop: 0,
      paddingBottom: '6vh',
      backgroundColor: theme.palette.background.paper,
    },
    editingBackground: {
      backgroundColor: '#303030',
    },
    selectedRow: {
      zIndex: 1000,
    },
  })
);

const PreviewWorkoutList = (props: PreviewWorkoutListProps): JSX.Element => {
  const classes = useStyles();
  const {
    displayEditSet,
    configPhases,
    routinePhases,
    displayEditOptions,
    displayExerciseWidget,
  } = props;
  const [segmentType, setSegmentType] = useState<'straight' | 'super'>(
    'straight'
  );
  let display = <React.Fragment />;

  const orderAndUpdate = (phase: Phase, dropProps: DropResult) => {
    const { removedIndex, addedIndex } = dropProps;
    if (removedIndex !== null && addedIndex !== null) {
      props.updateSegmentOrderHandler(phase.id, removedIndex, addedIndex);
    }
  };

  const openExerciseWidget = (type: 'straight' | 'super') => {
    setSegmentType(type);
    props.toggleExerciseWidgetHandler(true);
    props.phaseSelectionRequiredHandler();
  };

  const hideExerciseWidget = () => {
    props.toggleExerciseWidgetHandler(false);
  };

  if (!displayEditSet) {
    if (displayExerciseWidget) {
      display = (
        <ExercisesWidget
          addToSegment
          segmentType={segmentType}
          backToRoutineHandler={hideExerciseWidget}
        />
      );
    } else {
      display = (
        <Paper
          square
          className={displayEditOptions ? classes.darkBackground : classes.root}
          elevation={displayEditOptions ? 0 : 5}
        >
          {routinePhases.map((phase: Phase, index: number) => {
            return (
              <List
                key={index}
                className={clsx(classes.listWrapper, {
                  [classes.editingBackground]: displayEditOptions,
                })}
                subheader={
                  <ListSubheader
                    component={'div'}
                    className={classes.subHeader}
                  >
                    {getPhaseName(configPhases, phase.phaseId)}
                  </ListSubheader>
                }
              >
                <Container
                  dragClass={classes.selectedRow}
                  dragHandleSelector={'.drag-handle'}
                  onDrop={(e: DropResult) => {
                    orderAndUpdate(phase, e);
                  }}
                >
                  {sortPhaseSegments(phase.segments).map((segment: Segment) => {
                    return displayEditOptions ? (
                      <PreviewListItem
                        key={segment.id}
                        segment={segment}
                        phaseType={'editing'}
                      />
                    ) : (
                      <div key={segment.id}>
                        <PreviewListItem
                          segment={segment}
                          phaseType={'editing'}
                        />
                        <WorkoutListDivider />
                      </div>
                    );
                  })}
                </Container>
              </List>
            );
          })}

          <BottomActionButtons addClickHandler={openExerciseWidget} />
        </Paper>
      );
    }
  }

  return display;
};

interface PreviewWorkoutListProps {
  startClickHandler: () => void;
  routinePhases: Phase[];
  configPhases: PhaseVO[];
  displayEditSet: boolean;
  displayEditOptions: boolean;
  displayExerciseWidget: boolean;
  updateSegmentOrderHandler: (
    phaseId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
  toggleExerciseWidgetHandler: (open: boolean) => void;
  phaseSelectionRequiredHandler: () => void;
}

const mapStateToProps = (state: State): PreviewWorkoutListProps => {
  const workoutState = state.workoutState;
  const selectedRoutine = workoutState.displayEditOptions
    ? workoutState.copyOfRoutineTemplate
    : workoutState.selectedRoutineTemplate;
  return {
    routinePhases: selectedRoutine.phases,
    configPhases: state.applicationState.workoutConfigurations.phases,
    displayEditSet: workoutState.displayEditSet,
    displayEditOptions: state.workoutState.displayEditOptions,
    displayExerciseWidget:
      state.workoutState.displayExerciseWidgetOnRoutinePreviewPage,
  } as unknown as PreviewWorkoutListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PreviewWorkoutListProps =>
  ({
    startClickHandler: () => {
      dispatch(startWorkout());
      dispatch(routerActions.push(ACTIVE_WORKOUT_SCREEN_PATH));
    },
    updateSegmentOrderHandler: (
      phaseId: string,
      fromIndex: number,
      toIndex: number
    ) => {
      dispatch(updateSegmentOrder(phaseId, fromIndex, toIndex));
    },
    toggleExerciseWidgetHandler: (open: boolean) => {
      dispatch(toggleExerciseWidgetOnRoutinePreviewPage(open));
    },
    phaseSelectionRequiredHandler: () => {
      dispatch(checkIfPhaseSelectionRequired('editing'));
    },
  } as unknown as PreviewWorkoutListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewWorkoutList);
