import React from 'react';
import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
} from '@material-ui/core';
import ExerciseCircuit from './components/ExerciseCircuit';
import { NewCircuitProps } from '../WorkoutScreen';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExerciseDialog from './dialogs/AddExerciseDialog';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';

// todo: handle delete exercise
export default function Circuit(props: CircuitProps): JSX.Element {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // todo: add delete exercise action
  // const deleteExercise = (exerciseName: string) => {
  //   const allExercises = exercises;
  //   const found = allExercises.find((exercise) => exercise === exerciseName);
  //
  //   if (found) {
  //     const foundIndex = allExercises.indexOf(found);
  //     allExercises.splice(foundIndex, 1);
  //     setExercises(allExercises);
  //   }
  // };

  console.log('&&&&&&& circuit: ' + JSON.stringify(props.circuit));

  return (
    <Accordion
      expanded={expanded === props.circuit.id}
      onChange={handleChange(props.circuit.id)}
    >
      <AccordionSummary
        id={`panel-${props.circuit.id}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{`Circuit: ${props.circuit.type}`}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          {props.circuit.exerciseIds.map((id: string, index: number) => {
            const foundExercise = props.exercises.find(
              (exercise: ExerciseVO) => exercise.id === id
            );
            if (foundExercise) {
              return <ExerciseCircuit key={index} exercise={foundExercise} />;
            }
          })}
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
}
