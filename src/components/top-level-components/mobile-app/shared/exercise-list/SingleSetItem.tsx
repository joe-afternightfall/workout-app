import React from 'react';
import {
  ExerciseVO,
  WorkoutExercise,
  buildRepsAndSets,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import SetTitle from './SetTitle';
import { connect } from 'react-redux';
import ExerciseImage from './ExerciseImage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { State } from '../../../../../configs/redux/store';
import { getExercise } from '../../../../../utils/active-workout';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { openEditSet } from '../../../../../creators/new-workout/workout-selections';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    bottomRoot: {
      padding: 0,
      marginTop: -16,
    },
    itemIconWrapper: {
      width: '13vh',
      height: '13vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
  })
);

const SingleSetItem = (
  props: SingleSetItemProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const {
    upNextCard,
    bottomListItem,
    segmentId,
    workoutExercise,
    allExercises,
    displayUpNextTitle,
  } = props;

  const openEditSet = () => {
    if (segmentId) {
      props.editSetHandler(segmentId);
    }
  };
  const foundExercise =
    workoutExercise && getExercise(allExercises, workoutExercise.exerciseId);
  const repsAndSets = workoutExercise && buildRepsAndSets(workoutExercise.sets);
  const exerciseName = foundExercise && foundExercise.name;
  const exerciseIcon = foundExercise && foundExercise.iconId;

  const display = (
    <>
      <ListItemIcon className={classes.itemIconWrapper}>
        {exerciseIcon && (
          <ExerciseImage
            folder={exerciseIcon}
            image={`${exerciseIcon}-preview.jpg`}
          />
        )}
      </ListItemIcon>
      <ListItemText
        className={classes.textWrapper}
        disableTypography
        primary={
          <SetTitle
            displayUpNextTitle={displayUpNextTitle}
            upNextCard={upNextCard}
            exerciseName={exerciseName}
            bottomListItem={bottomListItem}
          />
        }
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={12}>
              <Typography variant={'body2'} color={'textSecondary'}>
                {repsAndSets}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </>
  );

  return props.displayEditOptions ? (
    <ListItem
      button
      className={props.bottomListItem ? classes.bottomRoot : classes.root}
      onClick={openEditSet}
    >
      {display}
    </ListItem>
  ) : (
    <ListItem
      className={props.bottomListItem ? classes.bottomRoot : classes.root}
    >
      {display}
    </ListItem>
  );
};

interface PassedInProps {
  displayUpNextTitle?: boolean;
  bottomListItem?: boolean;
  upNextCard?: boolean;
  segmentId?: string;
  workoutExercise?: WorkoutExercise;
}

interface SingleSetItemProps {
  allExercises: ExerciseVO[];
  displayEditOptions: boolean;
  editSetHandler: (segmentId: string) => void;
}

const mapStateToProps = (state: State): SingleSetItemProps => {
  return {
    displayEditOptions: state.workoutState.displayEditPreviewList,
    allExercises: state.workoutState.configs.exercises,
  } as unknown as SingleSetItemProps;
};

const mapDispatchToProps = (dispatch: Dispatch): SingleSetItemProps =>
  ({
    editSetHandler: (segmentId: string) => {
      dispatch(openEditSet(segmentId));
    },
  } as unknown as SingleSetItemProps);

export default connect(mapStateToProps, mapDispatchToProps)(SingleSetItem);
