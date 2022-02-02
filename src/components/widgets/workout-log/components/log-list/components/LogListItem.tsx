import React from 'react';
import { connect } from 'react-redux';
import LogListCell from './LogListCell';
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import { State } from '../../../../../../configs/redux/store';
import SlantedOrangeDivider from '../../SlantedOrangeDivider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import { Divider, Grid, ListItem, Typography } from '@material-ui/core';
import { Workout, getWorkoutCategoryName } from 'workout-app-common-core';
import { getMinutesBetweenDates } from '../../../../../../utils/number-util';

const LogListItem = (props: LogListItemProps & PassedInProps): JSX.Element => {
  const { workout, categoryName, selectWorkoutHandler } = props;

  return (
    <>
      <ListItem
        button
        onClick={() => {
          selectWorkoutHandler(workout);
        }}
      >
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
              <Divider orientation={'horizontal'} variant={'fullWidth'} />
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
            <Grid item xs={12}>
              <Typography variant={'h6'}>{workout.routine.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={'overline'}>{categoryName}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
      <SlantedOrangeDivider />
    </>
  );
};

interface LogListItemProps {
  categoryName: string;
}

interface PassedInProps {
  workout: Workout;
  selectWorkoutHandler: (workout: Workout) => void;
}

const mapStateToProps = (
  state: State,
  ownProps: PassedInProps
): LogListItemProps => {
  const workoutCategories =
    state.applicationState.workoutConfigurations.workoutCategories;
  return {
    categoryName: getWorkoutCategoryName(
      workoutCategories,
      ownProps.workout.routine.workoutCategoryId
    ),
  } as unknown as LogListItemProps;
};

const mapDispatchToProps = (): LogListItemProps =>
  ({} as unknown as LogListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(LogListItem);
