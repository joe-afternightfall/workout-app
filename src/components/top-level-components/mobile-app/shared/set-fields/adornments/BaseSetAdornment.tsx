import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { InputAdornment, Typography } from '@material-ui/core';
import PerSideAdornment from '../PerSideAdornment';
import { AppTheme } from '../../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {},
    activeText: {
      color: theme.palette.custom.colors.activeText,
    },
    idleText: {
      color: theme.palette.custom.colors.idle,
    },
  })
);

export default function BaseSetAdornment({
  activeSet,
  setType,
  alternateSides,
}: BaseSetAdornmentProps): JSX.Element {
  const classes = useStyles();
  let display: JSX.Element;

  if (setType === 'weight') {
    display = (
      <Typography className={activeSet ? classes.activeText : classes.idleText}>
        {'lb'}
      </Typography>
    );
  } else if (alternateSides) {
    display = <PerSideAdornment />;
  } else {
    display = (
      <Typography className={activeSet ? classes.activeText : classes.idleText}>
        {'reps'}
      </Typography>
    );
  }

  return <InputAdornment position={'end'}>{display}</InputAdornment>;
}

export interface BaseSetAdornmentProps {
  alternateSides: boolean;
  activeSet: boolean;
  setType: 'weight' | 'reps';
}
