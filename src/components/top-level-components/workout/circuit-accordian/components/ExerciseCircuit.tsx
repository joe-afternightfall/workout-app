import Set from './Set';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import RowTitle from './RowTitle';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Button, Divider, Grid, ListItem, Typography } from '@material-ui/core';
import { ExerciseVO } from '../../../../../configs/models/ExerciseVO';
import DeleteExerciseDialog from '../dialogs/DeleteExerciseDialog';
import { CircuitExerciseSet } from '../../WorkoutScreen';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  title: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    // fontSize: theme.typography.pxToRem(15),
  },
});

class ExerciseCircuit extends Component<ExerciseCircuitProps> {
  render(): JSX.Element {
    const { classes, circuitId, exercise } = this.props;

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
              <Typography className={classes.title} variant={'h6'}>
                {exercise.name}
              </Typography>
            </Grid>

            <Grid item>
              <DeleteExerciseDialog
                exercise={exercise}
                circuitId={circuitId}
                deleteExerciseHandler={this.props.deleteExerciseHandler}
              />
            </Grid>
          </Grid>

          <RowTitle />

          {this.props.sets.map((set: CircuitExerciseSet, index: number) => (
            // todo: handle re-numbering when deleting
            <Set
              key={index}
              setNumber={set.setNumber}
              deleteClickHandler={() => {
                deleteSet(set.id);
              }}
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
  exercise: ExerciseVO;
  circuitId: string;
  sets: CircuitExerciseSet[];
  deleteExerciseHandler: (circuitId: string, exerciseId: string) => void;
  addSetToExerciseHandler: (circuitId: string, exerciseId: string) => void;
  deleteSetFromExerciseHandler: (
    setId: string,
    circuitId: string,
    exerciseId: string
  ) => void;
}

export default withStyles(styles, { withTheme: true })(ExerciseCircuit);
