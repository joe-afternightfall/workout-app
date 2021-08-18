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
    checkedLabel: {
      opacity: 1,
      fontWeight: 'bold',
      color: '#00bcd4',
    },
  })
);

export default function SelectorControl(
  props: SelectorControlsProps
): JSX.Element {
  const classes = useStyles();
  const [checked, setChecked] = React.useState('');

  const handleToggle = (inputId: string) => {
    checked === inputId ? setChecked('') : setChecked(inputId);
  };

  return (
    <>
      <input
        type={'checkbox'}
        className={clsx(classes.checkbox, props.inputId)}
        id={props.inputId}
        value={' '}
        onChange={() => {
          handleToggle(props.inputId);
        }}
      />

      <label
        htmlFor={props.inputId}
        className={clsx(classes.label, {
          [classes.checkedLabel]: checked === props.inputId,
        })}
      >
        <Typography>{props.title}</Typography>
      </label>
    </>
  );
}

export interface SelectorControlsProps {
  inputId: string;
  title: string;
}
