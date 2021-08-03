import React from 'react';
import {
  Grid,
  Dialog,
  Button,
  IconButton,
  Typography,
} from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';
import DeleteIcon from '@material-ui/icons/HighlightOff';
import BaseDialogContent from '../../../../app-shell/BaseDialogContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ExerciseVO } from '../../../../../configs/models/ExerciseVO';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

export default function DeleteExerciseDialog(
  props: DeleteExerciseDialogProps
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
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <BaseDialogContent
          title={'Delete Circuit'}
          closeClickHandler={handleClose}
          dialogContent={
            <Typography style={{ padding: '32px 0' }}>
              {`Are you sure you want to delete ${props.exercise.name}?`}
            </Typography>
          }
          dialogActions={
            <Grid container justify={'flex-end'}>
              <Grid item>
                <Button
                  onClick={() => {
                    props.deleteExerciseHandler(
                      props.circuitId,
                      props.exercise.id
                    );
                    handleClose();
                  }}
                  className={classes.confirmButton}
                >
                  {'Yes Delete'}
                </Button>
              </Grid>

              <Grid item>
                <Button className={classes.cancelButton} onClick={handleClose}>
                  {'Cancel'}
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Dialog>
    </>
  );
}

export interface DeleteExerciseDialogProps {
  exercise: ExerciseVO;
  circuitId: string;
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
}