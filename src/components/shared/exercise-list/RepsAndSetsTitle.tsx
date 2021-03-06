import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { buildRepsAndSets, Set } from 'workout-app-common-core';

export default function RepsAndSetsTitle(
  props: RepsAndSetsTitleProps
): JSX.Element {
  const { sets } = props;

  const repsAndSets = buildRepsAndSets(sets);

  return (
    <Grid item xs={12} container alignItems={'center'}>
      <Grid item xs={12}>
        <Typography
          variant={'body2'}
          color={'textSecondary'}
          data-testid={'reps-and-sets-title'}
        >
          {repsAndSets}
        </Typography>
      </Grid>
    </Grid>
  );
}

interface RepsAndSetsTitleProps {
  sets: Set[];
}
