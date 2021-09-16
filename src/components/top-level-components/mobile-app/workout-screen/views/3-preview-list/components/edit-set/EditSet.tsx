import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { State } from '../../../../../../../../configs/redux/store';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import ActiveExercise, {
  Title,
} from '../../../../../active-workout-screen/1-active-exercise/ActiveExercise';
import {
  getExercise,
  getExerciseName,
  isSuperset,
} from '../../../../../../../../utils/active-workout';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { closeEditSet } from '../../../../../../../../creators/new-workout/workout-selections';
import StraightSetRow from '../../../../../shared/set-fields/StraightSetRow';
import { Segment } from '../../../../../../../../configs/models/AppInterfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '5vh',
    },
    notchedOutline: {
      border: 0,
    },
    fieldWrapper: {
      borderColor: '#222323',
      backgroundColor: '#222323',
      borderRadius: 8,
    },
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

        <Grid container>
          <Grid item xs={12}>
            {props.display && (
              <ActiveExercise
                superset={props.superset}
                exerciseTitles={props.titles}
              />
            )}
          </Grid>

          <Grid item xs={12}>
            {props.superset ? (
              <React.Fragment />
            ) : (
              props.segment &&
              props.segment.exercises[0].sets.map((set, index) => {
                return (
                  <StraightSetRow
                    key={index}
                    setNumber={-1}
                    markedDone={false}
                    activeSet={false}
                    info={{
                      reps: set.reps,
                      weight: set.weight,
                      parameterTypeId: props.parameterTypeId,
                    }}
                    actionButton={
                      <Button
                        style={{
                          backgroundColor: '#222323',
                          color: '#ED440B',
                          width: '100%',
                          height: '100%',
                          borderRadius: '0 8px 8px 0',
                          padding: '6px 0',
                        }}
                        color={'primary'}
                        variant={'contained'}
                      >
                        <DeleteIcon fontSize={'large'} />
                      </Button>
                    }
                  />
                );
              })
            )}
          </Grid>

          <Grid item xs={12} container justify={'flex-end'}>
            <Grid
              item
              xs={4}
              style={{ height: '100%', paddingLeft: 4, marginBottom: 20 }}
            >
              <Button
                style={{
                  backgroundColor: '#222323',
                  color: '#ED440B',
                  width: '100%',
                  height: '11.5vh',
                  borderRadius: '8px',
                  padding: '6px 0',
                }}
                color={'primary'}
                variant={'contained'}
              >
                <AddIcon fontSize={'large'} />
              </Button>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} justify={'center'}>
              <Grid item xs={6}>
                <div className={classes.fieldWrapper}>
                  <TextField
                    variant={'outlined'}
                    value={'80'}
                    inputProps={{ style: { textAlign: 'center' } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={'start'}>
                          {'Sec'}
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.root,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.fieldWrapper}>
                  <TextField
                    variant={'outlined'}
                    value={'70'}
                    inputProps={{ style: { textAlign: 'center' } }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position={'start'}>
                          {'Sec'}
                        </InputAdornment>
                      ),
                      classes: {
                        root: classes.root,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} container>
            <Grid item xs={6} container justify={'center'}>
              <Typography color={'textSecondary'} variant={'caption'}>
                {'Rest between sets'}
              </Typography>
            </Grid>
            <Grid item xs={6} container justify={'center'}>
              <Typography color={'textSecondary'} variant={'caption'}>
                {'Rest between exercises'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
};

export interface EditSetProps {
  segment: Segment;
  superset: boolean;
  titles: Title[];
  display: boolean;
  segmentId: string;
  parameterTypeId: string;
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
  let parameterTypeId = '';

  if (foundSegment) {
    foundSegment.map((segment) => {
      if (segment) {
        superset = isSuperset(segment.trainingSetTypeId);
        segment.exercises.map((exercise) => {
          const foundExercise = getExercise(
            state.workoutState.configs.exercises,
            exercise.exerciseId
          );
          if (foundExercise) {
            titles.push({
              title: foundExercise.name,
            });
            parameterTypeId = foundExercise.parameterTypeId;
          }
        });
      }
    });
  }

  return {
    titles: titles || [],
    superset: superset,
    segment: foundSegment && foundSegment[0],
    display: state.workoutState.displayEditSet,
    parameterTypeId: parameterTypeId,
  } as unknown as EditSetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditSetProps =>
  ({
    closeClickHandler: () => {
      dispatch(closeEditSet());
    },
  } as unknown as EditSetProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditSet);