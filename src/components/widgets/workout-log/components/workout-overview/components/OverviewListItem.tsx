import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, ListItem } from '@material-ui/core';
import OverviewExerciseItem from './OverviewExerciseItem';
import { State } from '../../../../../../configs/redux/store';
import OverviewSupersetDivider from './OverviewSupersetDivider';
import { ExerciseVO, isSuperset, Segment } from 'workout-app-common-core';

const OverviewListItem = (
  props: OverviewListItemProps & PassedInProps
): JSX.Element => {
  const { segment } = props;

  return (
    <ListItem>
      <Grid item xs={12} container>
        <OverviewExerciseItem exercise={segment.exercises[0]} />
        {isSuperset(segment.trainingSetTypeId) && (
          <>
            <OverviewSupersetDivider />

            <Grid item xs={12} container>
              <OverviewExerciseItem exercise={segment.exercises[1]} />
            </Grid>
          </>
        )}
      </Grid>
    </ListItem>
  );
};

interface OverviewListItemProps {
  exercises: ExerciseVO[];
}

interface PassedInProps {
  segment: Segment;
}

const mapStateToProps = (state: State): OverviewListItemProps => {
  return {
    exercises: state.applicationState.workoutConfigurations.exercises,
  } as unknown as OverviewListItemProps;
};

const mapDispatchToProps = (dispatch: Dispatch): OverviewListItemProps =>
  ({} as unknown as OverviewListItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(OverviewListItem);
