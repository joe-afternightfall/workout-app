import React from 'react';
import RestBetweenField from './RestBetweenField';
import { Grid, Typography } from '@material-ui/core';
import { Segment } from 'workout-app-common-core';

export default function RestBetweenOptions({
  segment,
}: RestBetweenOptionsProps): JSX.Element {
  return (
    <>
      <Grid container spacing={2} justify={'center'}>
        <RestBetweenField
          type={'set'}
          value={segment.secondsRestBetweenSets}
          segmentId={segment.id}
        />

        <RestBetweenField
          type={'segment'}
          value={segment.secondsRestBetweenNextSegment}
          segmentId={segment.id}
        />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between sets'}
          </Typography>
        </Grid>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between exercises'}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

interface RestBetweenOptionsProps {
  segment: Segment;
}
