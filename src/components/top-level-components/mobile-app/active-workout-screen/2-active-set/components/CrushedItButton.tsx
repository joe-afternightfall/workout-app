import clsx from 'clsx';
import React from 'react';
import { Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      borderRadius: '0 8px 8px 0',
      // backgroundColor: '#222323',
    },
    activeOrange: {
      borderColor: '#ED440B',
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

export default function CrushedItButton(
  props: CrushedItButtonProps
): JSX.Element {
  const classes = useStyles();

  return (
    <Button
      className={clsx(
        classes.root,
        props.activeSet ? classes.activeOrange : classes.baseColor,
        props.markedDone ? classes.done : undefined
      )}
      onClick={props.crushedItClickHandler}
      disabled={props.markedDone}
    >
      {'Crushed It'}
    </Button>
  );
}

export interface CrushedItButtonProps {
  activeSet: boolean;
  markedDone: boolean;
  crushedItClickHandler: () => void;
}
