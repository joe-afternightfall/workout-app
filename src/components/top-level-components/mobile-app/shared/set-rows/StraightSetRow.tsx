import React from 'react';
import { Grid } from '@material-ui/core';
import BaseSet from '../set-fields/BaseSet';
import { SetFieldInfoProps } from '../set-fields/SetTextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '11.5vh',
      marginBottom: 8,
    },
    buttonWrapper: {
      height: '100%',
      paddingLeft: 4,
    },
  })
);

export default function StraightSetRow(
  props: StraightSetRowProps
): JSX.Element {
  const classes = useStyles();
  const { info, activeSet, markedDone, actionButton, setNumber } = props;

  return (
    <Grid
      item
      xs={12}
      container
      alignItems={'flex-start'}
      className={classes.root}
    >
      <BaseSet
        info={info}
        superset={false}
        activeSet={activeSet}
        markedDone={markedDone}
        scrollToSetNumber={setNumber}
      />

      <Grid item xs={4} className={classes.buttonWrapper}>
        {actionButton}
      </Grid>
    </Grid>
  );
}

export interface StraightSetRowProps {
  setNumber: number;
  markedDone: boolean;
  activeSet: boolean;
  info: SetFieldInfoProps;
  actionButton: JSX.Element;
}
