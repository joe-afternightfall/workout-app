import React from 'react';
import { List } from '@material-ui/core';
import { Workout } from 'workout-app-common-core';
import SlantedOrangeDivider from '../SlantedOrangeDivider';
import OverviewListItem from './components/OverviewListItem';

export default function WorkoutOverview(
  props: WorkoutOverviewProps
): JSX.Element {
  const { workout } = props;
  return (
    <List>
      {workout &&
        workout.routine.phases.map((phase) => {
          return phase.segments.map((segment, index) => {
            const lastSegment = segment.order === phase.segments.length;
            return (
              <>
                <OverviewListItem key={index} segment={segment} />
                {!lastSegment && <SlantedOrangeDivider />}
              </>
            );
          });
        })}
    </List>
  );
}

interface WorkoutOverviewProps {
  workout: Workout | undefined;
}
