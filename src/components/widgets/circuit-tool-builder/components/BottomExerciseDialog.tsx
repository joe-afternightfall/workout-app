import React from 'react';
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../configs/redux/store';
import muscleGroups, {
  MuscleGroup,
} from '../../../../configs/models/workout-configurations/MuscleGroups';
import { ExerciseTypeVO } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';
import { SetType } from '../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeDAO';

const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
});

const BottomExerciseDialog = (
  props: BottomExerciseDialogProps
): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpen(open);
    };

  const groupIds = () => {
    return props.selectedMuscleGroupIds.map((id) => {
      const foundMuscle = muscleGroups.find(
        (group: MuscleGroup) => group.id === id
      );

      const exerciseTypeVOS = props.exerciseTypes.filter(
        (type: ExerciseTypeVO) => {
          if (foundMuscle) {
            return type.muscleGroupIds.find(
              (id: string) => id === foundMuscle.id
            );
          }
        }
      );

      if (foundMuscle) {
        return {
          muscleName: foundMuscle.name,
          bodySection: foundMuscle.bodySection,
          exercises: exerciseTypeVOS,
        };
      }
    });
  };

  return (
    <React.Fragment key={'bottom'}>
      <Button
        disabled={props.selectedMuscleGroupIds.length === 0}
        onClick={toggleDrawer(true)}
      >
        {'View Exercises'}
      </Button>
      <SwipeableDrawer
        anchor={'bottom'}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Grid container spacing={2} style={{ height: '50vh' }}>
          {groupIds().map((group, index: number) => {
            return (
              <Grid key={index} item xs={3}>
                <List
                  title={'List Title'}
                  subheader={
                    <Typography>{group && group.muscleName}</Typography>
                  }
                >
                  {group &&
                    group.exercises.map((exercise: ExerciseTypeVO) => {
                      return (
                        <ListItem button key={exercise.id}>
                          <ListItemText primary={exercise.name} />
                        </ListItem>
                      );
                    })}
                </List>
              </Grid>
            );
          })}
        </Grid>
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export interface BottomExerciseDialogProps {
  exerciseTypes: ExerciseTypeVO[];
  selectedMuscleGroupIds: string[];
}

const mapStateToProps = (state: State): BottomExerciseDialogProps => {
  const biceps = new ExerciseTypeVO(
    'firebase-1',
    'id-1',
    'Bicep Curl',
    ['1'],
    SetType.WEIGHTS
  );

  const skullCrushers = new ExerciseTypeVO(
    'firebase-2',
    'id-2',
    'Skull Crushers Curl',
    ['4'],
    SetType.WEIGHTS
  );

  const straightRaises = new ExerciseTypeVO(
    'firebase-3',
    'id-3',
    'Straight Raises',
    ['4'],
    SetType.WEIGHTS
  );

  const sideRaises = new ExerciseTypeVO(
    'firebase-4',
    'id-4',
    'Side Raises',
    ['2'],
    SetType.WEIGHTS
  );
  const curl = new ExerciseTypeVO(
    'firebase-5',
    'id-5',
    'Another Curl',
    ['1'],
    SetType.WEIGHTS
  );

  return {
    selectedMuscleGroupIds: state.applicationState.selectedMuscleGroupIds,
    exerciseTypes: [biceps, skullCrushers, straightRaises, sideRaises, curl],
  } as unknown as BottomExerciseDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): BottomExerciseDialogProps =>
  ({} as unknown as BottomExerciseDialogProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomExerciseDialog);
