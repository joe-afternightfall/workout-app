import React from 'react';
import {
  Grid,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionActions,
  AccordionDetails,
} from '@material-ui/core';
import ExerciseSet from './ExerciseSet';
import { Container } from 'react-smooth-dnd';
import { NewCircuitProps } from '../WorkoutScreen';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddExerciseDialog from './dialogs/AddExerciseDialog';
import DeleteCircuitDialog from './dialogs/DeleteCircuitDialog';
import { ExerciseVO } from '../../../../configs/models/ExerciseVO';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    selectedRow: {
      marginBottom: theme.spacing(1),
      border: `solid 1px ${theme.palette.primary.main}`,
      background: theme.palette.background.paper,
    },
  })
);

// todo: handle delete exercise
export default function Circuit(props: CircuitProps): JSX.Element {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [exercises, setExercises] = React.useState<string[]>([]);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<any>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleAddExercise = (exercise: string) => {
    setExercises((current: string[]) => [...current, exercise]);
  };

  const deleteExercise = (exerciseName: string) => {
    const allExercises = exercises;
    const found = allExercises.find((exercise) => exercise === exerciseName);

    if (found) {
      const foundIndex = allExercises.indexOf(found);
      allExercises.splice(foundIndex, 1);
      setExercises(allExercises);
    }
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
        <Typography>{`Circuit: ${props.circuit.type}`}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          <Container
            style={{ width: '100%' }}
            dragClass={classes.selectedRow}
            dragHandleSelector={'.drag-handle'}
            // onDrop={orderAndUpdateStrategies}
          >
            {exercises.map((exercise: string, index: number) => {
              return <ExerciseSet key={index} exerciseName={exercise} />;
            })}
          </Container>
        </Grid>
      </AccordionDetails>

      <AccordionActions>
        <DeleteCircuitDialog
          circuit={props.circuit}
          deleteClickHandler={props.deleteClickHandler}
        />

        <AddExerciseDialog
          exercises={props.exercises}
          addClickHandler={handleAddExercise}
        />
      </AccordionActions>
    </Accordion>
  );
}

export interface CircuitProps {
  circuit: NewCircuitProps;
  exercises: ExerciseVO[];
  deleteClickHandler: (circuitId: string) => void;
}
