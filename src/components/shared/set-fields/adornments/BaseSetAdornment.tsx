import React from 'react';
import PerSideAdornment from './PerSideAdornment';
import { InputAdornment, Typography } from '@material-ui/core';
import { SetTextFieldTypes } from '../../../../configs/types';

export default function BaseSetAdornment({
  setType,
  fontColor,
  alternateSides,
}: BaseSetAdornmentProps): JSX.Element {
  let display: JSX.Element;

  // todo: come back and handle distance
  // todo: make this switch statement handing back title
  if (setType === 'weight') {
    display = <Typography style={{ color: fontColor }}>{'lb'}</Typography>;
  } else if (alternateSides) {
    display = <PerSideAdornment setType={setType} fontColor={fontColor} />;
  } else if (setType === 'duration') {
    display = <Typography style={{ color: fontColor }}>{'sec'}</Typography>;
  } else {
    display = <Typography style={{ color: fontColor }}>{'reps'}</Typography>;
  }

  return <InputAdornment position={'end'}>{display}</InputAdornment>;
}

interface BaseSetAdornmentProps {
  alternateSides: boolean;
  setType: SetTextFieldTypes;
  fontColor: string;
}
