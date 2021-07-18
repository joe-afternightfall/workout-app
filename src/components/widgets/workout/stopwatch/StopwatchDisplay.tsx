import React from 'react';
import { Typography } from '@material-ui/core';

class StopwatchDisplay extends React.Component<StopwatchDisplayProps> {
  render(): JSX.Element {
    const { minutes, seconds } = this.props;

    const formatTime = (val: number, option?: string): string => {
      let value = val.toString();
      if (value.length < 2) {
        value = '0' + value;
      }
      if (option === 'ms' && value.length < 3) {
        value = '0' + value;
      }
      return value;
    };

    return (
      <div>
        <Typography variant={'h3'}>
          {`${formatTime(minutes)}:${formatTime(seconds)}`}
        </Typography>
      </div>
    );
  }
}

export interface StopwatchDisplayProps {
  // hour: string;
  minutes: number;
  seconds: number;
  // currentTimeMs: number;
}

export default StopwatchDisplay;
