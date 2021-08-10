import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SetType } from '../../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

export default function SetTitle(props: SetTitleProps): JSX.Element {
  switch (props.setType) {
    case SetType.TIME:
      return (
        <Grid item xs={12} container>
          <Grid item xs={2}>
            <Typography>{'Set'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>{'Time'}</Typography>
          </Grid>

          <Grid item xs={4} container justifyContent={'center'} spacing={2}>
            <Grid item>
              <Typography>{'Action'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    case SetType.WEIGHTS:
      return (
        <Grid item xs={12} container>
          <Grid item xs={2}>
            <Typography>{'Set'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'lbs'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Reps'}</Typography>
          </Grid>

          <Grid item xs={4} container justifyContent={'center'} spacing={2}>
            <Grid item>
              <Typography>{'Action'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    case SetType.REPS:
      return (
        <Grid item xs={12} container>
          <Grid item xs={2}>
            <Typography>{'Set'}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography>{'Reps'}</Typography>
          </Grid>

          <Grid item xs={4} container justifyContent={'center'} spacing={2}>
            <Grid item>
              <Typography>{'Action'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    case SetType.TIME_AND_DISTANCE:
      return (
        <Grid item xs={12} container>
          <Grid item xs={2}>
            <Typography>{'Set'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Time'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Distance'}</Typography>
          </Grid>

          <Grid item xs={4} container justifyContent={'center'} spacing={2}>
            <Grid item>
              <Typography>{'Action'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    case SetType.TIME_AND_REPS:
      return (
        <Grid item xs={12} container>
          <Grid item xs={2}>
            <Typography>{'Set'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Time'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Reps'}</Typography>
          </Grid>

          <Grid item xs={4} container justifyContent={'center'} spacing={2}>
            <Grid item>
              <Typography>{'Action'}</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
    default:
      return <div />;
  }
}

export interface SetTitleProps {
  setType: SetType;
}