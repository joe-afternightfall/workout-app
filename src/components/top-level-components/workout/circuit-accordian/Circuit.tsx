import React from 'react';
import {
  Grid,
  Button,
  Accordion,
  Typography,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import RowTitle from './RowTitle';
import ExerciseSet from './ExerciseSet';
import { Container } from 'react-smooth-dnd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { NewCircuitProps } from '../WorkoutScreen';

const steps = [0, 1, 2, 3, 4];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    selectedRow: {
      marginBottom: theme.spacing(1),
      border: `solid 1px ${theme.palette.primary.main}`,
    },
  })
);

export default function Circuit(props: CircuitProps): JSX.Element {
  const classes = useStyles();
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
        <Typography>{`Circuit: ${props.circuit.type}`}</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container spacing={2}>
          <RowTitle />

          <Container
            dragClass={classes.selectedRow}
            dragHandleSelector={'.drag-handle'}
            // onDrop={orderAndUpdateStrategies}
          >
            {steps.map((step: number) => {
              return <ExerciseSet key={step} setNumber={step} />;
            })}
          </Container>
        </Grid>
      </AccordionDetails>

      <AccordionActions>
        <Button
          onClick={() => {
            props.deleteClickHandler(props.circuit.id);
          }}
        >
          {'Delete Circuit'}
        </Button>

        <Button>{'Add Exercise'}</Button>
      </AccordionActions>
    </Accordion>
  );
}

export interface CircuitProps {
  circuit: NewCircuitProps;
  deleteClickHandler: (circuitId: string) => void;
}
