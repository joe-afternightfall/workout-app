import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import OverviewCard from './OverviewCard';
import { ExerciseVO, getExerciseName, Segment } from 'workout-app-common-core';
import { Grid, ListItem, Typography } from '@material-ui/core';
import { State } from '../../../../../../configs/redux/store';

const OverviewListItem = (
  props: OverviewListItemProps & PassedInProps
): JSX.Element => {
  const { segment, exercises } = props;

  const firstExerciseName = getExerciseName(
    exercises,
    segment.exercises[0].exerciseId
  );

  return (
    <ListItem>
      <Grid container>
        <Grid item xs={12}>
          <Typography>{firstExerciseName}</Typography>
        </Grid>
        <Grid item xs={12} container>
          {segment.exercises[0].sets.map((set, index) => {
            const totalSets = segment.exercises[0].sets.length;

            return <OverviewCard key={index} set={set} totalSets={totalSets} />;
          })}
        </Grid>
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
