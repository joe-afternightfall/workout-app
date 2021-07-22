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
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteMuscleGroup } from '../../../services/muscle-group-service';
import { MuscleGroupVO } from '../../../configs/models/MuscleGroupVO';
import { blue, red } from '@material-ui/core/colors';

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
    confirmButton: {
      color: red[500],
    },
    cancelButton: {
      color: blue[500],
    },
  })
);

export default function DeleteDialog(props: DeleteDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label="delete">
        <DeleteIcon />
      </IconButton>

      <Dialog
        onClose={handleClose}
        aria-labelledby={'delete-dialog'}
        open={open}
        fullWidth
        maxWidth={'xs'}
      >
        <DialogTitle disableTypography className={classes.root}>
          <Typography variant={'h6'}>{'Delete Muscle Group'}</Typography>

          <IconButton
            aria-label={'close'}
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ textAlign: 'center', padding: '32px 8px' }}>
          <Typography>
            {`Are you sure you want to delete ${props.group.name}?`}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              deleteMuscleGroup(props.group.firebaseId);
              handleClose();
            }}
            className={classes.confirmButton}
          >
            {'Yes Delete'}
          </Button>
          <Button className={classes.cancelButton} onClick={handleClose}>
            {'Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export interface DeleteDialogProps {
  group: MuscleGroupVO;
}
