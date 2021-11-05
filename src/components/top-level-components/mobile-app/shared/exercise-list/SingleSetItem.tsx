import clsx from 'clsx';
import React from 'react';
import {
  ExerciseVO,
  WorkoutExercise,
  buildRepsAndSets,
} from 'workout-app-common-core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ExerciseImage from './ExerciseImage';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { State } from '../../../../../configs/redux/store';
import { AppTheme } from '../../../../../configs/theme/app-theme';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { openEditSet } from '../../../../../creators/new-workout/workout-selections';
import { getExercise } from '../../../../../utils/active-workout';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      padding: 0,
    },
    bottomRoot: {
      padding: 0,
      marginTop: -16,
    },
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    itemIconWrapper: {
      width: '13vh',
      height: '13vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
    upNextHighlight: {
      color: theme.palette.custom.colors.active,
    },
  })
);

const SingleSetItem = (
  props: SingleSetItemProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const openEditSet = () => {
    if (props.segmentId) {
      props.editSetHandler(props.segmentId);
    }
  };
  const foundExercise =
    props.workoutExercise &&
    getExercise(props.allExercises, props.workoutExercise.exerciseId);
  const repsAndSets =
    props.workoutExercise && buildRepsAndSets(props.workoutExercise.sets);
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
          props.displayUpNextTitle ? (
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextHighlight}
                >
                  {'Up Next'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextTitle}
                >
                  {exerciseName}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={
                props.bottomListItem && props.upNextCard
                  ? classes.upNextTitle
                  : classes.title
              }
            >
              {exerciseName}
            </Typography>
          )
        }
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={12}>
              <Typography
                variant={'body2'}
                color={'textSecondary'}
                className={clsx({
                  [classes.secondaryTitle]: !props.workoutExercise,
                })}
              >
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

// todo: if displayEditOptions = true then preview
// todo: if displayUpNextTitle = true then preview
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
