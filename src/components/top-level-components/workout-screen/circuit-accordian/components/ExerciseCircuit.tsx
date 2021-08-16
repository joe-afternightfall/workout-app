import Set from './sets/Set';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import {
  UpdateTimeSetFieldProps,
  UpdateWorkoutSetFieldProps,
  UpdateDistanceSetFieldProps,
} from '../../../../../creators/workout';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { CircuitExerciseSet } from '../../WorkoutScreen';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteExerciseDialog from '../dialogs/DeleteExerciseDialog';
import { Button, Divider, Grid, ListItem } from '@material-ui/core';
import ExerciseTitle from '../../../../shared/workout-related/ExerciseTitle';
import SetColumnHeaders from '../../../../shared/workout-related/SetColumnHeaders';
import { ExerciseTypeVO } from '../../../../../configs/models/workout-configurations/exercise-type/ExerciseTypeVO';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExerciseCircuit extends Component<ExerciseCircuitProps> {
  render(): JSX.Element {
    const { circuitId, exercise } = this.props;

    const addSets = () => {
      this.props.addSetToExerciseHandler(circuitId, exercise.id);
    };

    const deleteSet = (setId: string) => {
      this.props.deleteSetFromExerciseHandler(setId, circuitId, exercise.id);
    };

    return (
      <ListItem style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid container item xs={12} alignItems={'center'} spacing={2}>
            <Grid item>
              <ExerciseTitle title={exercise.name} />
            </Grid>

            <Grid item>
              <DeleteExerciseDialog
                exercise={exercise}
                circuitId={circuitId}
                deleteExerciseHandler={this.props.deleteExerciseHandler}
              />
            </Grid>
          </Grid>

          <SetColumnHeaders setType={exercise.setType} displayAction={true} />

          {this.props.sets.map((set: CircuitExerciseSet, index: number) => (
            // todo: handle re-numbering when deleting
            <Set
              key={index}
              set={set}
              deleteClickHandler={() => {
                deleteSet(set.id);
              }}
              circuitId={circuitId}
              exercise={exercise}
              exerciseId={exercise.id}
              toggleExerciseSetHandler={() => {
                this.props.toggleExerciseSetHandler(
                  set.id,
                  circuitId,
                  exercise.id
                );
              }}
              updateWorkoutSetFieldHandler={
                this.props.updateWorkoutSetFieldHandler
              }
              updateTimeSetFieldHandler={this.props.updateTimeSetFieldHandler}
              updateDistanceSetFieldHandler={
                this.props.updateDistanceSetFieldHandler
              }
            />
          ))}

          <Grid style={{ marginTop: 8 }} item xs={12} container spacing={2}>
            <Grid item>
              <Button
                onClick={addSets}
                variant={'contained'}
                startIcon={<AddIcon />}
              >
                {'Add Set'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Divider variant={'fullWidth'} />
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
}

export interface ExerciseCircuitProps extends WithStyles<typeof styles> {
  exercise: ExerciseTypeVO;
  circuitId: string;
  sets: CircuitExerciseSet[];
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
  addSetToExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteSetFromExerciseHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  toggleExerciseSetHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
  updateWorkoutSetFieldHandler: (props: UpdateWorkoutSetFieldProps) => void;
  updateTimeSetFieldHandler: (props: UpdateTimeSetFieldProps) => void;
  updateDistanceSetFieldHandler: (props: UpdateDistanceSetFieldProps) => void;
}

export default withStyles(styles, { withTheme: true })(ExerciseCircuit);