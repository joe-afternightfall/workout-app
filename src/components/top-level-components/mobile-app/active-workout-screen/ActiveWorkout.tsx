import React from 'react';
import { scroller } from 'react-scroll';
import { getExerciseName } from '../../../../utils/active-workout';
import { Grid, Slide } from '@material-ui/core';
import {
  WorkoutExercise,
  WorkoutDuration,
  WorkoutDistance,
  Segment,
} from '../../../../configs/models/AppInterfaces';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/AppBar';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveSuperset from './2-active-set/components/ActiveSuperset';
import ActiveStraightSet from './2-active-set/components/ActiveStraightSet';
import { ExerciseVO } from '../../../../configs/models/configurations/ExerciseVO';
import { BuiltSets } from './ActiveWorkoutConnector';

const useStyles = makeStyles(() =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
  })
);

export interface ActiveSetInfo {
  setNumber: number;
  setId: string;
  segmentId: string;
  exercise: ExerciseVO | undefined;
  exerciseOrder: number;
  weight: number;
  reps: number;
  duration: WorkoutDuration;
  distance: WorkoutDistance;
  markedDone: boolean;
}

export default function ActiveWorkout(props: ActiveWorkoutProps): JSX.Element {
  const classes = useStyles();
  const { superset, lastSegment, straightSet, currentSegment, builtSets } =
    props;

  const scrollToSection = () => {
    scroller.scrollTo('third-set-row', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const didItClickHandler = () => {
    // todo: scrollToSection
    // todo: if last segment reset all and increment to next phase
    // todo: if last exercise/last segment/last phase call workout done
  };

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <ActiveWorkoutAppBar />

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            <ActiveExercise
              superset={superset}
              exerciseTitles={
                currentSegment
                  ? currentSegment.exercises.map(
                      (exercise: WorkoutExercise) => {
                        return {
                          title: getExerciseName(
                            props.allExercises,
                            exercise.exerciseId
                          ),
                        };
                      }
                    )
                  : []
              }
            />
          </Grid>

          <Grid item xs={12}>
            {superset && (
              <ActiveSuperset
                lastSegment={lastSegment}
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={props.crushedItClickHandler}
              />
            )}
            {straightSet && (
              <ActiveStraightSet
                lastSegment={lastSegment}
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={props.crushedItClickHandler}
              />
            )}
          </Grid>

          {/*todo: add logic for displaying message when done with first phase and there is another phase after*/}
          {lastSegment ? (
            <React.Fragment />
          ) : (
            <Grid item xs={12} container alignItems={'flex-end'}>
              <UpNextCard />
            </Grid>
          )}
        </Grid>
      </div>
    </Slide>
  );
}

export interface ActiveWorkoutProps {
  allExercises: ExerciseVO[];
  currentSetIndex: number;
  superset: boolean;
  straightSet: boolean;
  lastSegment: boolean;
  currentSegment: Segment;
  builtSets: BuiltSets;
  crushedItClickHandler: (
    segmentId: string,
    setNumber: number,
    lastSet: boolean,
    lastSegment: boolean
  ) => void;
}
