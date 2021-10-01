import React from 'react';
import TimeField from './TimeField';
import DistanceField from './DistanceField';
import { Grid, Typography } from '@material-ui/core';
import { CircuitExerciseSet } from '../../../../workout-screen/WorkoutScreen';
import { SetType } from 'workout-app-common-core';

export default function Content(props: ContentProps): JSX.Element {
  const { set, setType } = props;

  let displayComp;

  switch (setType) {
    case SetType.TIME_AND_REPS:
      displayComp = (
        <>
          <Grid item xs={5}>
            <TimeField time={set.time} />
          </Grid>
          <Grid item xs={5}>
            <Typography>{set.reps}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.TIME:
      displayComp = (
        <Grid item xs={5}>
          <TimeField time={set.time} />
        </Grid>
      );
      break;
    case SetType.TIME_AND_DISTANCE:
      displayComp = (
        <>
          <Grid item xs={5}>
            <TimeField time={set.time} />
          </Grid>
          <Grid item xs={5}>
            <DistanceField distance={set.distance} />
          </Grid>
        </>
      );
      break;
    case SetType.WEIGHTS:
      displayComp = (
        <>
          <Grid item xs={5}>
            <Typography>{set.weight}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography>{set.reps}</Typography>
          </Grid>
        </>
      );
      break;
    case SetType.REPS:
      displayComp = (
        <Grid item xs={5}>
          <Typography>{set.reps}</Typography>
        </Grid>
      );
      break;
    default:
      displayComp = <React.Fragment />;
      break;
  }

  return displayComp;
}

export interface ContentProps {
  setType: SetType;
  set: CircuitExerciseSet;
}
