import React from 'react';
import { Grid } from '@material-ui/core';
import { ExerciseVO } from 'workout-app-common-core';
import MusclesWorked from './components/MusclesWorked';
import ExercisePreview from './components/ExercisePreview';
import EquipmentRequired from './components/EquipmentRequired';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    itemWrapper: {
      marginBottom: 16,
    },
  })
);

export default function ExerciseInfo({
  exercise,
}: ExerciseInfoProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      {exercise && (
        <Grid container>
          <Grid item xs={12} className={classes.itemWrapper}>
            <ExercisePreview iconId={exercise.iconId} />
          </Grid>
          <Grid item xs={12} className={classes.itemWrapper}>
            <EquipmentRequired
              workoutEquipmentIds={
                exercise.workoutEquipmentIds ? exercise.workoutEquipmentIds : []
              }
            />
          </Grid>
          <Grid item xs={12} className={classes.itemWrapper}>
            <MusclesWorked
              iconId={exercise.iconId}
              musclesWorked={exercise.musclesWorked}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

interface ExerciseInfoProps {
  exercise: ExerciseVO | null;
}
