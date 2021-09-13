import React from 'react';
import { Grid, Slide } from '@material-ui/core';
import {
  Segment,
  BuiltSets,
  WorkoutExercise,
} from '../../../../configs/models/AppInterfaces';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/AppBar';
import ActiveSuperset from './2-active-set/ActiveSuperset';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import ActiveStraightSet from './2-active-set/ActiveStraightSet';
import { scroller, animateScroll as scroll } from 'react-scroll';
import { getExerciseName } from '../../../../utils/active-workout';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ExerciseVO } from '../../../../configs/models/configurations/ExerciseVO';

const useStyles = makeStyles(() =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
  })
);

export default function ActiveWorkout(props: ActiveWorkoutProps): JSX.Element {
  const classes = useStyles();
  const { superset, lastSegment, straightSet, currentSegment, builtSets } =
    props;

  const scrollToSection = (setNumber: number) => {
    scroller.scrollTo(`active-set-${setNumber}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  const didItClickHandler = (
    segmentId: string,
    setNumber: number,
    lastSet: boolean,
    lastSegment: boolean
  ) => {
    // todo: if last exercise/last segment/last phase call workout done
    if (lastSet || lastSegment) {
      scroll.scrollToTop();
    } else {
      scrollToSection(setNumber + 1);
    }
    props.crushedItClickHandler(segmentId, setNumber, lastSet, lastSegment);
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
                didItClickHandler={didItClickHandler}
              />
            )}
            {straightSet && (
              <ActiveStraightSet
                lastSegment={lastSegment}
                currentSetIndex={props.currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={didItClickHandler}
              />
            )}
          </Grid>

          {/*todo: add logic for displaying message when done with first phase and there is another phase after*/}
          {lastSegment ? (
            <React.Fragment />
          ) : (
            <Grid item xs={12} container alignItems={'flex-end'}>
              <UpNextCard bottomMargin={superset} />
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
