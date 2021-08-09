import React from 'react';
import ExerciseTabs from './ExerciseTabs';
import { Button, Dialog, Grid } from '@material-ui/core';
import BaseDialogContent from '../../../../../app-shell/BaseDialogContent';

export default function AddExerciseDialog(
  props: AddExerciseDialogProps
): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>{'Add Exercise'}</Button>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'md'}>
        <BaseDialogContent
          title={'Add Exercise'}
          dialogContent={
            <ExerciseTabs
              workoutCircuitId={props.circuitId}
              closeClickHandler={handleClose}
            />
          }
          closeClickHandler={handleClose}
          dialogActions={
            <Grid container justifyContent={'flex-end'}>
              <Grid item>
                <Button onClick={handleClose}>{'Cancel'}</Button>
              </Grid>
            </Grid>
          }
        />
      </Dialog>
    </>
  );
}

export interface AddExerciseDialogProps {
  circuitId: string;
}
