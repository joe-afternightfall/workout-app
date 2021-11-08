import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';

export default function ReturnToWorkoutLink(
  props: ReturnToWorkoutLinkProps
): JSX.Element {
  const { closeDialogHandler } = props;
  return (
    <Grid item xs={12}>
      <Typography>
        <Link color={'textPrimary'} onClick={closeDialogHandler}>
          {'Return to Workout'}
        </Link>
      </Typography>
    </Grid>
  );
}

interface ReturnToWorkoutLinkProps {
  closeDialogHandler: () => void;
}
