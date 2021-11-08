import React, { useState } from 'react';
import ExitContent from './components/ExitContent';
import SaveAndExitButton from './components/SaveAndExitButton';
import ReturnToWorkoutLink from './components/ReturnToWorkoutLink';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Dialog, Button, DialogContent } from '@material-ui/core';
import ExitWithoutSavingButton from './components/ExitWithoutSavingButton';

const useStyles = makeStyles(() =>
  createStyles({
    content: {
      textAlign: 'center',
      minHeight: '45vh',
    },
  })
);

export default function ExitDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <Button color={'primary'} onClick={openDialog}>
        {'Exit'}
      </Button>
      <Dialog open={open} onClose={closeDialog}>
        <DialogContent className={classes.content}>
          <Grid container spacing={3}>
            <ExitContent />

            <SaveAndExitButton />

            <ExitWithoutSavingButton />

            <ReturnToWorkoutLink closeDialogHandler={closeDialog} />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
