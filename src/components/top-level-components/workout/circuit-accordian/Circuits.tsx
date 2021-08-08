import React from 'react';
import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../../../configs/redux/store';
import ExerciseCircuit from './components/ExerciseCircuit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExerciseDialog from './dialogs/AddExerciseDialog';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { CircuitExercise, WorkoutCircuitProps } from '../WorkoutScreen';
import {
  addExerciseSetToCircuit,
  addExerciseToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
  deleteExerciseSetFromCircuit,
  toggleAccordion,
  toggleExerciseSetAsDone,
  updateWorkoutSetField,
} from '../../../../creators/workout';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

// todo: rename to WorkoutCircuit

const Circuits = (props: CircuitProps): JSX.Element => {
  const handleChange =
    (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      props.toggleAccordionHandler(isExpanded ? panel : '');
      // setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid container spacing={3}>
      {props.circuits.map((circuit: WorkoutCircuitProps, index: number) => {
        return (
          <Grid key={index} item xs={12}>
            <Accordion
              expanded={props.expanded === circuit.id}
              onChange={handleChange(circuit.id)}
            >
              <AccordionSummary
                id={`panel-${circuit.id}-header`}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{`Circuit: ${circuit.name}`}</Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={2}>
                  {circuit.exercises.length === 0 ? (
                    <Grid item container justifyContent={'center'}>
                      <Grid item>
                        <Typography>
                          {'add exercises to get started'}
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    circuit.exercises.map(
                      (circuitExercise: CircuitExercise, index: number) => {
                        const foundExercise = props.exerciseTypes.find(
                          (exercise: ExerciseTypeVO) =>
                            exercise.id === circuitExercise.exerciseId
                        );
                        if (foundExercise) {
                          return (
                            <ExerciseCircuit
                              key={index}
                              circuitId={circuit.id}
                              exercise={foundExercise}
                              sets={circuitExercise.sets}
                              deleteExerciseHandler={
                                props.deleteExerciseHandler
                              }
                              addSetToExerciseHandler={
                                props.addSetToExerciseHandler
                              }
                              deleteSetFromExerciseHandler={
                                props.deleteSetFromExerciseHandler
                              }
                              toggleExerciseSetHandler={
                                props.toggleExerciseSetHandler
                              }
                              updateWorkoutSetFieldHandler={
                                props.updateWorkoutSetFieldHandler
                              }
                            />
                          );
                        }
                      }
                    )
                  )}
                </Grid>
              </AccordionDetails>

              <AccordionActions>
                <DeleteCircuitDialog
                  circuit={circuit}
                  deleteClickHandler={props.deleteClickHandler}
                />

                <AddExerciseDialog
                  circuitId={circuit.id}
                  exerciseTypes={props.exerciseTypes}
                  addClickHandler={props.addExerciseHandler}
                />
              </AccordionActions>
            </Accordion>
          </Grid>
        );
      })}
    </Grid>
  );
};

export interface CircuitProps {
  expanded: string;
  circuits: WorkoutCircuitProps[];
  exerciseTypes: ExerciseTypeVO[];
  deleteClickHandler: (circuitId: string) => void;
  addExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
  addSetToExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteSetFromExerciseHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  toggleExerciseSetHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  updateWorkoutSetFieldHandler: (
    circuitId: string,
    exerciseId: string,
    setId: string,
    name: 'weight' | 'reps',
    value: string
  ) => void;
  toggleAccordionHandler: (panel: string) => void;
}

const mapStateToProps = (state: State): CircuitProps => {
  return {
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
    circuits: state.applicationState.circuits,
    expanded: state.applicationState.expandedAccordion,
  } as unknown as CircuitProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CircuitProps =>
  ({
    deleteClickHandler: (id: string) => {
      dispatch(deleteCircuit(id));
    },
    addExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseToCircuit(circuitId, exerciseId));
    },
    deleteExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(deleteExerciseFromCircuit(circuitId, exerciseId));
    },
    addSetToExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseSetToCircuit(circuitId, exerciseId));
    },
    deleteSetFromExerciseHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(deleteExerciseSetFromCircuit(setId, circuitId, exerciseId));
    },
    toggleExerciseSetHandler: (
      setId: string,
      circuitId: string,
      exerciseId: string
    ) => {
      dispatch(toggleExerciseSetAsDone(setId, circuitId, exerciseId));
    },
    updateWorkoutSetFieldHandler: (
      circuitId: string,
      exerciseId: string,
      setId: string,
      name: 'weight' | 'reps',
      value: string
    ) => {
      dispatch(
        updateWorkoutSetField(circuitId, exerciseId, setId, name, value)
      );
    },
    toggleAccordionHandler: (panel: string) => {
      dispatch(toggleAccordion(panel));
    },
  } as unknown as CircuitProps);

export default connect(mapStateToProps, mapDispatchToProps)(Circuits);
