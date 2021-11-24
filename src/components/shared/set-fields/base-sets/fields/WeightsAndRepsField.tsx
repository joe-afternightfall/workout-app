import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import BaseSetField from '../components/BaseSetField';
import SetDivider from '../../SetDivider';
import { SetTextFieldInfoProps } from '../../../../../configs/types';

const useStyles = makeStyles(() => createStyles({}));

export default function WeightsAndRepsField(
  props: WeightsAndRepsFieldProps
): JSX.Element {
  const classes = useStyles();
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
