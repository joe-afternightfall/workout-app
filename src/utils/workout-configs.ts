import {
  Set,
  Segment,
  PhaseVO,
  ExerciseVO,
  WorkoutExercise,
  TrainingSetType,
} from 'workout-app-common-core';

export const getPhaseName = (allPhases: PhaseVO[], id: string): string => {
  const foundPhase = allPhases.find((phase: PhaseVO) => phase.id === id);

  return foundPhase ? foundPhase.name : '';
};

export const determineTrainingSetType = (
  allTypes: TrainingSetType[],
  id: string
): string => {
  const foundType = allTypes.find((type: TrainingSetType) => type.id === id);

  return foundType ? foundType.name : '';
};

export const sortSegmentExercises = (
  exercises: WorkoutExercise[]
): WorkoutExercise[] => {
  return exercises.sort(
    (a: WorkoutExercise, b: WorkoutExercise) => a.order - b.order
  );
};

export const sortPhaseSegments = (segments: Segment[]): Segment[] => {
  return segments.sort((a: Segment, b: Segment) => a.order - b.order);
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

export interface SetInfo {
  setNumber: number;
  weight: number;
  reps: number;
}

export const buildRepsAndSets = (sets: Set[]): string => {
  const setInfo: SetInfo[] = [];
  let builtInfo = '';

  sets.map((set: Set) => {
    setInfo.push({
      setNumber: set.setNumber,
      weight: set.weight,
      reps: set.reps,
    });
  });

  const sortedSets = setInfo.sort((a, b) => a.setNumber - b.setNumber);

  sortedSets.map((set: SetInfo) => {
    if (set.setNumber === 1) {
      if (set.weight === 0) {
        return (builtInfo = `${set.reps} reps`);
      } else {
        return (builtInfo = `${set.weight} x ${set.reps}`);
      }
    } else {
      if (set.weight === 0) {
        return (builtInfo += ` | ${set.reps} reps`);
      } else {
        return (builtInfo += ` | ${set.weight} x ${set.reps}`);
      }
    }
  });

  return builtInfo;
};
