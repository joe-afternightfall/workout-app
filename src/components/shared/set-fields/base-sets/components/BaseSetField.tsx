import React from 'react';
import SetTextField from '../../SetTextField';
import {
  SetTextFieldInfoProps,
  SetTextFieldTypes,
} from '../../../../../configs/types';

export default function BaseSetField(props: BaseSetFieldProps): JSX.Element {
  const { type, fullLength } = props;
  const { info, activeSet, markedDone } = props.baseProps;

  let value = 0;
  switch (type) {
    case 'reps':
      value = info.reps ? info.reps : 0;
      break;
    case 'weight':
      value = info.weight ? info.weight : 0;
      break;
    case 'duration':
      value = info.duration ? info.duration.seconds : 0;
      break;
  }

  return (
    <SetTextField
      value={value}
      fullLength={fullLength}
      setType={type}
      setId={info.setId}
      alternateSides={info.alternateSides}
      activeSet={activeSet}
      markedDone={markedDone}
    />
  );
}

interface BaseSetFieldProps {
  type: SetTextFieldTypes;
  fullLength: boolean;
  baseProps: {
    info: SetTextFieldInfoProps;
    activeSet: boolean;
    markedDone: boolean;
  };
}
