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
  } else if (setType === 'sec') {
    display = <Typography style={{ color: fontColor }}>{'sec'}</Typography>;
  } else {
    display = <Typography style={{ color: fontColor }}>{'reps'}</Typography>;
  }

  return <InputAdornment position={'end'}>{display}</InputAdornment>;
}

interface BaseSetAdornmentProps {
  alternateSides: boolean;
  setType: 'weight' | 'reps' | 'sec';
  fontColor: string;
}
