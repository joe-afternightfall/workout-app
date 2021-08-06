import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { WorkoutCategoryVO } from '../../../../configs/models/WorkoutCategoryVO';
import { createNewExercise } from '../../../../services/exercise-service';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formControl: {
      width: '100%',
    },
  })
);

export default function NewExerciseDialog(
  props: NewExerciseDialogProps
): JSX.Element {
  const classes = useStyles();
  const [workoutCategoryId, setWorkoutCategoryId] = React.useState<string>('');
  const [textField, setTextField] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setWorkoutCategoryId(event.target.value as string);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTextField(event.target.value);
  };

  return (
    <Dialog
      fullWidth
      maxWidth={'xs'}
      open={props.open}
      onClose={props.closeClickHandler}
    >
      <DialogTitle disableTypography className={classes.root}>
        <Typography variant={'h6'}>{'New Exercise'}</Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              placeholder={'Enter Name'}
              onChange={handleTextFieldChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl className={classes.formControl}>
              <InputLabel id={'category-select-label'}>
                {'Workout Category'}
              </InputLabel>
              <Select
                labelId={'category-select-label'}
                id={'category-simple-menu'}
                value={workoutCategoryId}
                onChange={handleChange}
              >
                {props.workoutCategories.map(
                  (category: WorkoutCategoryVO, index: number) => {
                    return (
                      <MenuItem key={index} value={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  }
                )}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
        <Button
          disabled={textField === ''}
          onClick={() => {
            createNewExercise(textField, workoutCategoryId);
            props.closeClickHandler();
          }}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface NewExerciseDialogProps {
  open: boolean;
  closeClickHandler: () => void;
  workoutCategories: WorkoutCategoryVO[];
}
