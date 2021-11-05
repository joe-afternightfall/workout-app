import React from 'react';
import { Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../../configs/theme/app-theme';

export default function CrushedItButton(
  props: CrushedItButtonProps
): JSX.Element {
  const theme = useTheme<AppTheme>();
  let background = '';
  let textColor = '';

  if (props.activeSet || props.markedDone) {
    background = theme.palette.custom.colors.active;
    textColor = theme.palette.custom.colors.done;
  } else {
    background = theme.palette.custom.colors.componentBackground;
    textColor = theme.palette.custom.colors.idle;
  }

  return (
    <Button
      style={{
        backgroundColor: background,
        opacity: props.markedDone ? 0.6 : 1,
        color: textColor,
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

interface CrushedItButtonProps {
  activeSet: boolean;
  markedDone: boolean;
  crushedItClickHandler: () => void;
}
