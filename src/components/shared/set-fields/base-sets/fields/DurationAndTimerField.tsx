import React from 'react';
import { Grid } from '@material-ui/core';
import BaseSetField from '../components/BaseSetField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { SetTextFieldInfoProps } from '../../../../../configs/types';
import TimerDialog from '../../../../top-level-components/active-workout-screen/components/timer-dialog/TimerDialog';

const useStyles = makeStyles(() =>
  createStyles({
    timerWrapper: {
      borderLeft: '2px solid',
      borderColor: '#313131',
    },
  })
);

export default function DurationAndTimerField(
  props: DurationAndTimerFieldProps
): JSX.Element {
  const classes = useStyles();
  const { baseProps } = props;

  return (
    <Grid container>
      <Grid item xs={8}>
        <BaseSetField
          type={'duration'}
          baseProps={baseProps}
          fullLength={true}
        />
      </Grid>
      <Grid
        item
        xs={4}
        container
        align-items={'center'}
        justify={'center'}
        className={classes.timerWrapper}
      >
        <TimerDialog
          activeSet={baseProps.activeSet}
          markedDone={baseProps.markedDone}
          timers={baseProps.info.timers ? baseProps.info.timers : []}
        />
      </Grid>
    </Grid>
  );
}

interface DurationAndTimerFieldProps {
  baseProps: {
    info: SetTextFieldInfoProps;
    activeSet: boolean;
    markedDone: boolean;
  };
}
