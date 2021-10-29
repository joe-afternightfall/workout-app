import clsx from 'clsx';
import {
  Grid,
  List,
  AppBar,
  Button,
  Drawer,
  Toolbar,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
} from '@material-ui/core';
import { connect } from 'react-redux';
import React, { useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import { Segment } from 'workout-app-common-core';
import { State } from '../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { AppTheme } from '../../../../../../configs/theme/app-theme';
import PreviewListItem from '../../../workout-screen/views/3-preview-list/PreviewListItem';
import CategoryHeader from './exercise-list-drawer/CategoryHeader';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import { Dispatch } from 'redux';
import { openEditSet } from '../../../../../../creators/new-workout/workout-selections';
import EditSet from '../../../workout-screen/views/3-preview-list/components/edit-set/EditSet';
import ExerciseListAppBar from './exercise-list-drawer/ExerciseListAppBar';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    list: {
      width: 250,
      height: '75vh',
    },
    fullList: {
      width: 'auto',
    },
    menuButton: {
      color: theme.palette.custom.colors.active,
    },
    subHeader: {
      zIndex: 2,
      textAlign: 'center',
    },
    stripe: {
      color: 'white',
      background:
        'repeating-linear-gradient(-55deg, #222, #222 10px, #333 10px, #333 20px)',
    },
    appBar: {
      width: '100%',
    },
  })
);

const listDivider = () => {
  return (
    <ListItem
      style={{
        height: '2vh',
        padding: 0,
        color: 'white',
        background:
          'repeating-linear-gradient(-55deg, #222, #222 5px, #333 5px, #333 10px)',
      }}
    />
  );
};

const ExerciseListDrawer = (props: ExerciseListDrawerProps): JSX.Element => {
  const classes = useStyles();
  const { currentSegment, doneSegments, displayEditSet, nextSegments } = props;
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton
        color={'inherit'}
        onClick={openDialog}
        className={classes.menuButton}
      >
        <ListIcon />
      </IconButton>
      <Drawer open={open} anchor={'bottom'} onClose={closeDialog}>
        {displayEditSet && <EditSet />}
        <div>
          <ExerciseListAppBar closeClickHandler={closeDialog} />
          <List className={clsx(classes.list, classes.fullList)}>
            {doneSegments.length > 0 && (
              <>
                <CategoryHeader title={'Done'} />
                {doneSegments.map((segment, index) => {
                  const displayDivider = doneSegments.length !== index + 1;
                  return (
                    <>
                      <PreviewListItem key={index} segment={segment} />
                      {displayDivider && listDivider()}
                    </>
                  );
                })}
              </>
            )}
            <CategoryHeader title={'Current'} />

            <PreviewListItem segment={currentSegment} />

            <CategoryHeader title={'Next'} />

            {nextSegments.map((segment, index) => {
              const displayDivider = nextSegments.length !== index + 1;
              return (
                <>
                  <Grid container>
                    <Grid item xs={10}>
                      <PreviewListItem key={index} segment={segment} />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      container
                      alignItems={'center'}
                      justify={'center'}
                      onClick={() => props.openEditSetHandler(segment.id)}
                    >
                      <ArrowForwardIcon />
                    </Grid>
                  </Grid>
                  {displayDivider && listDivider()}
                </>
              );
            })}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

interface ExerciseListDrawerProps {
  displayEditSet: boolean;
  nextSegments: Segment[];
  doneSegments: Segment[];
  currentSegment: Segment;
  openEditSetHandler: (segmentId: string) => void;
}

const mapStateToProps = (state: State): ExerciseListDrawerProps => {
  const doneSegments: Segment[] = [];

  state.workoutState.activeWorkout.routine.phases.map((phase) => {
    phase.segments.map((segment) => {
      let numberOfExercisesDone = 0;
      segment.exercises.map((exercise) => {
        const numberOfSets = exercise.sets.length;
        let markedDoneSets = 0;
        exercise.sets.map((set) => {
          if (set.markedDone) {
            markedDoneSets++;
          }
        });
        if (numberOfSets === markedDoneSets) {
          numberOfExercisesDone++;
        }
      });
      if (numberOfExercisesDone === segment.exercises.length) {
        doneSegments.push(segment);
      }
    });
  });

  const currentPhase = state.workoutState.currentPhase;
  const currentSegment = currentPhase.segments.find(
    (segment: Segment) =>
      segment.order === state.workoutState.currentSegmentIndex
  );

  const nextSegments: Segment[] = [];

  state.workoutState.activeWorkout.routine.phases.map((phase) => {
    phase.segments.map((segment) => {
      const foundIndex = doneSegments.indexOf(segment);
      if (foundIndex === -1 && segment !== currentSegment) {
        nextSegments.push(segment);
      }
    });
  });

  return {
    doneSegments: doneSegments,
    currentSegment: currentSegment,
    nextSegments: nextSegments,
    displayEditSet: state.workoutState.displayEditSet,
  } as unknown as ExerciseListDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ExerciseListDrawerProps =>
  ({
    openEditSetHandler: (segmentId: string) => {
      dispatch(openEditSet(segmentId));
    },
  } as unknown as ExerciseListDrawerProps);

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListDrawer);
