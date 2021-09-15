import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../../../configs/redux/store';
import {
  AppBar,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ActiveExercise, {
  Title,
} from '../../../active-workout-screen/1-active-exercise/ActiveExercise';
import {
  getExerciseName,
  isSuperset,
} from '../../../../../../utils/active-workout';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { closeEditSet } from '../../../../../../creators/new-workout/workout-selections';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
    toolbar: {
      padding: '0 12px',
      height: '8vh',
    },
    gridWrapper: {
      height: '100%',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  })
);

const EditSet = (props: EditSetProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide mountOnEnter unmountOnExit in={props.display} direction={'left'}>
      <div>
        <AppBar position={'absolute'} color={'transparent'} elevation={0}>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              className={classes.gridWrapper}
              alignItems={'flex-end'}
            >
              <Grid item xs={2}>
                <IconButton
                  color={'primary'}
                  className={classes.menuButton}
                  onClick={props.closeClickHandler}
                >
                  <ArrowBackIcon fontSize={'small'} />
                </IconButton>
              </Grid>

              <Grid
                item
                xs={8}
                container
                justify={'center'}
                alignItems={'center'}
              >
                <Grid item>
                  <Typography variant={'overline'}>{'Edit'}</Typography>
                </Grid>
              </Grid>

              <Grid item xs={2} />
            </Grid>
          </Toolbar>
        </AppBar>

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            {props.display && (
              <ActiveExercise
                superset={props.superset}
                exerciseTitles={props.titles}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

export interface EditSetProps {
  superset: boolean;
  titles: Title[];
  display: boolean;
  segmentId: string;
  closeClickHandler: () => void;
}

const mapStateToProps = (state: State): EditSetProps => {
  const routineTemplate = state.workoutState.selectedRoutineTemplate;

  const foundSegment =
    routineTemplate &&
    routineTemplate.phases.map((phase) => {
      return phase.segments.find((segment) => {
        if (segment.id === state.workoutState.editSetSegmentId) {
          return segment;
        }
      });
    });

  const titles: Title[] = [];
  let superset = false;

  if (foundSegment) {
    foundSegment.map((segment) => {
      if (segment) {
        superset = isSuperset(segment.trainingSetTypeId);
        segment.exercises.map((exercise) => {
          const name = getExerciseName(
            state.workoutState.configs.exercises,
            exercise.exerciseId
          );
          titles.push({
            title: name,
          });
        });
      }
    });
  }

  return {
    segment: state.workoutState.selectedRoutineTemplate,
    titles: titles || [],
    superset: superset,
    display: state.workoutState.displayEditSet,
  } as unknown as EditSetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditSetProps =>
  ({
    closeClickHandler: () => {
      dispatch(closeEditSet());
    },
  } as unknown as EditSetProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditSet);
