import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { SetType } from '../../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

export default function SetTitle(props: SetTitleProps): JSX.Element {
  let displayComponent: JSX.Element;

  switch (props.setType) {
    case SetType.TIME:
      displayComponent = (
        <Grid item xs={6}>
          <Typography>{'Time'}</Typography>
        </Grid>
      );
      break;
    case SetType.WEIGHTS:
      displayComponent = (
        <>
          <Grid item xs={3}>
            <Typography>{'lbs'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Reps'}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.REPS:
      displayComponent = (
        <Grid item xs={6}>
          <Typography>{'Reps'}</Typography>
        </Grid>
      );
      break;
    case SetType.TIME_AND_DISTANCE:
      displayComponent = (
        <>
          <Grid item xs={3}>
            <Typography>{'Time'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Distance'}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.TIME_AND_REPS:
      displayComponent = (
        <>
          <Grid item xs={3}>
            <Typography>{'Time'}</Typography>
          </Grid>

          <Grid item xs={3}>
            <Typography>{'Reps'}</Typography>
          </Grid>
        </>
      );
      break;
    default:
      return <div />;
  }

  return (
    <Grid item xs={12} container>
      <Grid item xs={2}>
        <Typography>{'Set'}</Typography>
      </Grid>

      {displayComponent}

      <Grid item xs={4} container justify={'center'} spacing={2}>
        <Grid item>
          <Typography>{'Action'}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export interface SetTitleProps {
  setType: SetType;
}
