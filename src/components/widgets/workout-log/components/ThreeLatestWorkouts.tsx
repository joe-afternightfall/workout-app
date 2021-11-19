import React from 'react';
import { List } from '@material-ui/core';
import { Workout } from 'workout-app-common-core';
import LogListItem from './log-list/components/LogListItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function ThreeLatestWorkouts(
  props: ThreeLatestWorkoutsProps
): JSX.Element {
  const classes = useStyles();
  const { workouts, selectWorkoutHandler } = props;

  return (
    <List className={classes.root}>
      {workouts.map((workout, index) => (
        <LogListItem
          key={index}
          workout={workout}
          selectWorkoutHandler={selectWorkoutHandler}
        />
      ))}
    </List>
  );
}

interface ThreeLatestWorkoutsProps {
  workouts: Workout[];
  selectWorkoutHandler: (workout: Workout) => void;
}
