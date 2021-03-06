import React from 'react';
import { Grid, Slide } from '@material-ui/core';
import { Segment, BuiltSets } from 'workout-app-common-core';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/app-bar/ActiveWorkoutAppBar';
import ActiveSuperset from './2-active-set/ActiveSuperset';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import ActiveStraightSet from './2-active-set/ActiveStraightSet';
import { scroller, animateScroll as scroll } from 'react-scroll';

export default function ActiveWorkout({
  superset,
  lastSegment,
  straightSet,
  builtSets,
  currentSegment,
  currentSetIndex,
  lastExerciseOfWorkout,
  crushedItClickHandler,
}: ActiveWorkoutProps): JSX.Element {
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
    if (lastSet) {
      scroll.scrollToTop();
    } else {
      scrollToSection(setNumber + 1);
    }
    crushedItClickHandler(
      segmentId,
      setNumber,
      lastSet,
      lastSegment,
      lastExerciseOfWorkout
    );
  };

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <ActiveWorkoutAppBar />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            <ActiveExercise segment={currentSegment} />
          </Grid>

          <Grid item xs={12}>
            {superset && (
              <ActiveSuperset
                lastSegment={lastSegment}
                currentSetIndex={currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={didItClickHandler}
              />
            )}
            {straightSet && (
              <ActiveStraightSet
                lastSegment={lastSegment}
                currentSetIndex={currentSetIndex}
                builtSets={builtSets}
                didItClickHandler={didItClickHandler}
              />
            )}
          </Grid>

          <Grid item xs={12} container alignItems={'flex-end'}>
            <UpNextCard
              lastSegment={lastSegment}
              lastExerciseOfWorkout={lastExerciseOfWorkout}
            />
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
}

export interface ActiveWorkoutProps {
  currentSetIndex: number;
  superset: boolean;
  straightSet: boolean;
  lastSegment: boolean;
  lastExerciseOfWorkout: boolean;
  currentSegment: Segment;
  builtSets: BuiltSets;
  crushedItClickHandler: (
    segmentId: string,
    setNumber: number,
    lastSet: boolean,
    lastSegment: boolean,
    lastExerciseOfWorkout: boolean
  ) => void;
}
