import {
  Set,
  Phase,
  Segment,
  WorkoutExercise,
  RoutineTemplateVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
} from 'workout-app-common-core';
import { chance } from 'jest-chance';

// export const buildUserProfile = (): UserProfileVO => {
//   return {
//     firebaseId: uuidv4(),
//     id: uuidv4(),
//     email: 'test-email@gmail.com',
//     profileIcon: uuidv4(),
//     displayName: 'test-display',
//     height:
//   };
// };

export const buildWorkoutEquipment = (amount: number): WorkoutEquipmentVO[] => {
  let i = 0;
  const equipmentList: WorkoutEquipmentVO[] = [];
  while (amount > i) {
    i++;
    equipmentList.push({
      firebaseId: chance.string(),
      id: chance.string(),
      name: chance.string(),
      description: chance.string(),
      iconId: chance.string(),
      active: chance.bool(),
    });
  }

  return equipmentList;
};

export const buildRoutineTemplateVO = (
  phases: number,
  segments: number
): RoutineTemplateVO => {
  return new RoutineTemplateVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    buildMultiplePhases(phases, segments),
    chance.bool()
  );
};

export const buildWorkoutCategoryVO = (): WorkoutCategoryVO => {
  return new WorkoutCategoryVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    [chance.string(), chance.string()],
    chance.bool()
  );
};

export const buildMultiplePhases = (n: number, segments: number): Phase[] => {
  let i = 0;
  const phases: Phase[] = [];
  while (n > i) {
    i++;
    phases.push(buildPhase(segments));
  }
  return phases;
};

export const buildPhase = (segments: number): Phase => {
  return {
    id: chance.string(),
    phaseId: chance.string(),
    order: chance.integer({ min: 1, max: 5 }),
    segments: buildMultipleSegments(segments),
  };
};

export const buildMultipleSegments = (n: number): Segment[] => {
  let i = 0;
  const segments: Segment[] = [];
  while (n > i) {
    i++;
    segments.push(buildSegment());
  }
  return segments;
};

export const buildSegment = (): Segment => {
  return {
    id: chance.string(),
    order: chance.d4(),
    trainingSetTypeId: chance.string(),
    secondsRestBetweenSets: chance.integer({ min: 15, max: 120 }),
    secondsRestBetweenNextSegment: chance.integer({ min: 60, max: 240 }),
    exercises: buildMultipleWorkoutExercises(2),
  };
};

export const buildMultipleWorkoutExercises = (n: number): WorkoutExercise[] => {
  let i = 0;
  const exercises: WorkoutExercise[] = [];
  while (n > i) {
    i++;
    exercises.push(buildWorkoutExercise());
  }
  return exercises;
};

export const buildWorkoutExercise = (): WorkoutExercise => {
  return {
    id: chance.string(),
    order: chance.integer({ min: 1, max: 5 }),
    exerciseId: chance.string(),
    sets: buildMultipleExerciseSets(4),
  };
};

export const buildMultipleExerciseSets = (n: number): Set[] => {
  let i = 0;
  const exerciseSets: Set[] = [];
  while (n > i) {
    i++;
    exerciseSets.push(buildExerciseSet());
  }
  return exerciseSets;
};

export const buildExerciseSet = (): Set => {
  return {
    id: chance.string(),
    setNumber: chance.integer({ min: 1, max: 5 }),
    weight: chance.integer({ min: 150, max: 250 }),
    reps: chance.integer({ min: 1, max: 5 }),
    markedDone: chance.bool(),
  };
};
