import {
  ExerciseVO,
  BuiltSets,
  Segment,
  Set,
  WorkoutExercise,
} from 'workout-app-common-core';
import { findExercise } from './object-finder';

// TODO: rename this file

export const buildSetInfo = (
  segment: Segment,
  allExercises: ExerciseVO[]
): BuiltSets => {
  const builtSets: BuiltSets = {};

  segment.exercises.map((exercise: WorkoutExercise) => {
    exercise.sets.map((set: Set) => {
      const exerciseSet = {
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
        timers: set.timers,
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
