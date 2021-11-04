import React from 'react';
import {
  Chip,
  Grid,
  Card,
  CardMedia,
  Typography,
  CardContent,
} from '@material-ui/core';
import {
  MuscleVO,
  ExerciseVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../configs/redux/store';

const useStyles = makeStyles(() =>
  createStyles({
    exerciseImage: {
      width: '100%',
    },
    musclesWorkedImage: {
      width: '75%',
      margin: 'auto',
    },
    gridItem: {
      padding: 8,
    },
    root: {
      // display: 'flex',
      // justifyContent: 'center',
      // flexWrap: 'wrap',
      listStyle: 'none',
      // padding: 4,
      // margin: 0,
    },
    chip: {
      // margin: 4,
    },
  })
);

const ExerciseInfo = ({
  exercise,
  muscles,
  workoutEquipmentList,
}: ExerciseInfoProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  console.log('muscles: ' + JSON.stringify(muscles));
  return (
    <Grid container item xs={12} justify={'center'}>
      {exercise && (
        <>
          <Grid item xs={12} style={{ marginBottom: 16 }}>
            <Card>
              <CardMedia>
                <img
                  alt={exercise.iconId}
                  className={classes.exerciseImage}
                  src={`images/exercises/${exercise.iconId}/${exercise.iconId}-exercise.gif`}
                />
              </CardMedia>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant={'h6'}>{'Muscles Worked'}</Typography>
              </CardContent>
              <CardMedia style={{ textAlign: 'center' }}>
                <img
                  src={`images/exercises/${exercise.iconId}/${exercise.iconId}-muscles-worked.png`}
                  alt={'barbell'}
                  className={classes.musclesWorkedImage}
                />
              </CardMedia>
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Typography variant={'body1'}>{'Primary'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {exercise.musclesWorked.primary.map((primary, index) => {
                        const foundMuscle = muscles.find(
                          (muscle) => muscle.id === primary.muscleId
                        );
                        return (
                          foundMuscle && (
                            <Chip
                              key={index}
                              label={foundMuscle.name}
                              className={classes.chip}
                            />
                          )
                        );
                      })}
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
                    <Grid item xs={12}>
                      <Typography variant={'body1'}>{'Secondary'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      {exercise.musclesWorked.secondary.map(
                        (primary, index) => {
                          const foundMuscle = muscles.find(
                            (muscle) => muscle.id === primary.muscleId
                          );
                          return (
                            foundMuscle && (
                              <Chip
                                key={index}
                                label={foundMuscle.name}
                                className={classes.chip}
                              />
                            )
                          );
                        }
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} style={{ marginTop: 16 }}>
            <Card>
              <CardContent>
                <Grid container item xs={12}>
                  <Grid item xs={12}>
                    <Typography variant={'h6'}>
                      {'Equipment Required'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    {exercise.workoutEquipmentIds.map((equipmentId, index) => {
                      const foundEquipment = workoutEquipmentList.find(
                        (piece) => piece.id === equipmentId
                      );
                      return (
                        <Grid item xs={12} key={index}>
                          <Typography variant={'body1'}>
                            {foundEquipment && foundEquipment.name}
                          </Typography>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </>
      )}
    </Grid>
  );
};

interface PassedInProps {
  exercise: ExerciseVO | null;
}

interface ExerciseInfoProps {
  muscles: MuscleVO[];
  workoutEquipmentList: WorkoutEquipmentVO[];
}

const mapStateToProps = (state: State): ExerciseInfoProps => {
  return {
    muscles: state.workoutState.configs.muscles,
    workoutEquipmentList: state.workoutState.configs.workoutEquipment,
  } as unknown as ExerciseInfoProps;
};

export default connect(mapStateToProps)(ExerciseInfo);
