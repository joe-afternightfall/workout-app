import React from 'react';
import PerSideAdornment from './PerSideAdornment';
import { InputAdornment, Typography } from '@material-ui/core';

export default function BaseSetAdornment({
  setType,
  fontColor,
  alternateSides,
}: BaseSetAdornmentProps): JSX.Element {
  let display: JSX.Element;

  if (setType === 'weight') {
    display = <Typography style={{ color: fontColor }}>{'lb'}</Typography>;
  } else if (alternateSides) {
    display = <PerSideAdornment fontColor={fontColor} />;
  } else {
    display = <Typography style={{ color: fontColor }}>{'reps'}</Typography>;
  }

  return <InputAdornment position={'end'}>{display}</InputAdornment>;
}

export interface BaseSetAdornmentProps {
  alternateSides: boolean;
  setType: 'weight' | 'reps';
  fontColor: string;
}
