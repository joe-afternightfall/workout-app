import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import { WorkoutTimer } from '../../../../../../configs/models/AppInterfaces';
import CountdownTimer from './components/countdown-timer/CountdownTimer';
import CustomStepper from './components/stepper/CustomStepper';

const useStyles = makeStyles(() =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
      paddingBottom: 16,
    },
    dialogTitle: {
      padding: '16px 0',
    },
  })
);

export default function TimerDialog({ timers }: TimerDialogProps): JSX.Element {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
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

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <CustomStepper activeStep={activeStep} timers={timers} />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.contentWrapper}
          >
            <CountdownTimer
              timers={timers}
              nextStepHandler={handleNextStep}
              closeHandler={handleClose}
              resetStepperHandler={handleResetStepper}
            />
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}

export interface TimerDialogProps {
  timers: WorkoutTimer[];
}
