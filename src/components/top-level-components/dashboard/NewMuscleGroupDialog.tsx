import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { createNewMuscleGroup } from '../../../services/muscle-group-service';

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

export default function NewMuscleGroupDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>('');

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} aria-label="delete">
        <AddIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={'xs'}
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant={'h6'}>{'New Workout Type'}</Typography>

          <IconButton
            aria-label={'close'}
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ textAlign: 'center', padding: '32px 8px' }}>
          <TextField
            style={{ padding: '16px 0', width: '85%' }}
            placeholder={'New Muscle Group'}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>{'Cancel'}</Button>
          <Button
            disabled={value === ''}
            onClick={() => {
              createNewMuscleGroup(value);
              handleClose();
            }}
          >
            {'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
