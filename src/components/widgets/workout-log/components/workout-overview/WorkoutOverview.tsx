import React from 'react';
import { Workout } from 'workout-app-common-core';
import OverviewListItem from './components/OverviewListItem';
import { List } from '@material-ui/core';

export default function WorkoutOverview(
  props: WorkoutOverviewProps
): JSX.Element {
  const { workout } = props;
  return (
    <List>
      {workout &&
        workout.routine.phases.map((phase) => {
          return phase.segments.map((segment, index) => {
            return <OverviewListItem key={index} segment={segment} />;
          });
        })}
    </List>
  );
}

interface WorkoutOverviewProps {
  workout: Workout | undefined;
}
