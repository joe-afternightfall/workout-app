import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import AppTooltip from '../../../../app-shell/AppTooltip';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';
import { blue, red, green } from '@material-ui/core/colors';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    saveButton: {
      color: '#fff',
      borderRadius: 6,
      background: green[500],
      '&:hover': {
        background: green[600],
      },
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    confirmButton: {
      color: blue[500],
    },
    cancelButton: {
      color: red[500],
    },
  })
);

export default function WorkoutDoneDialog(
  props: WorkoutDoneDialogProps
): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppTooltip
        element={
          <IconButton
            disabled={props.disabled}
            className={classes.saveButton}
            onClick={handleClickOpen}
          >
            <DoneIcon />
          </IconButton>
        }
        title={'Done With Workout'}
        placement={'bottom'}
      />

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <BaseDialogContent
          title={'Save Workout'}
          closeClickHandler={handleClose}
          dialogContent={
            <div style={{ textAlign: 'center' }}>
              <Typography style={{ padding: '32px 0' }}>
                {`Done with workout?`}
              </Typography>
            </div>
          }
          dialogActions={
            <Grid container justifyContent={'flex-end'}>
              <Grid item>
                <Button className={classes.cancelButton} onClick={handleClose}>
                  {'Cancel'}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    props.saveWorkoutHandler();
                    handleClose();
                  }}
                  className={classes.confirmButton}
                >
                  {'Yes Save Workout'}
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Dialog>
    </>
  );
}

export interface WorkoutDoneDialogProps {
  disabled: boolean;
  saveWorkoutHandler: () => void;
}