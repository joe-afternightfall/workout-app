import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseSet from '../../active-workout-screen/2-active-set/BaseSet';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '11.5vh',
      marginBottom: 8,
    },
  })
);

export default function StraightSetRow(
  props: StraightSetRowProps
): JSX.Element {
  const classes = useStyles();
  const { info, activeSet, markedDone } = props;

  return (
    <Grid item xs={12} container alignItems={'center'} className={classes.root}>
      <BaseSet
        superset={false}
        activeSet={activeSet}
        markedDone={markedDone}
        scrollToSetNumber={props.setNumber}
        info={{
          reps: info.reps,
          weight: info.weight,
          parameterTypeId: info.parameterTypeId,
        }}
      />

      <Grid item xs={4} style={{ height: '100%', paddingLeft: 4 }}>
        {props.actionButton}
      </Grid>
    </Grid>
  );
}

export interface StraightSetRowProps {
  setNumber: number;
  markedDone: boolean;
  activeSet: boolean;
  info: {
    reps: number;
    weight?: number;
    parameterTypeId: string;
  };
  actionButton: JSX.Element;
}
