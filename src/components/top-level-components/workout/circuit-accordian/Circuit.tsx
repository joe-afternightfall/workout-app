import React from 'react';
import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
} from '@material-ui/core';
import { CircuitExercise, NewCircuitProps } from '../WorkoutScreen';
import ExerciseCircuit from './components/ExerciseCircuit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExerciseDialog from './dialogs/AddExerciseDialog';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';

export default function Circuit(props: CircuitProps): JSX.Element {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === props.circuit.id}
      onChange={handleChange(props.circuit.id)}
    >
      <AccordionSummary
        id={`panel-${props.circuit.id}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{`Circuit: ${props.circuit.name}`}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          {props.circuit.exercises.length === 0 ? (
            <Grid item container justifyContent={'center'}>
              <Grid item>
                <Typography>{'add exercises to get started'}</Typography>
              </Grid>
            </Grid>
          ) : (
            props.circuit.exercises.map(
              (circuitExercise: CircuitExercise, index: number) => {
                const foundExercise = props.exercises.find(
                  (exercise: ExerciseVO) =>
                    exercise.id === circuitExercise.exerciseId
                );
                if (foundExercise) {
                  return (
                    <ExerciseCircuit
                      key={index}
                      circuitId={props.circuit.id}
                      exercise={foundExercise}
                      sets={circuitExercise.sets}
                      deleteExerciseHandler={props.deleteExerciseHandler}
                      addSetToExerciseHandler={props.addSetToExerciseHandler}
                      deleteSetFromExerciseHandler={
                        props.deleteSetFromExerciseHandler
                      }
                      toggleExerciseSetHandler={props.toggleExerciseSetHandler}
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
          circuit={props.circuit}
          deleteClickHandler={props.deleteClickHandler}
        />

        <AddExerciseDialog
          circuitId={props.circuit.id}
          exercises={props.exercises}
          addClickHandler={props.addExerciseHandler}
        />
      </AccordionActions>
    </Accordion>
  );
}

export interface CircuitProps {
  circuit: NewCircuitProps;
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
}
