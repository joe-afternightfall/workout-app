import { UserWeight, Workout, WorkoutExercise } from 'workout-app-common-core';
import { LatestExercise } from '../configs/types';

export const findLatestWeight = (
  weights: UserWeight[]
): UserWeight | undefined => {
  if (weights.length > 0) {
    return weights.reduce(
      (accum: UserWeight, current: UserWeight, index: number) =>
        current.lastUpdatedOn > accum.lastUpdatedOn && index ? current : accum
    );
  }
  return undefined;
};

export const findLatestStatsForExercise = (
  currentExercise: WorkoutExercise,
  pastWorkouts: Workout[]
): LatestExercise | undefined => {
  const pastExercises: LatestExercise[] = [];

  pastWorkouts.map((workout) => {
    workout.routine.phases.map((phase) => {
      phase.segments.map((segment) => {
        segment.exercises.map((exercise) => {
          if (currentExercise.exerciseId === exercise.exerciseId) {
            pastExercises.push({
              date: workout.date,
              exercise: exercise,
            });
          }
        });
      });
    });
  });

  if (pastExercises.length > 0) {
    return pastExercises.reduce((accum, current, index) =>
      current.date > accum.date && index ? current : accum
    );
  }
};

// export const findHighestWeight = () => {}
