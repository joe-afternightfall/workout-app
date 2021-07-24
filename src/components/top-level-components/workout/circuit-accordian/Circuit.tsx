import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Grid,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import RowTitle from './RowTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Draggable } from 'react-smooth-dnd';
import DragHandleIcon from '@material-ui/icons/DragHandle';

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
      expanded={expanded === props.id}
      onChange={handleChange(props.id)}
    >
      <AccordionSummary
        id={`panel-${props.id}-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{'Circuit'}</Typography>
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
              return (
                <Draggable key={step}>
                  <Card className={classes.root}>
                    <ListItem>
                      <Grid container spacing={2}>
                        <Grid item xs={10}>
                          <ListItemText primary={'primaryListItem'} />
                        </Grid>

                        <Grid
                          item
                          xs={2}
                          container
                          alignItems={'center'}
                          justify={'center'}
                        >
                          <Grid item xs={6}>
                            <ListItemIcon className={'drag-handle'}>
                              <IconButton>
                                <DragHandleIcon />
                              </IconButton>
                            </ListItemIcon>
                          </Grid>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Card>
                </Draggable>
              );
            })}
          </Container>
        </Grid>
      </AccordionDetails>

      <AccordionActions>
        <Button
          onClick={() => {
            props.deleteClickHandler(props.id);
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
  id: string;
  deleteClickHandler: (circuitId: string) => void;
}
