import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    '@keyframes flicker': {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0.6,
      },
    },
    flicker: {
      animationName: '$flicker',
      animationDuration: '1000ms',
      animationIterationCount: 'infinite',
      animationDirection: 'alternate',
      animationTimingFunction: 'ease-in-out',
    },
    withAnimation: ({ disabled }: { disabled: boolean }) => ({
      animationPlayState: disabled ? 'paused' : 'running',
    }),
  })
);

export default function Blinker(props: BlinkerProps): JSX.Element {
  const { flicker, withAnimation } = useStyles({ disabled: props.disabled });

  return (
    <span className={`${flicker} ${withAnimation}`}>{props.component}</span>
  );
}

export interface BlinkerProps {
  disabled: boolean;
  component: JSX.Element;
}
