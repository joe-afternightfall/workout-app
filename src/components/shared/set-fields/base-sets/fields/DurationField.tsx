import React from 'react';
import BaseSetField from '../components/BaseSetField';
import { SetTextFieldInfoProps } from '../../../../../configs/types';

export default function DurationField(props: DurationFieldProps): JSX.Element {
  const { baseProps } = props;

  return (
    <BaseSetField type={'duration'} baseProps={baseProps} fullLength={true} />
  );
}

interface DurationFieldProps {
  baseProps: {
    info: SetTextFieldInfoProps;
    activeSet: boolean;
    markedDone: boolean;
  };
}
