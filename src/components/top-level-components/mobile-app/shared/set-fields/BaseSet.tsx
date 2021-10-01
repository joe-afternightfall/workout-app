import clsx from 'clsx';
import React from 'react';
import SetDivider from './SetDivider';
import { Grid } from '@material-ui/core';
import SetTextField, { SetFieldInfoProps } from './SetTextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  isDuration,
  isRepsOnly,
  isWeightsAndReps,
} from '../../../../../utils/active-workout';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import TimerDialog from '../../active-workout-screen/components/timer-dialog/TimerDialog';

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
      borderLeft: '4px solid',
      borderColor: '#313131',
    },
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
        <SetTextField
          value={info.weight ? info.weight : 0}
          fullLength={false}
          setType={'weight'}
          setId={info.setId}
          alternateSides={info.alternateSides}
          activeSet={activeSet}
          markedDone={markedDone}
        />

        <SetDivider />

        <SetTextField
          value={info.reps ? info.reps : 0}
          fullLength={false}
          setType={'reps'}
          setId={info.setId}
          alternateSides={info.alternateSides}
          activeSet={activeSet}
          markedDone={markedDone}
        />
      </>
    );
  } else if (isRepsOnly(info.parameterTypeId)) {
    display = (
      <SetTextField
        value={info.reps ? info.reps : 0}
        fullLength={true}
        setType={'reps'}
        setId={info.setId}
        alternateSides={info.alternateSides}
        activeSet={activeSet}
        markedDone={markedDone}
      />
    );
  } else if (isDuration(info.parameterTypeId)) {
    display =
      info.timers && info.shouldDisplayTimer ? (
        <Grid container>
          <Grid item xs={8}>
            <SetTextField
              value={info.duration ? info.duration.seconds : 0}
              fullLength={true}
              setType={'sec'}
              setId={info.setId}
              alternateSides={info.alternateSides}
              activeSet={activeSet}
              markedDone={markedDone}
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
              activeSet={activeSet}
              markedDone={markedDone}
              timers={info.timers}
            />
          </Grid>
        </Grid>
      ) : (
        <SetTextField
          value={info.duration ? info.duration.seconds : 0}
          fullLength={true}
          setType={'sec'}
          setId={info.setId}
          alternateSides={info.alternateSides}
          activeSet={activeSet}
          markedDone={markedDone}
        />
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

export interface BaseSetProps {
  superset: boolean;
  markedDone: boolean;
  activeSet: boolean;
  info: SetFieldInfoProps;
  extraStyles?: string;
  scrollToSetNumber: number;
}
