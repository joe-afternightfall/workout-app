import React from 'react';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../../../../../configs/theme/app-theme';

export default function ActionButton(props: ActionButtonProps): JSX.Element {
  const { icon, soloButton, disabled, clickHandler } = props;
  const theme = useTheme<AppTheme>();

  return (
    <Button
      style={{
        backgroundColor: theme.palette.custom.colors.componentBackground,
        color: disabled
          ? theme.palette.custom.colors.disabled
          : theme.palette.custom.colors.active,
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
