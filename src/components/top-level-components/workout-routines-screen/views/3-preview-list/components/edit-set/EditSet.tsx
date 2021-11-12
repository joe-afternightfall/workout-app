import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditAppBar from './components/EditAppBar';
import DeleteIcon from '@material-ui/icons/Delete';
import ActionButton from './components/ActionButton';
import { buildSetInfo } from '../../../../../../../utils/set-info-builder';
import {
  ActiveSetInfo,
  BuiltSets,
  findExercise,
  isSuperset,
  Phase,
  Segment,
  WorkoutExercise,
} from 'workout-app-common-core';
import RestBetweenOptions from './components/RestBetweenOptions';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../../configs/redux/store';
import {
  addSetToRoutineCopy,
  deleteSetFromRoutineCopy,
} from '../../../../../../../creators/workout/preview-workout';
import StraightSetRow from '../../../../../../shared/set-rows/StraightSetRow';
import EditSupersetRow from '../../../../../../shared/set-rows/EditSupersetRow';
import { buildSetFieldInfo } from '../../../../../../../utils/info-builder';
import ActiveExercise from '../../../../../active-workout-screen/1-active-exercise/ActiveExercise';

const useStyles = makeStyles(() =>
  createStyles({
    addButtonWrapper: {
      paddingLeft: 4,
      marginBottom: 20,
      height: '11.5vh',
    },
  })
);

const EditSet = ({
  superset,
  segment,
  builtSets,
  display,
  parameterTypeId,
  deleteClickHandler,
  addSetClickHandler,
  alternateSides,
}: EditSetProps): JSX.Element => {
  const classes = useStyles();

  const atMaxSets = segment.exercises[0].sets.length === 5;
  return (
    <>
      <EditAppBar />

      <Grid container>
        <Grid item xs={12}>
          {display && <ActiveExercise segment={segment} />}
        </Grid>

        <Grid item xs={12}>
          {superset ? (
            <EditSupersetRow builtSets={builtSets} />
          ) : (
            Object.values(builtSets).map((setInfo: ActiveSetInfo[]) => {
              const shouldDisable = Object.values(builtSets).length === 1;
              return setInfo.map((info: ActiveSetInfo, index: number) => {
                return (
                  <StraightSetRow
                    key={index}
                    setNumber={-1}
                    markedDone={false}
                    activeSet={false}
                    info={buildSetFieldInfo(
                      info,
                      parameterTypeId,
                      alternateSides,
                      false
                    )}
                    actionButton={
                      <ActionButton
                        disabled={shouldDisable}
                        clickHandler={() => {
                          deleteClickHandler(info.setId);
                        }}
                        icon={<DeleteIcon fontSize={'large'} />}
                      />
                    }
                  />
                );
              });
            })
          )}
        </Grid>

        <Grid item xs={12} container justify={'flex-end'}>
          <Grid item xs={4} className={classes.addButtonWrapper}>
            <ActionButton
              soloButton
              disabled={atMaxSets}
              clickHandler={() => {
                addSetClickHandler(segment.exercises);
              }}
              icon={<AddIcon fontSize={'large'} />}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <RestBetweenOptions segment={segment} />
        </Grid>
      </Grid>
    </>
  );
};

interface EditSetProps {
  segment: Segment;
  builtSets: BuiltSets;
  superset: boolean;
  alternateSides: boolean;
  display: boolean;
  segmentId: string;
  parameterTypeId: string;
  deleteClickHandler: (setId: string) => void;
  addSetClickHandler: (exercises: WorkoutExercise[]) => void;
}

const mapStateToProps = (state: State): EditSetProps => {
  const routineTemplate = state.workoutState.copyOfRoutineTemplate;
  let foundSegment: Segment = {
    id: '',
    order: -1,
    trainingSetTypeId: '',
    secondsRestBetweenSets: -1,
    secondsRestBetweenNextSegment: -1,
    exercises: [],
  };
  let phases: Phase[] = [];

  if (state.workoutState.phaseTypeAddingSegment === 'activeWorkout') {
    phases = state.workoutState.activeWorkout.routine.phases;
  } else if (routineTemplate) {
    phases = routineTemplate.phases;
  }

  phases.map((phase) => {
    return phase.segments.find((segment) => {
      if (segment.id === state.workoutState.editSetSegmentId) {
        foundSegment = segment;
      }
    });
  });

  let superset = false;
  let parameterTypeId = '';
  let alternateSides = false;

  if (foundSegment.order !== -1) {
    superset = isSuperset(foundSegment.trainingSetTypeId);
    foundSegment.exercises.map((exercise) => {
      const foundExercise = findExercise(
        state.applicationState.workoutConfigurations.exercises,
        exercise.exerciseId
      );
      if (foundExercise) {
        parameterTypeId = foundExercise.parameterTypeId;
        alternateSides = foundExercise.alternateSides;
      }
    });
  }

  const builtSets = buildSetInfo(
    foundSegment,
    state.applicationState.workoutConfigurations.exercises
  );

  return {
    superset: superset,
    segment: foundSegment,
    builtSets: builtSets,
    display: state.workoutState.displayEditSet,
    parameterTypeId: parameterTypeId,
    alternateSides: alternateSides,
  } as unknown as EditSetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditSetProps =>
  ({
    deleteClickHandler: (setId: string) => {
      dispatch(deleteSetFromRoutineCopy(setId));
    },
    addSetClickHandler: (exercises: WorkoutExercise[]) => {
      exercises.map((exercise) => {
        dispatch(addSetToRoutineCopy(exercise.id));
      });
    },
  } as unknown as EditSetProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditSet);
