import React from 'react';
import ExerciseTabs from './ExerciseTabs';
import { Button, Dialog } from '@material-ui/core';

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
        <ExerciseTabs
          workoutCircuitId={props.circuitId}
          closeClickHandler={handleClose}
        />
      </Dialog>
    </>
  );
}

export interface AddExerciseDialogProps {
  circuitId: string;
}
