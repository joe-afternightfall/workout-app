import {
  Set,
  Phase,
  Workout,
  Segment,
  WorkoutExercise,
  RoutineTemplateVO,
  WorkoutCategoryVO,
  WorkoutEquipmentVO,
  UserWeight,
  ExerciseVO,
  MuscleInfo,
} from 'workout-app-common-core';
import { chance } from 'jest-chance';

export const buildMultipleMockUserWeights = (n: number): UserWeight[] => {
  let i = 0;
  const mockUserWeights: UserWeight[] = [];
  while (n > i) {
    i++;
    mockUserWeights.push(buildMockUserWeight());
  }
  return mockUserWeights;
};

export const buildMockUserWeight = (): UserWeight => {
  return {
    id: chance.string(),
    weight: chance.integer({ min: 150, max: 250 }).toString(),
    lastUpdatedOn: chance.date().toLocaleDateString(),
  };
};

export const buildMultipleMockWorkouts = (n: number): Workout[] => {
  let i = 0;
  const mockWorkouts: Workout[] = [];
  while (n > i) {
    i++;
    mockWorkouts.push(
      buildMockWorkout(
        chance.integer({ min: 1, max: 5 }),
        chance.integer({ min: 3, max: 7 })
      )
    );
  }
  return mockWorkouts;
};

export const buildMockWorkout = (
  phases: number,
  segments: number,
  date?: string
): Workout => {
  return {
    id: chance.string(),
    date: date ? date : chance.date().toLocaleDateString(),
    startTime: chance.timestamp().toString(),
    endTime: chance.timestamp().toString(),
    routine: {
      id: chance.string(),
      name: chance.string(),
      workoutCategoryId: chance.string(),
      phases: buildMultipleMockPhases(phases, segments),
    },
  };
};

export const buildMockWorkoutEquipment = (
  amount: number
): WorkoutEquipmentVO[] => {
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

export const buildMockRoutineTemplateVO = (
  phases: number,
  segments: number
): RoutineTemplateVO => {
  return new RoutineTemplateVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    buildMultipleMockPhases(phases, segments),
    chance.bool()
  );
};

export const buildMockWorkoutCategoryVO = (): WorkoutCategoryVO => {
  return new WorkoutCategoryVO(
    chance.string(),
    chance.string(),
    chance.string(),
    chance.string(),
    [chance.string(), chance.string()],
    chance.bool()
  );
};

export const buildMultipleMockPhases = (
  n: number,
  segments: number
): Phase[] => {
  let i = 0;
  const phases: Phase[] = [];
  while (n > i) {
    i++;
    phases.push(buildMockPhase(segments));
  }
  return phases;
};

export const buildMockPhase = (segments: number): Phase => {
  return {
    id: chance.string(),
    phaseId: chance.string(),
    order: chance.integer({ min: 1, max: 5 }),
    segments: buildMultipleMockSegments(segments),
  };
};

export const buildMultipleMockSegments = (n: number): Segment[] => {
  let i = 0;
  const segments: Segment[] = [];
  while (n > i) {
    i++;
    segments.push(buildMockSegment(i));
  }
  return segments;
};

export const buildMockSegment = (order: number): Segment => {
  return {
    id: chance.string(),
    order: order,
    trainingSetTypeId: chance.string(),
    secondsRestBetweenSets: chance.integer({ min: 15, max: 120 }),
    secondsRestBetweenNextSegment: chance.integer({ min: 60, max: 240 }),
    exercises: buildMultipleMockWorkoutExercises(2),
  };
};

export const buildMultipleMockWorkoutExercises = (
  n: number
): WorkoutExercise[] => {
  let i = 0;
  const exercises: WorkoutExercise[] = [];
  while (n > i) {
    i++;
    exercises.push(buildMockWorkoutExercise());
  }
  return exercises;
};

export const buildMockWorkoutExercise = (): WorkoutExercise => {
  return {
    id: chance.string(),
    order: chance.integer({ min: 1, max: 5 }),
    exerciseId: chance.string(),
    sets: buildMultipleMockExerciseSets(4),
  };
};

export const buildMultipleMockExerciseSets = (n: number): Set[] => {
  let i = 0;
  const exerciseSets: Set[] = [];
  while (n > i) {
    i++;
    exerciseSets.push(buildMockExerciseSet());
  }
  return exerciseSets;
};

export const buildMockExerciseSet = (): Set => {
  return {
    id: chance.string(),
    setNumber: chance.integer({ min: 1, max: 5 }),
    weight: chance.integer({ min: 150, max: 250 }),
    reps: chance.integer({ min: 1, max: 5 }),
    distance: {
      unit: 'miles',
      value: chance.integer({ min: 150, max: 250 }),
    },
    duration: {
      seconds: chance.integer({ min: 150, max: 250 }),
    },
    markedDone: chance.bool(),
  };
};

export const buildMockExercise = (): ExerciseVO => {
  return {
    firebaseId: chance.string(),
    id: chance.string(),
    name: chance.string(),
    description: chance.string(),
    extraInfo: [
      {
        id: chance.string(),
        title: chance.string(),
        paragraph: chance.string(),
      },
    ],
    workoutEquipmentIds: [chance.string(), chance.string()],
    manikinMuscleGroupIds: [chance.string(), chance.string()],
    musclesWorked: {
      primary: [buildMuscleInfo()],
      secondary: [buildMuscleInfo()],
    },
    iconId: chance.string(),
    gripTypeId: chance.string(),
    gripWidthId: chance.string(),
    parameterTypeId: chance.string(),
    alternateSides: chance.bool(),
    active: chance.bool(),
  };
};

export const buildMuscleInfo = (): MuscleInfo => {
  return {
    id: chance.string(),
    order: chance.integer(),
    muscleId: chance.string(),
    muscleTargetTypeId: chance.string(),
  };
};
