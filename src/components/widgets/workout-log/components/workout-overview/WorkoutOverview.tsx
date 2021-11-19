import React from 'react';
import { Workout } from 'workout-app-common-core';
import { List, ListItem } from '@material-ui/core';
import OverviewListItem from './components/OverviewListItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    dashed: {
      width: '100%',
      height: 4,
      opacity: 0.4,
      backgroundSize: '4px 4px',
      backgroundImage: `linear-gradient(-45deg, #ED440B 25%, transparent 25%, transparent 50%, #ED440B 50%, #ED440B 75%, transparent 0%)`,
    },
  })
);

export default function WorkoutOverview(
  props: WorkoutOverviewProps
): JSX.Element {
  const { workout } = props;
  const classes = useStyles();
  return (
    <List>
      {workout &&
        workout.routine.phases.map((phase) => {
          return phase.segments.map((segment, index) => {
            const lastSegment = segment.order === phase.segments.length;
            return (
              <>
                <OverviewListItem key={index} segment={segment} />
                {!lastSegment && (
                  <ListItem>
                    <div className={classes.dashed} />
                  </ListItem>
                )}
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
