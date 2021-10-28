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

const PreviewDialog = (props: PreviewDialogProps): JSX.Element => {
  const classes = useStyles();
  const { currentSegment, doneSegments, nextSegments } = props;
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
        <AppBar
          position={'sticky'}
          style={{ width: '100%' }}
          className={classes.appBar}
          color={'inherit'}
        >
          <Toolbar>
            <Grid container alignItems={'center'}>
              <Grid item xs={2} />

              <Grid item xs={8} container justify={'center'}>
                <Typography variant={'body1'} noWrap>
                  {'Exercise List'}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Button>{'close'}</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <List className={clsx(classes.list, classes.fullList)}>
          {doneSegments.length > 0 && (
            <>
              <ListItem style={{ padding: 0 }}>
                <ListItemText
                  disableTypography
                  primary={
                    <Grid container justify={'center'}>
                      <Grid item>
                        <Typography>{'Done'}</Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
              {doneSegments.map((segment, index) => {
                return (
                  <>
                    <PreviewListItem key={index} segment={segment} />
                    {listDivider()}
                  </>
                );
              })}
            </>
          )}
          <ListItem style={{ padding: 0 }}>
            <ListItemText
              disableTypography
              primary={
                <Grid container justify={'center'}>
                  <Grid item>
                    <Typography>{'Current'}</Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>

          <PreviewListItem segment={currentSegment} />

          {listDivider()}
          <ListItem style={{ padding: 0 }}>
            <ListItemText
              disableTypography
              primary={
                <Grid container justify={'center'}>
                  <Grid item>
                    <Typography>{'Next'}</Typography>
                  </Grid>
                </Grid>
              }
            />
          </ListItem>
          {nextSegments.map((segment, index) => {
            return (
              <>
                <PreviewListItem key={index} segment={segment} />
                {listDivider()}
              </>
            );
          })}
        </List>
      </Drawer>
    </div>
  );
};

interface PreviewDialogProps {
  nextSegments: Segment[];
  doneSegments: Segment[];
  currentSegment: Segment;
}

const mapStateToProps = (state: State): PreviewDialogProps => {
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
  } as unknown as PreviewDialogProps;
};

const mapDispatchToProps = (): PreviewDialogProps =>
  ({} as unknown as PreviewDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(PreviewDialog);
