import clsx from 'clsx';
import React from 'react';
import {
  isDuration,
  isRepsOnly,
  isWeightsAndReps,
} from 'workout-app-common-core';
import { Grid } from '@material-ui/core';
import RepsOnlyField from './fields/RepsOnlyField';
import DurationField from './fields/DurationField';
import { AppTheme } from '../../../../configs/theme/app-theme';
import WeightsAndRepsField from './fields/WeightsAndRepsField';
import { SetTextFieldInfoProps } from '../../../../configs/types';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import DurationAndTimerField from './fields/DurationAndTimerField';

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
  })
);

export default function BaseSet({
  info,
  activeSet,
  markedDone,
  superset,
  extraStyles,
  scrollToSetNumber,
}: BaseSetProps): JSX.Element {
  const classes = useStyles();
  let display = <div />;

  const baseProps = {
    info: info,
    activeSet: activeSet,
    markedDone: markedDone,
  };

  if (isWeightsAndReps(info.parameterTypeId)) {
    display = <WeightsAndRepsField baseProps={baseProps} />;
  } else if (isRepsOnly(info.parameterTypeId)) {
    display = <RepsOnlyField baseProps={baseProps} />;
  } else if (isDuration(info.parameterTypeId)) {
    display =
      info.timers && info.shouldDisplayTimer ? (
        <DurationAndTimerField baseProps={baseProps} />
      ) : (
        <DurationField baseProps={baseProps} />
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
        extraStyles,
        activeSet ? classes.active : classes.baseColor,
        {
          [classes.done]: markedDone,
          [classes.supersetRowWrapper]: superset,
          [classes.straightSetRowWrapper]: !superset,
        }
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
