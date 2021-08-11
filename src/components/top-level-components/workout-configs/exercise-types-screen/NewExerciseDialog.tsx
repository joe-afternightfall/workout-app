import React from 'react';
import {
  Grid,
  TextField,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import SetTypes from './dialog/SetTypes';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { createNewExerciseType } from '../../../../services/workout-configurations/exercise-types-service';
import { CategoryTypeVO } from '../../../../configs/models/workout-configurations/category-type/CategoryTypeVO';
import CategorySelectMenu from './dialog/CategorySelectMenu';
import { SetType } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

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
  })
);

export default function NewExerciseDialog(
  props: NewExerciseDialogProps
): JSX.Element {
  const classes = useStyles();
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>('');
  const [textField, setTextField] = React.useState<string>('');
  const [checked, setChecked] = React.useState<string>('');

  const checkboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked ? setChecked(event.target.name) : setChecked('');
  };

  const selectMenuChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategoryId(event.target.value as string);
  };

  const textFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
              onChange={textFieldChange}
            />
          </Grid>

          <Grid item xs={12}>
            <CategorySelectMenu
              selectedCategoryId={selectedCategoryId}
              categoryTypes={props.categoryTypes}
              onChangeHandler={selectMenuChange}
            />
          </Grid>

          <Grid item xs={12}>
            <SetTypes checked={checked} clickHandler={checkboxChange} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
        <Button
          disabled={
            textField === '' || checked === '' || selectedCategoryId === ''
          }
          onClick={() => {
            if (
              checked === SetType.WEIGHTS ||
              checked === SetType.TIME ||
              checked === SetType.TIME_AND_DISTANCE ||
              checked === SetType.REPS ||
              checked === SetType.TIME_AND_REPS
            ) {
              createNewExerciseType(
                textField,
                selectedCategoryId,
                checked
              ).then(() => {
                props.closeClickHandler();
              });
            }
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
  categoryTypes: CategoryTypeVO[];
}
