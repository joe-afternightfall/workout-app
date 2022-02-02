import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SetTextFieldTypes } from '../../../../configs/types';

export default function PerSideAdornment({
  fontColor,
  setType,
}: PerSideAdornmentProps): JSX.Element {
  return (
    <Grid
      container
      style={{ width: 40, color: fontColor }}
      data-testid={'per-side-adornment-component'}
    >
      <Grid item xs={12} container alignItems={'flex-end'}>
        <Typography variant={'caption'} data-testid={'per-side-set-type-title'}>
          {setType === 'duration' ? 'sec' : 'reps'}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        alignItems={'flex-start'}
        style={{ marginTop: -8 }}
      >
        <Typography
          variant={'caption'}
          style={{ fontSize: 18 }}
          data-testid={'per-side-divider'}
        >
          {'/'}
        </Typography>
        <Typography
          variant={'caption'}
          style={{ padding: '7px 0 0 2px' }}
          data-testid={'per-side-text'}
        >
          {'side'}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface PerSideAdornmentProps {
  fontColor: string;
  setType: SetTextFieldTypes;
}
