import React from 'react';
import clsx from 'clsx';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { routerActions } from 'connected-react-router';
import { ListSubheader, Paper } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';
import WorkoutListDivider from '../../../shared/exercise-list/WorkoutListDivider';
import { Phase, Segment } from '../../../../../../configs/models/AppInterfaces';
import { MOBILE_ACTIVE_WORKOUT_SCREEN_PATH } from '../../../../../../configs/constants/app';
import {
  getPhaseName,
  sortPhaseSegments,
} from '../../../../../../utils/workout-configs';
import { PhaseVO } from '../../../../../../configs/models/configurations/PhaseVO';
import PreviewListItem from './PreviewListItem';
import { startWorkout } from '../../../../../../creators/new-workout/workout-selections';
import BottomActionButtons from './components/edit-set/components/BottomActionButtons';
import { Container, DropResult } from 'react-smooth-dnd';
import { updateSegmentOrder } from '../../../../../../creators/new-workout/update-workout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '87vh',
      overflow: 'scroll',
    },
    subHeader: {
      zIndex: 2,
    },
    listWrapper: {
      width: '100%',
      paddingTop: 0,
      paddingBottom: '6vh',
      backgroundColor: theme.palette.background.paper,
    },
    editingBackground: {
      backgroundColor: '#313131',
    },
    selectedRow: {
      zIndex: 1000,
    },
  })
);

const PreviewWorkoutList = (props: PreviewWorkoutListProps): JSX.Element => {
  const classes = useStyles();
  const orderAndUpdate = (phase: Phase, dropProps: DropResult) => {
    const { removedIndex, addedIndex } = dropProps;
    if (removedIndex !== null && addedIndex !== null) {
      props.updateSegmentOrderHandler(phase.id, removedIndex, addedIndex);
    }
  };

  return props.displayEditSet ? (
    <React.Fragment />
  ) : (
    <Paper elevation={5} square className={classes.root}>
      {props.routinePhases.map((phase: Phase, index: number) => {
        return (
          <List
            key={index}
            className={clsx(classes.listWrapper, {
              [classes.editingBackground]: props.displayEditOptions,
            })}
            subheader={
              <ListSubheader component={'div'} className={classes.subHeader}>
                {getPhaseName(props.configPhases, phase.phaseId)}
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
                return props.displayEditOptions ? (
                  <PreviewListItem key={segment.id} segment={segment} />
                ) : (
                  <div key={segment.id}>
                    <PreviewListItem segment={segment} />
                    <WorkoutListDivider />
                  </div>
                );
              })}
            </Container>
          </List>
        );
      })}

      <BottomActionButtons />
    </Paper>
  );
};

export interface PreviewWorkoutListProps {
  startClickHandler: () => void;
  routinePhases: Phase[];
  configPhases: PhaseVO[];
  displayEditSet: boolean;
  displayEditOptions: boolean;
  updateSegmentOrderHandler: (
    phaseId: string,
    fromIndex: number,
    toIndex: number
  ) => void;
}

const mapStateToProps = (state: State): PreviewWorkoutListProps => {
  const workoutState = state.workoutState;
  const selectedRoutine = workoutState.displayEditPreviewList
    ? workoutState.copyOfRoutineTemplate
    : workoutState.selectedRoutineTemplate;
  return {
    routinePhases: selectedRoutine.phases,
    configPhases: workoutState.configs.phases,
    displayEditSet: workoutState.displayEditSet,
    displayEditOptions: state.workoutState.displayEditPreviewList,
  } as unknown as PreviewWorkoutListProps;
};

const mapDispatchToProps = (dispatch: Dispatch): PreviewWorkoutListProps =>
  ({
    startClickHandler: () => {
      dispatch(startWorkout());
      dispatch(routerActions.push(MOBILE_ACTIVE_WORKOUT_SCREEN_PATH));
    },
    updateSegmentOrderHandler: (
      phaseId: string,
      fromIndex: number,
      toIndex: number
    ) => {
      dispatch(updateSegmentOrder(phaseId, fromIndex, toIndex));
    },
  } as unknown as PreviewWorkoutListProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewWorkoutList);
