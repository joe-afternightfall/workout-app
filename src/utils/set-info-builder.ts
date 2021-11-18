import {
  ExerciseVO,
  BuiltSets,
  Segment,
  Set,
  WorkoutExercise,
  ActiveSetInfo,
  findExercise,
} from 'workout-app-common-core';
import { SetTextFieldInfoProps } from '../configs/types';

export const buildSetInfo = (
  segment: Segment,
  allExercises: ExerciseVO[]
): BuiltSets => {
  const builtSets: BuiltSets = {};

  segment.exercises.map((exercise: WorkoutExercise) => {
    exercise.sets.map((set: Set) => {
      const exerciseSet: ActiveSetInfo = {
        setNumber: set.setNumber,
        setId: set.id,
        segmentId: segment.id,
        exercise: findExercise(allExercises, exercise.exerciseId),
        exerciseOrder: exercise.order,
        weight: set.weight,
        reps: set.reps,
        duration: set.duration,
        distance: set.distance,
        markedDone: set.markedDone,
        timers: exercise.timers,
      };

      builtSets[set.setNumber]
        ? (builtSets[set.setNumber] = [
            ...builtSets[set.setNumber],
            exerciseSet,
          ])
        : (builtSets[set.setNumber] = [exerciseSet]);
    });
  });

  return builtSets;
};

export const buildSetTextFieldInfo = (
  setInfo: ActiveSetInfo,
  parameterTypeId: string,
  alternateSides: boolean,
  shouldDisplayTimer: boolean
): SetTextFieldInfoProps => {
  return {
    setId: setInfo.setId,
    reps: setInfo.reps,
    weight: setInfo.weight,
    duration: setInfo.duration,
    distance: setInfo.distance,
    parameterTypeId: parameterTypeId,
    alternateSides: alternateSides,
    timers: setInfo.timers,
    shouldDisplayTimer: shouldDisplayTimer,
  };
};
