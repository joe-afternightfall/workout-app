import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import dumbBellIcon from '../../../../configs/icons/equipment/dumbbell.svg';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

export default function WorkoutListItem(
  props: WorkoutListItemProps
): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemIcon
        style={{ backgroundColor: 'gray', height: 56, marginRight: 8 }}
      />
      <ListItemText
        primary={props.exerciseTitle}
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={12}>
              {dumbBellIcon}
            </Grid>
            <Grid item xs={12}>
              {props.repsAndSets}
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

export interface WorkoutListItemProps {
  exerciseTitle: string;
  // icon?:
  repsAndSets: string;
  equipmentSvg: JSX.Element;
}
