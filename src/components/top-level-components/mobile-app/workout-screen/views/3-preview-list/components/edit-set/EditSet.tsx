import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../../../configs/redux/store';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { Grid, Slide } from '@material-ui/core';
import ActiveExercise, {
  Title,
} from '../../../../../active-workout-screen/1-active-exercise/ActiveExercise';
import {
  getExercise,
  isSuperset,
} from '../../../../../../../../utils/active-workout';
import StraightSetRow from '../../../../../shared/set-fields/StraightSetRow';
import {
  Segment,
  WorkoutExercise,
} from '../../../../../../../../configs/models/AppInterfaces';
import {
  addSetToEditingCopy,
  deleteSetFromEditingCopy,
} from '../../../../../../../../creators/new-workout/preview-workout';
import ActionButton from './components/ActionButton';
import EditAppBar from './components/EditAppBar';
import RestBetweenOptions from './components/RestBetweenOptions';
import EditSupersetRow from '../../../../../shared/set-rows/EditSupersetRow';

const useStyles = makeStyles(() =>
  createStyles({
    addButtonWrapper: {
      paddingLeft: 4,
      marginBottom: 20,
      height: '11.5vh',
    },
  })
);

const EditSet = (props: EditSetProps): JSX.Element => {
  const classes = useStyles();

  const atMaxSets = props.segment.exercises[0].sets.length === 5;
  return (
    <>
      <EditAppBar />

      <Grid container>
        <Grid item xs={12}>
          {props.display && (
            <ActiveExercise
              superset={props.superset}
              exerciseTitles={props.titles}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          {props.superset ? (
            <EditSupersetRow segment={props.segment} />
          ) : (
            props.segment &&
            props.segment.exercises[0].sets.map((set, index) => {
              const shouldDisable =
                props.segment.exercises[0].sets.length === 1;
              return (
                <StraightSetRow
                  key={index}
                  setNumber={-1}
                  markedDone={false}
                  activeSet={false}
                  info={{
                    setId: set.id,
                    reps: set.reps,
                    weight: set.weight,
                    parameterTypeId: props.parameterTypeId,
                  }}
                  actionButton={
                    <ActionButton
                      disabled={shouldDisable}
                      clickHandler={() => {
                        props.deleteClickHandler(set.id);
                      }}
                      icon={<DeleteIcon fontSize={'large'} />}
                    />
                  }
                />
              );
            })
          )}
        </Grid>

        <Grid item xs={12} container justify={'flex-end'}>
          <Grid item xs={4} className={classes.addButtonWrapper}>
            <ActionButton
              soloButton
              disabled={atMaxSets}
              clickHandler={() => {
                props.addSetClickHandler(props.segment.exercises);
              }}
              icon={<AddIcon fontSize={'large'} />}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <RestBetweenOptions />
        </Grid>
      </Grid>
    </>
  );
};

export interface EditSetProps {
  segment: Segment;
  superset: boolean;
  titles: Title[];
  display: boolean;
  segmentId: string;
  parameterTypeId: string;
  deleteClickHandler: (setId: string) => void;
  addSetClickHandler: (exercises: WorkoutExercise[]) => void;
}

const mapStateToProps = (state: State): EditSetProps => {
  const routineTemplate = state.workoutState.copyOfRoutineTemplate;

  const foundSegment =
    routineTemplate &&
    routineTemplate.phases.map((phase) => {
      return phase.segments.find((segment) => {
        if (segment.id === state.workoutState.editSetSegmentId) {
          return segment;
        }
      });
    });

  const titles: Title[] = [];
  let superset = false;
  let parameterTypeId = '';

  if (foundSegment) {
    foundSegment.map((segment) => {
      if (segment) {
        superset = isSuperset(segment.trainingSetTypeId);
        segment.exercises.map((exercise) => {
          const foundExercise = getExercise(
            state.workoutState.configs.exercises,
            exercise.exerciseId
          );
          if (foundExercise) {
            titles.push({
              title: foundExercise.name,
            });
            parameterTypeId = foundExercise.parameterTypeId;
          }
        });
      }
    });
  }

  return {
    titles: titles || [],
    superset: superset,
    segment: foundSegment && foundSegment[0],
    display: state.workoutState.displayEditSet,
    parameterTypeId: parameterTypeId,
  } as unknown as EditSetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditSetProps =>
  ({
    deleteClickHandler: (setId: string) => {
      dispatch(deleteSetFromEditingCopy(setId));
    },
    addSetClickHandler: (exercises: WorkoutExercise[]) => {
      exercises.map((exercise) => {
        dispatch(addSetToEditingCopy(exercise.id));
      });
    },
  } as unknown as EditSetProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditSet);
