import React from 'react';
import BaseSetField from '../components/BaseSetField';
import { SetTextFieldInfoProps } from '../../../../../configs/types';

export default function RepsOnlyField(props: RepsOnlyFieldProps): JSX.Element {
  const { baseProps } = props;

  return <BaseSetField type={'reps'} baseProps={baseProps} fullLength={true} />;
}

interface RepsOnlyFieldProps {
  baseProps: {
    info: SetTextFieldInfoProps;
    activeSet: boolean;
    markedDone: boolean;
  };
}
