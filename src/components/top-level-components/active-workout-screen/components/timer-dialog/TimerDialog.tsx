import React from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import {
  WorkoutTimer,
  NightfallCountdownTimer,
  NightfallStepper,
} from 'workout-app-common-core';
import { AppTheme } from '../../../../../configs/theme/app-theme';

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

export default function TimerDialog({
  timers,
  activeSet,
  markedDone,
}: TimerDialogProps): JSX.Element {
  const classes = useStyles();
  const theme = useTheme<AppTheme>();
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  let fontColor = theme.palette.custom.colors.idle;

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

  if (activeSet) {
    fontColor = theme.palette.custom.colors.activeText;
  } else if (markedDone) {
    fontColor = theme.palette.custom.colors.activeText;
  }

  timers.sort((a, b) => a.order - b.order);

  return (
    <>
      <IconButton
        disabled={!activeSet}
        onClick={handleClickOpen}
        style={{ color: fontColor, height: '100%', width: '40%' }}
      >
        <TimerIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <NightfallStepper activeStep={activeStep} timers={timers} />
        </DialogTitle>
        <DialogContent>
          <Grid
            container
            alignItems={'center'}
            justify={'center'}
            className={classes.contentWrapper}
          >
            <NightfallCountdownTimer
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

interface TimerDialogProps {
  timers: WorkoutTimer[];
  activeSet: boolean;
  markedDone: boolean;
}
