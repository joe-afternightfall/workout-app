import React from 'react';
import { Workout } from 'workout-app-common-core';
import { List, Typography } from '@material-ui/core';
import { groupWorkoutsByMonth } from '../../../../utils/group-workouts';
import LogListItem from './log-list/components/LogListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

export default function AllPastWorkouts(
  props: AllPastWorkoutsProps
): JSX.Element {
  const { workouts, selectWorkoutHandler } = props;
  const groupedWorkouts = groupWorkoutsByMonth(workouts);

  return (
    <>
      {Object.keys(groupedWorkouts).map((year) => {
        return Object.keys(groupedWorkouts[year]).map((month, index) => {
          return (
            <List key={index} subheader={<li />}>
              <ListSubheader style={{ background: 'black' }}>
                <Typography variant={'overline'}>
                  {`${month} ${year}`}
                </Typography>
              </ListSubheader>
              {groupedWorkouts[year][month].map((workout, index) => {
                return (
                  <LogListItem
                    selectWorkoutHandler={selectWorkoutHandler}
                    key={index}
                    workout={workout}
                  />
                );
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
  selectWorkoutHandler: (workout: Workout) => void;
}
