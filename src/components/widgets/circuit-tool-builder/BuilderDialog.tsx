import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ToolBuilderCard from './ToolBuilderCard';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import {
  Card,
  DialogContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@material-ui/core';
import { Container, Draggable } from 'react-smooth-dnd';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircuitSelector from './components/CircuitSelector';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExerciseTypeVO } from '../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import SetIncrementer from './components/SetIncrementer';
import { arrayMoveImmutable } from 'array-move';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    selectedRow: {
      marginBottom: theme.spacing(1),
      border: `solid 1px ${theme.palette.primary.main}`,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction={'up'} ref={ref} {...props} />;
});

interface SetTemplate {
  setTemplateId: string;
  exerciseSet: ExerciseTypeVO;
  sets: number;
  weight: number;
  reps: number;
}

interface CircuitTemplate {
  id: string;
  circuitId: string;
  circuitNickname: string;
  exercises: SetTemplate[];
}

export default function BuilderDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [template, setTemplate] = useState<CircuitTemplate>({
    id: uuidv4(),
    circuitId: '',
    circuitNickname: '',
    exercises: [],
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddExercise = (exercise: ExerciseTypeVO) => {
    setTemplate({
      ...template,
      exercises: [
        ...template.exercises,
        {
          setTemplateId: uuidv4(),
          exerciseSet: exercise,
          sets: 0,
          weight: 0,
          reps: 0,
        },
      ],
    });
  };

  const handleSelectCircuit = (circuitId: string) => {
    setTemplate({
      ...template,
      circuitId: circuitId,
    });
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate({
      ...template,
      circuitNickname: e.target.value,
    });
  };

  const handleSetChange = (action: 'add' | 'subtract', id: string) => {
    const foundSet = template.exercises.find(
      (set: SetTemplate) => set.setTemplateId === id
    );

    if (foundSet) {
      if (action === 'add') {
        foundSet.sets++;
      } else {
        foundSet.sets = foundSet.sets - 1;
      }

      setTemplate({
        ...template,
        exercises: [...template.exercises],
      });
    }
  };

  const onDrop = ({
    removedIndex,
    addedIndex,
  }: {
    removedIndex: number | null;
    addedIndex: number | null;
  }) => {
    if (removedIndex !== null && addedIndex !== null) {
      setTemplate((prevState) => {
        return {
          ...prevState,
          exercises: arrayMoveImmutable(
            prevState.exercises,
            removedIndex,
            addedIndex
          ),
        };
      });
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <Grid container>
          <Grid item xs={7}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <Typography variant={'h6'} className={classes.title}>
                  {'Preconfigure Circuit'}
                </Typography>
                <IconButton
                  edge={'start'}
                  color={'inherit'}
                  onClick={handleClose}
                  aria-label={'close'}
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Grid container spacing={2} style={{ padding: '0 24px' }}>
              <Grid item xs={12} sm={6}>
                <CircuitSelector
                  selectedCircuitId={template.circuitId}
                  onChangeHandler={handleSelectCircuit}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={template.circuitNickname}
                  label={'Circuit Nickname'}
                  onChange={handleTextFieldChange}
                />
              </Grid>
              <Grid item xs={12}>
                <List>
                  <Container
                    dragClass={classes.selectedRow}
                    dragHandleSelector={'.drag-handle'}
                    onDrop={onDrop}
                  >
                    {template.exercises.map(
                      (setTemplate: SetTemplate, index: number) => {
                        index += 1;
                        return (
                          <Draggable key={setTemplate.setTemplateId}>
                            <Card>
                              <ListItem
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                              >
                                <Grid container>
                                  <Grid item xs={11}>
                                    <ListItemText
                                      primary={
                                        <Grid
                                          key={index}
                                          container
                                          xs={12}
                                          style={{ marginTop: 8 }}
                                        >
                                          <Grid
                                            item
                                            xs={12}
                                            container
                                            spacing={2}
                                          >
                                            <Grid
                                              item
                                              sm={5}
                                              container
                                              alignItems={'center'}
                                            >
                                              <Grid item>
                                                <Typography>
                                                  {`${index}. ${setTemplate.exerciseSet.name}`}
                                                </Typography>
                                              </Grid>
                                            </Grid>
                                            <Grid item sm={3}>
                                              <SetIncrementer
                                                setNumber={setTemplate.sets}
                                                setTemplateId={
                                                  setTemplate.setTemplateId
                                                }
                                                changeHandler={handleSetChange}
                                              />
                                            </Grid>
                                            <Grid item sm={2}>
                                              <TextField
                                                variant={'outlined'}
                                                name={'weight'}
                                                value={setTemplate.weight}
                                                inputProps={{
                                                  style: {
                                                    textAlign: 'center',
                                                  },
                                                }}
                                              />
                                            </Grid>
                                            <Grid item sm={2}>
                                              <TextField
                                                variant={'outlined'}
                                                name={'reps'}
                                                value={setTemplate.reps}
                                                inputProps={{
                                                  style: {
                                                    textAlign: 'center',
                                                  },
                                                }}
                                              />
                                            </Grid>
                                          </Grid>

                                          <Grid
                                            item
                                            xs={12}
                                            container
                                            style={{ textAlign: 'center' }}
                                            spacing={2}
                                          >
                                            <Grid item sm={5} />
                                            <Grid item sm={3}>
                                              <Typography>{'Sets'}</Typography>
                                            </Grid>
                                            <Grid item sm={2}>
                                              <Typography>
                                                {'Weight'}
                                              </Typography>
                                            </Grid>
                                            <Grid item sm={2}>
                                              <Typography>{'Reps'}</Typography>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      }
                                    />
                                  </Grid>
                                  <Grid
                                    item
                                    xs={1}
                                    container
                                    alignItems={'center'}
                                    justify={'center'}
                                  >
                                    <Grid item>
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
                      }
                    )}
                  </Container>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <ToolBuilderCard addExerciseHandler={handleAddExercise} />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
