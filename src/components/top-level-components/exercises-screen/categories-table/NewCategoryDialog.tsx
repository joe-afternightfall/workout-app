import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  IconButton,
  DialogTitle,
  DialogActions,
  DialogContent,
  Typography,
  Button,
  Dialog,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { createNewWorkoutCategory } from '../../../../services/workout-categories-service';

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

export default function NewCategoryDialog(
  props: NewCategoryDialogProps
): JSX.Element {
  const classes = useStyles();
  const [textField, setTextField] = React.useState<string>('');

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
        <Typography variant={'h6'}>{'New Workout Category'}</Typography>

        <IconButton
          aria-label={'close'}
          onClick={props.closeClickHandler}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent style={{ margin: '32px 0' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              style={{ width: '100%' }}
              placeholder={'Enter Category Name'}
              onChange={handleTextFieldChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.closeClickHandler}>{'Cancel'}</Button>
        <Button
          disabled={textField === ''}
          onClick={() => {
            createNewWorkoutCategory(textField).then(() => {
              props.closeClickHandler();
            });
          }}
        >
          {'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export interface NewCategoryDialogProps {
  open: boolean;
  closeClickHandler: () => void;
}
