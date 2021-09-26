import React from 'react';
import { Grid, Typography } from '@material-ui/core';

export default function PerSideAdornment({
  fontColor,
}: PerSideAdornmentProps): JSX.Element {
  return (
    <Grid container style={{ width: 40, color: fontColor }}>
      <Grid item xs={12} container alignItems={'flex-end'}>
        <Typography variant={'caption'}>{'reps'}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems={'flex-start'}
        style={{ marginTop: -8 }}
      >
        <Typography variant={'caption'} style={{ fontSize: 18 }}>
          {'/'}
        </Typography>
        <Typography variant={'caption'} style={{ padding: '7px 0 0 2px' }}>
          {'side'}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface PerSideAdornmentProps {
  fontColor: string;
}
