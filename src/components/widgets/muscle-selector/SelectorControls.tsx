import React from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    checkbox: {
      display: 'none',
    },
    label: {
      width: 50,
      display: 'block',
      marginBottom: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.7rem',
      opacity: 0.5,
      position: 'relative',
      zIndex: 200,
      borderLeft: '5px solid transparent',
      paddingLeft: 6,
      marginLeft: -11,
      '&:hover': {
        opacity: 1,
        borderColor: 'rgba(51, 51, 51, .75)',
      },
    },
  })
);

export default function SelectorControls(
  props: SelectorControlsProps
): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <input
        type={'checkbox'}
        className={clsx(classes.checkbox, props.inputId)}
        id={props.inputId}
        value={' '}
      />

      <label htmlFor={props.inputId} className={classes.label}>
        <Typography>{props.title}</Typography>
      </label>
    </>
  );
}

export interface SelectorControlsProps {
  inputId: string;
  title: string;
}
