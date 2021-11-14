import clsx from 'clsx';
import React from 'react';
import SetDivider from './SetDivider';
import { Grid } from '@material-ui/core';
import SetTextField from './SetTextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../../configs/theme/app-theme';
import TimerDialog from '../../top-level-components/active-workout-screen/components/timer-dialog/TimerDialog';
import {
  isDuration,
  isRepsOnly,
  isWeightsAndReps,
} from 'workout-app-common-core';
import {
  SetTextFieldInfoProps,
  SetTextFieldTypes,
} from '../../../configs/types';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    supersetRowWrapper: {
      height: '12.2vh',
      border: '1px solid',
      borderColor: theme.palette.custom.colors.componentBackground,
    },
    straightSetRowWrapper: {
      height: '100%',
      paddingRight: 4,
      borderRadius: '4px 0 0 4px',
    },
    active: theme.palette.custom.styles.active,
    baseColor: theme.palette.custom.styles.base,
    done: theme.palette.custom.styles.done,
    timerWrapper: {
      borderLeft: '2px solid',
      borderColor: '#313131',
    },
  })
);

const buildField = (
  info: SetTextFieldInfoProps,
  activeSet: boolean,
  markedDone: boolean,
  type: SetTextFieldTypes,
  fullLength: boolean
) => {
  let value = 0;
  switch (type) {
    case 'reps':
      value = info.reps ? info.reps : 0;
      break;
    case 'weight':
      value = info.weight ? info.weight : 0;
      break;
    case 'duration':
      value = info.duration ? info.duration.seconds : 0;
      break;
  }
  return (
    <SetTextField
      value={value}
      fullLength={fullLength}
      setType={type}
      setId={info.setId}
      alternateSides={info.alternateSides}
      activeSet={activeSet}
      markedDone={markedDone}
    />
  );
};

export default function BaseSet({
  info,
  activeSet,
  markedDone,
  superset,
  extraStyles,
  scrollToSetNumber,
}: BaseSetProps): JSX.Element {
  const classes = useStyles();
  let baseClass = '';
  let display = <div />;

  if (superset) {
    baseClass = classes.supersetRowWrapper;
  } else {
    baseClass = classes.straightSetRowWrapper;
  }

  if (isWeightsAndReps(info.parameterTypeId)) {
    display = (
      <>
        {buildField(info, activeSet, markedDone, 'weight', false)}

        <SetDivider activeSet={activeSet} markedDone={markedDone} />

        {buildField(info, activeSet, markedDone, 'reps', false)}
      </>
    );
  } else if (isRepsOnly(info.parameterTypeId)) {
    display = buildField(info, activeSet, markedDone, 'reps', true);
  } else if (isDuration(info.parameterTypeId)) {
    display =
      info.timers && info.shouldDisplayTimer ? (
        <Grid container>
          <Grid item xs={8}>
            {buildField(info, activeSet, markedDone, 'duration', true)}
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
              activeSet={activeSet}
              markedDone={markedDone}
              timers={info.timers}
            />
          </Grid>
        </Grid>
      ) : (
        buildField(info, activeSet, markedDone, 'duration', true)
      );
  }

  return (
    <Grid
      item
      xs={superset ? 12 : 8}
      container
      alignItems={'center'}
      id={`active-set-${scrollToSetNumber}`}
      className={clsx(
        baseClass,
        extraStyles,
        activeSet ? classes.active : classes.baseColor,
        markedDone ? classes.done : undefined
      )}
    >
      {display}
    </Grid>
  );
}

interface BaseSetProps {
  superset: boolean;
  markedDone: boolean;
  activeSet: boolean;
  info: SetTextFieldInfoProps;
  extraStyles?: string;
  scrollToSetNumber: number;
}
