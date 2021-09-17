import React from 'react';
import { Button } from '@material-ui/core';

export default function ActionButton(props: ActionButtonProps): JSX.Element {
  const { icon, soloButton, disabled, clickHandler } = props;

  return (
    <Button
      style={{
        backgroundColor: '#222323',
        color: disabled ? '#4F5050' : '#ED440B',
        width: '100%',
        height: '100%',
        borderRadius: soloButton ? 8 : '0 8px 8px 0',
        padding: '6px 0',
        opacity: disabled ? 0.6 : 1,
      }}
      color={'primary'}
      variant={'contained'}
      disabled={disabled}
      onClick={clickHandler}
    >
      {icon}
    </Button>
  );
}

export interface ActionButtonProps {
  icon: JSX.Element;
  disabled: boolean;
  soloButton?: boolean;
  clickHandler: () => void;
}
