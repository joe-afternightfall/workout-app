import React from 'react';
import { Button } from '@material-ui/core';

export default function CrushedItButton(
  props: CrushedItButtonProps
): JSX.Element {
  let color = '';

  if (props.activeSet || props.markedDone) {
    color = '#ED440B';
  } else {
    color = '#222323';
  }

  return (
    <Button
      style={{
        backgroundColor: color,
        opacity: props.markedDone ? 0.6 : 1,
        color: '#FFF',
        width: '100%',
        height: '100%',
        borderRadius: '0 8px 8px 0',
        padding: '6px 0',
      }}
      variant={'contained'}
      disabled={props.markedDone}
      onClick={props.crushedItClickHandler}
    >
      {'Crushed It'}
    </Button>
  );
}

export interface CrushedItButtonProps {
  activeSet: boolean;
  markedDone: boolean;
  crushedItClickHandler: () => void;
}
