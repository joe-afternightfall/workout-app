import React from 'react';
import BaseSetField from '../components/BaseSetField';
import SetDivider from '../../SetDivider';
import { SetTextFieldInfoProps } from '../../../../../configs/types';

export default function WeightsAndRepsField(
  props: WeightsAndRepsFieldProps
): JSX.Element {
  const { baseProps } = props;

  return (
    <>
      <BaseSetField type={'weight'} baseProps={baseProps} fullLength={false} />
      <SetDivider
        activeSet={baseProps.activeSet}
        markedDone={baseProps.markedDone}
      />
      <BaseSetField type={'reps'} baseProps={baseProps} fullLength={false} />
    </>
  );
}

interface WeightsAndRepsFieldProps {
  baseProps: {
    info: SetTextFieldInfoProps;
    activeSet: boolean;
    markedDone: boolean;
  };
}
