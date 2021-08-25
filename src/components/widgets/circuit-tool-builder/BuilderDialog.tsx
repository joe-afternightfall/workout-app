import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import ToolBuilderCard from './ToolBuilderCard';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CircuitSelector from './components/CircuitSelector';
import { TransitionProps } from '@material-ui/core/transitions';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExerciseTypeVO } from '../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
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
            <Grid container spacing={2}>
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
                {template.exercises.map(
                  (exercise: SetTemplate, index: number) => {
                    return (
                      <div key={index}>
                        <Typography>{exercise.exerciseSet.name}</Typography>
                        <Typography>{exercise.sets}</Typography>
                        <Typography>{exercise.weight}</Typography>
                        <Typography>{exercise.reps}</Typography>
                      </div>
                    );
                  }
                )}
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
