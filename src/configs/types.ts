import {
  WorkoutDistance,
  WorkoutDuration,
  WorkoutExercise,
  WorkoutTimer,
} from 'workout-app-common-core';

export type PhaseTypeEditingSegment = 'editing' | 'activeWorkout' | '';

export type SetTextFieldTypes = 'weight' | 'reps' | 'duration' | 'distance';

export type RestBetweenType = 'set' | 'segment';

export type DeleteExerciseDrawerActionProps = {
  open: boolean;
  segmentId: string;
  phaseType: PhaseTypeEditingSegment;
};

export type SetTextFieldInfoProps = {
  setId: string;
  reps: number;
  weight?: number;
  duration?: WorkoutDuration;
  distance?: WorkoutDistance;
  parameterTypeId: string;
  alternateSides: boolean;
  timers?: WorkoutTimer[];
  shouldDisplayTimer: boolean;
};

export type LatestExercise = {
  date: string;
  exercise: WorkoutExercise;
};
