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

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExerciseCircuit extends Component<ExerciseCircuitProps> {
  state = {
    sets: [0],
  };

  render(): JSX.Element {
    const addSets = () => {
      let number = this.state.sets.length;
      this.setState({
        sets: [...this.state.sets, number++],
      });
    };

    const deleteSet = (setToDelete: number) => {
      const allSets = this.state.sets;
      const foundSet = allSets.find((set) => set === setToDelete);
      if (foundSet !== undefined) {
        const foundIndex = allSets.indexOf(foundSet);
        allSets.splice(foundIndex, 1);
        this.setState({
          sets: allSets,
        });
      }
    };

    return (
      <ListItem style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{this.props.exercise.name}</Typography>
          </Grid>

          <RowTitle />

          {this.state.sets.map((set) => (
            // todo: handle re-numbering when deleting
            <Set key={set} setNumber={set} deleteClickHandler={deleteSet} />
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
}

export default withStyles(styles, { withTheme: true })(ExerciseCircuit);
