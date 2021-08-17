import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function buildComp(title: string, value: string) {
  return (
    <Grid container item xs={4}>
      <Grid item xs={12} container justify={'center'}>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container justify={'center'}>
        <Grid item>
          <Typography>{title}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function TimeField(props: TimeFieldProps): JSX.Element {
  return (
    <Grid container item xs={12}>
      {props.time.hours !== '' ? (
        buildComp('Hours', props.time.hours)
      ) : (
        <React.Fragment />
      )}

      {props.time.minutes !== '' ? (
        buildComp('Minutes', props.time.minutes)
      ) : (
        <React.Fragment />
      )}

      {props.time.seconds !== '' ? (
        buildComp('Seconds', props.time.seconds)
      ) : (
        <React.Fragment />
      )}
    </Grid>
  );
}

export interface TimeFieldProps {
  time: {
    hours: string;
    minutes: string;
    seconds: string;
  };
}
