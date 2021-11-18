import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Workout } from 'workout-app-common-core';
import { List, ListItem } from '@material-ui/core';
import LogListItem from './components/LogListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function LogList(props: LogListProps): JSX.Element {
  const classes = useStyles();
  const { workouts } = props;

  return (
    <List className={classes.root}>
      {workouts.map((workout, index) => (
        <LogListItem key={index} workout={workout} />
      ))}
    </List>
  );
}

interface LogListProps {
  workouts: Workout[];
}
