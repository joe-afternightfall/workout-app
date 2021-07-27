import React from 'react';
import Set from './Set';
import RowTitle from './RowTitle';
import { Draggable } from 'react-smooth-dnd';
import AddIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Divider, Grid, ListItem, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => createStyles({}));

export default function ExerciseSet(props: RepRowProps): JSX.Element {
  const classes = useStyles();
  const [sets, setSets] = React.useState<number[]>([0]);

  const addSets = () => {
    let number = sets.length;
    setSets((prev) => [...prev, number++]);
  };

  return (
    <Draggable>
      <ListItem style={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>{props.exerciseName}</Typography>
          </Grid>

          <RowTitle />

          {sets.map((set) => (
            <Set key={set} setNumber={set} />
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

export interface RepRowProps {
  exerciseName: string;
}
