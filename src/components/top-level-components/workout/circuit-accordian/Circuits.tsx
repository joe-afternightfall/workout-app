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
import ExerciseCircuit from './components/ExerciseCircuit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExerciseDialog from './dialogs/AddExerciseDialog';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';
import { CircuitExercise, NewCircuitProps } from '../WorkoutScreen';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';
import {
  addExerciseSetToCircuit,
  addExerciseToCircuit,
  deleteCircuit,
  deleteExerciseFromCircuit,
  deleteExerciseSetFromCircuit,
  toggleExerciseSetAsDone,
  updateWorkoutSetField,
} from '../../../../creators/workout';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

const Circuits = (props: CircuitProps): JSX.Element => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Grid container spacing={3}>
      {props.circuits.map((circuit: NewCircuitProps, index: number) => {
        return (
          <Grid key={index} item xs={12}>
            <Accordion
              expanded={expanded === circuit.id}
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
                        const foundExercise = props.exercises.find(
                          (exercise: ExerciseVO) =>
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
                  exercises={props.exercises}
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
  circuits: NewCircuitProps[];
  exercises: ExerciseVO[];
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
}

const mapStateToProps = (state: State): CircuitProps => {
  return {
    exercises: state.applicationState.exercises,
    circuits: state.applicationState.circuits,
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
  } as unknown as CircuitProps);

export default connect(mapStateToProps, mapDispatchToProps)(Circuits);
