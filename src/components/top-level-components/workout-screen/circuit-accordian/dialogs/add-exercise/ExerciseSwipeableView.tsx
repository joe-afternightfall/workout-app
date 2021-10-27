import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { State } from '../../../../../../configs/redux/store';
import TabPanel from '../../../../../shared/SwipeableViewTabPanel';
import { addExerciseToCircuit } from '../../../../../../creators/workout';
import { List, ListItem, Button, Typography, Grid } from '@material-ui/core';
import { useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { MuscleGroup, muscleGroups } from 'workout-app-common-core';
import { ExerciseTypeVO } from '../../../../../../configs/old-models/ExerciseTypeVO';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100%',
      borderRadius: 8,
      backgroundColor: '#F6F6F6',
    },
  })
);

const ExerciseSwipeableView = (
  props: ExerciseSwipeableViewProps & PassedInExerciseSwipeableViewProps
): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <SwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={props.selectedIndex}
      onChangeIndex={props.viewChangeHandler}
      className={classes.root}
    >
      {muscleGroups.map((muscle: MuscleGroup, index: number) => {
        const foundExercises = props.exerciseTypes.filter(
          (exercise: ExerciseTypeVO) =>
            exercise.muscleGroupIds.find(
              (exerciseMuscleId: string) => exerciseMuscleId === muscle.id
            )
        );

        return (
          <TabPanel key={index} value={props.selectedIndex} index={index}>
            {foundExercises.length === 0 ? (
              <Grid container justify={'center'}>
                <Grid item>
                  <Typography>
                    {'no exercises setup for this category'}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <List>
                {foundExercises.map(
                  (exercise: ExerciseTypeVO, exerciseIndex: number) => {
                    return (
                      <ListItem key={exerciseIndex}>
                        <Button
                          fullWidth
                          color={'primary'}
                          variant={'contained'}
                          onClick={() => {
                            props.addExerciseHandler(
                              props.workoutCircuitId,
                              exercise.id
                            );
                            props.closeClickHandler();
                          }}
                        >
                          {exercise.name}
                        </Button>
                      </ListItem>
                    );
                  }
                )}
              </List>
            )}
          </TabPanel>
        );
      })}
    </SwipeableViews>
  );
};

export interface ExerciseSwipeableViewProps {
  exerciseTypes: ExerciseTypeVO[];
  addExerciseHandler: (circuitId: string, exerciseId: string) => void;
}

export interface PassedInExerciseSwipeableViewProps {
  closeClickHandler: () => void;
  workoutCircuitId: string;
  selectedIndex: number;
  viewChangeHandler: (index: number) => void;
}

const mapStateToProps = (state: State): ExerciseSwipeableViewProps => {
  return {
    exerciseTypes: state.applicationState.workoutConfigurations.exerciseTypes,
  } as unknown as ExerciseSwipeableViewProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseSwipeableViewProps =>
  ({
    addExerciseHandler: (circuitId: string, exerciseId: string) => {
      dispatch(addExerciseToCircuit(circuitId, exerciseId));
    },
  } as unknown as ExerciseSwipeableViewProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExerciseSwipeableView);
