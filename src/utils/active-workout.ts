import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';
import {
  BuiltSets,
  Phase,
  Segment,
  Set,
  WorkoutExercise,
} from '../configs/models/AppInterfaces';

// TODO: rename this file

export const sortWorkoutByOrder = (phases: Phase[]): Phase[] => {
  const phasesCopy: Phase[] = phases;
  phasesCopy
    .sort((a: Phase, b: Phase) => a.order - b.order)
    .map((phase: Phase) => {
      phase.segments
        .sort((c: Segment, d: Segment) => c.order - d.order)
        .map((segment: Segment) => {
          segment.exercises
            .sort((e: WorkoutExercise, f: WorkoutExercise) => e.order - f.order)
            .map((exercise: WorkoutExercise) => {
              exercise.sets.sort((g: Set, h: Set) => g.setNumber - h.setNumber);
            });
        });
    });

  return phasesCopy;
};

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
        exercise: getExercise(allExercises, exercise.exerciseId),
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

export const getExerciseName = (
  allExercises: ExerciseVO[],
  id: string
): string => {
  const foundExercise = allExercises.find(
    (exercise: ExerciseVO) => exercise.id === id
  );

  return foundExercise ? foundExercise.name : '';
};

export const getExercise = (
  allExercises: ExerciseVO[],
  id: string
): ExerciseVO | undefined => {
  return allExercises.find((exercise: ExerciseVO) => exercise.id === id);
};

export const isCircuitSet = (id: string): boolean => {
  return id === '5b3ba1b6-92a9-489b-a51a-2ac0afdb99ca';
};

export const isSuperset = (id: string): boolean => {
  return id === '3fd3c30c-6c6a-4cfd-8e59-5b500e486374';
};

export const isStraightSet = (id: string): boolean => {
  return id === '40ac0220-8032-4860-81dd-68943d786123';
};

export const isWeightsAndReps = (id: string): boolean => {
  return id === '769d3b23-31dd-4a16-b1d4-79e57ac305e9';
};

export const isRepsOnly = (id: string): boolean => {
  return id === '5046e288-3dd6-4da7-81e7-677798400b3b';
};

export const isDuration = (id: string): boolean => {
  return id === '2dfbe410-5d1c-4449-a3e9-b29f6ebec693';
};
