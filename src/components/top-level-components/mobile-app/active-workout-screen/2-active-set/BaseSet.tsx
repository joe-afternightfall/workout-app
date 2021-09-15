import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { isWeightsAndReps } from '../../../../../utils/active-workout';
import SetTextField from './components/SetTextField';
import SetDivider from './components/SetDivider';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    supersetRowWrapper: {
      border: '1px solid',
      borderColor: '#222323',
      // borderRadius: 'inherit',
      height: '12.2vh',
      // backgroundColor: '#222323',
    },
    straightSetRowWrapper: {
      borderRadius: '4px 0 0 4px',
      height: '100%',
      paddingRight: 4,
    },
    activeOrange: {
      backgroundColor: '#ED440B',
    },
    baseColor: {
      borderColor: '#222323',
      backgroundColor: '#222323',
    },
    done: {
      borderColor: '#ED440B',
      backgroundColor: '#ED440B',
      opacity: 0.6,
    },
  })
);

// todo: need to handle isDuration param type

export default function BaseSet(props: BaseSetProps): JSX.Element {
  const classes = useStyles();
  const { info, activeSet, markedDone, superset } = props;
  let baseClass = '';

  if (superset) {
    baseClass = classes.supersetRowWrapper;
  } else {
    baseClass = classes.straightSetRowWrapper;
  }

  return (
    <Grid
      item
      xs={superset ? 12 : 8}
      container
      alignItems={'center'}
      id={`active-set-${props.scrollToSetNumber}`}
      className={clsx(
        baseClass,
        props.extraStyles,
        activeSet ? classes.activeOrange : classes.baseColor,
        markedDone ? classes.done : undefined
      )}
    >
      {isWeightsAndReps(info.parameterTypeId) && info.weight ? (
        <>
          <SetTextField
            value={info.weight}
            inputAdornment={'lb'}
            fullLength={false}
          />

          <SetDivider />

          <SetTextField
            value={info.reps}
            inputAdornment={'reps'}
            fullLength={false}
          />
        </>
      ) : (
        <SetTextField
          value={info.reps}
          inputAdornment={'reps'}
          fullLength={true}
        />
      )}
    </Grid>
  );
}

export interface BaseSetProps {
  superset: boolean;
  markedDone: boolean;
  activeSet: boolean;
  info: {
    reps: number;
    weight?: number;
    parameterTypeId: string;
  };
  extraStyles?: string;
  scrollToSetNumber: number;
}
