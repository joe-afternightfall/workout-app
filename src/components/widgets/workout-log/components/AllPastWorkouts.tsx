import React from 'react';
import { Workout } from 'workout-app-common-core';
import { List, ListItem, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { groupWorkoutsByMonth } from '../../../../utils/group-workouts';
import LogListItem from './log-list/components/LogListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export default function AllPastWorkouts(
  props: AllPastWorkoutsProps
): JSX.Element {
  const classes = useStyles();
  const { workouts, goBackHandler } = props;
  const groupedWorkouts = groupWorkoutsByMonth(workouts);

  return (
    <>
      {Object.keys(groupedWorkouts).map((year, index) => {
        return Object.keys(groupedWorkouts[year]).map((month, index) => {
          return (
            <List key={index} subheader={<Typography>{month}</Typography>}>
              {groupedWorkouts[year][month].map((workout, index) => {
                return <LogListItem key={index} workout={workout} />;
              })}
            </List>
          );
        });
      })}
    </>
  );
}

interface AllPastWorkoutsProps {
  workouts: Workout[];
  goBackHandler: () => void;
}
