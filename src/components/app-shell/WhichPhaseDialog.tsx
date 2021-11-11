import React from 'react';
import {
  Grid,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import { getPhaseName, Phase } from 'workout-app-common-core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { closeAndUpdatePhaseIdToAddNewSegment } from '../../creators/workout/workout-selections';

const useStyles = makeStyles(() => createStyles({}));

const WhichPhaseDialog = (props: WhichPhaseDialogProps): JSX.Element => {
  const classes = useStyles();
  const { open, buttonOptions } = props;

  return (
    <Dialog open={open} maxWidth={'sm'} fullWidth>
      <DialogTitle disableTypography>
        <Typography variant={'body1'}>
          {'Select which Phase to add exercise'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid container item xs={12} spacing={2}>
          {buttonOptions.map((option, index) => (
            <Grid item xs={12} key={index}>
              <Button
                onClick={() => props.closeAndUpdateHandler(option.id)}
                variant={'contained'}
                color={'primary'}
                fullWidth
              >
                {option.name}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

interface WhichPhaseDialogProps {
  open: boolean;
  buttonOptions: { name: string; id: string }[];
  closeAndUpdateHandler: (phaseId: string) => void;
}

const mapStateToProps = (state: State): WhichPhaseDialogProps => {
  const open = state.workoutState.displayWhichPhaseDialog.open;
  const phaseType = state.workoutState.displayWhichPhaseDialog.phaseType;
  const allPhases = state.applicationState.workoutConfigurations.phases;
  const buttonOptions: { name: string; id: string }[] = [];
  let phases: Phase[] = [];
  if (phaseType === 'editing') {
    phases = state.workoutState.copyOfRoutineTemplate.phases;
  } else if (phaseType === 'activeWorkout') {
    phases = state.workoutState.activeWorkout.routine.phases;
  }

  phases.map((phase) => {
    const phaseName = getPhaseName(allPhases, phase.phaseId);
    phaseName &&
      buttonOptions.push({
        name: phaseName,
        id: phase.id,
      });
  });

  return {
    open: open,
    buttonOptions: buttonOptions,
  } as unknown as WhichPhaseDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): WhichPhaseDialogProps =>
  ({
    closeAndUpdateHandler: (phaseId: string) => {
      dispatch(closeAndUpdatePhaseIdToAddNewSegment(phaseId));
    },
  } as unknown as WhichPhaseDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(WhichPhaseDialog);
