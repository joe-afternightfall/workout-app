import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';

export const getExerciseName = (
  allExercises: ExerciseVO[],
  id: string
): string => {
  const foundExercise = allExercises.find(
    (exercise: ExerciseVO) => exercise.id === id
  );

  return foundExercise ? foundExercise.name : '';
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
