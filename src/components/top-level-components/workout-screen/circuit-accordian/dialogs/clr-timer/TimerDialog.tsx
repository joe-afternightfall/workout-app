import React from 'react';
import {
  Grid,
  Dialog,
  IconButton,
  DialogTitle,
  DialogContent,
  Button,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import PlankTimer from './components/CLR-PlankTimer';
import PlankStepper from './components/CLR-PlankStepper';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
    },
    dialogTitle: {
      padding: '16px 0',
    },
  })
);

export default function TimerDialog(): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [startTimer, setStartTimer] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleResetStepper = () => {
    setActiveStep(0);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleTimer = (toggle: boolean) => {
    setStartTimer(toggle);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <PlankStepper activeStep={activeStep} />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.contentWrapper}
          >
            <PlankTimer
              isPlaying={startTimer}
              closeHandler={handleClose}
              nextStepHandler={handleNextStep}
              resetStepperHandler={handleResetStepper}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
