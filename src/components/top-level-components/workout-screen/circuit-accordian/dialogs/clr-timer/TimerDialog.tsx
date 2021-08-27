import React from 'react';
import {
  Grid,
  Dialog,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import PlankTimer from './components/CLR-PlankTimer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import PlankStepper from './components/CLR-PlankStepper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    contentWrapper: {
      minHeight: '30vh',
      height: '100%',
      textAlign: 'center',
    },
  })
);

export default function TimerDialog(): JSX.Element {
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
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'xs'}>
        <DialogTitle>
          <Typography variant={'h6'}>{'CLR Plank Timer'}</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.contentWrapper}
          >
            <Grid item xs={12}>
              <PlankStepper activeStep={activeStep} />
            </Grid>
            <Grid item>
              <PlankTimer
                closeHandler={handleClose}
                nextStepHandler={handleNextStep}
                resetStepperHandler={handleResetStepper}
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
