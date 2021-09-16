import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      fontSize: '5vh',
    },
    fullLength: {
      width: '100%',
    },
    halfLength: {
      width: '50%',
    },
    notchedOutline: {
      border: 0,
    },
  })
);

export default function SetTextField(props: SetTextFieldProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      item
      className={props.fullLength ? classes.fullLength : classes.halfLength}
    >
      <TextField
        fullWidth
        variant={'outlined'}
        value={props.value}
        inputProps={{
          style: { textAlign: props.fullLength ? 'center' : undefined },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'start'}>
              {props.inputAdornment}
            </InputAdornment>
          ),
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />
    </Grid>
  );
}

export interface SetTextFieldProps {
  value: number;
  inputAdornment: 'reps' | 'lb';
  fullLength: boolean;
}
