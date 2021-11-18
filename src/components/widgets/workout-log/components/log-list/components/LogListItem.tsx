import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import { Divider, Grid, ListItem, Typography } from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WorkoutListDivider from '../../../../../shared/exercise-list/WorkoutListDivider';
import { Workout } from 'workout-app-common-core';
import LogListCell from './LogListCell';
import { getMinutesBetweenDates } from '../../../../../../utils/number-util';

const useStyles = makeStyles(() => createStyles({}));

export default function LogListItem(props: LogListItemProps): JSX.Element {
  const classes = useStyles();
  const { workout } = props;
  return (
    <>
      <ListItem disableGutters>
        <Grid item xs={12} container>
          <Grid item xs={12} container alignItems={'center'}>
            <LogListCell
              justify={'flex-start'}
              title={workout.date}
              icon={<EventIcon color={'primary'} />}
            />

            <LogListCell
              justify={'center'}
              title={`${getMinutesBetweenDates(
                workout.startTime,
                workout.endTime
              )} min`}
              icon={<TimerIcon color={'primary'} />}
            />

            <LogListCell
              justify={'center'}
              title={'-1 lbs'}
              icon={
                <FitnessCenterIcon
                  color={'primary'}
                  style={{ transform: 'rotate(135deg)' }}
                />
              }
            />
          </Grid>
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={11}>
              <Divider
                orientation={'horizontal'}
                variant={'fullWidth'}
                // className={classes.divider}
              />
            </Grid>
            <Grid
              item
              xs={1}
              container
              alignItems={'center'}
              justify={'flex-end'}
            >
              <ChevronRightIcon />
            </Grid>
          </Grid>
          <Grid item xs={12} container alignItems={'flex-start'}>
            {workout.routine.name}
          </Grid>
        </Grid>
      </ListItem>
      <WorkoutListDivider />
    </>
  );
}

interface LogListItemProps {
  workout: Workout;
}
