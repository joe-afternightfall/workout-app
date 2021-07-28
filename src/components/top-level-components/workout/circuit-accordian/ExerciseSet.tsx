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
import { Draggable } from 'react-smooth-dnd';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { Button, Divider, Grid, ListItem, Typography } from '@material-ui/core';

const styles: Styles<Theme, StyledComponentProps> = () => ({});

class ExerciseSet extends Component<ExerciseSetProps> {
  state = {
    sets: [0],
  };

  render(): JSX.Element {
    const { classes } = this.props;

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
      <Draggable>
        <ListItem style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography>{this.props.exerciseName}</Typography>
            </Grid>

            <RowTitle />

            {this.state.sets.map((set) => (
              // todo: handle renumbering when deleting
              <Set key={set} setNumber={set} deleteClickHandler={deleteSet} />
            ))}
            {/*<Grid item xs={2} container alignItems={'center'} justify={'center'}>*/}
            {/*  <Grid item xs={6}>*/}
            {/*    <ListItemIcon className={'drag-handle'}>*/}
            {/*      <IconButton>*/}
            {/*        <DragHandleIcon />*/}
            {/*      </IconButton>*/}
            {/*    </ListItemIcon>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            <Grid item xs={12} container spacing={2}>
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
      </Draggable>
    );
  }
}

export interface ExerciseSetProps extends WithStyles<typeof styles> {
  exerciseName: string;
}

export default withStyles(styles, { withTheme: true })(ExerciseSet);
