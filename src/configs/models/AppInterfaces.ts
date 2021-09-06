export interface Routine {
  id: string;
  name: string;
  workoutCategoryId: string;
  phases: Phase[];
}

export interface Phase {
  id: string;
  phaseId: string;
  order: number;
  segments: Segment[];
}

export interface Segment {
  id: string;
  order: number;
  trainingSetTypeId: string;
  exercises: WorkoutExercises[];
}

export interface WorkoutExercises {
  id: string;
  order: number;
  exerciseId: string;
  sets: Set[];
}

export interface Set {
  id: string;
  setNumber: number;
  weight: string;
  reps: string;
  duration: WorkoutDuration;
  distance: WorkoutDistance;
  markedDone: boolean;
}

export interface WorkoutDuration {
  currentTimeMs: number;
  currentTimeSec: number;
  currentTimeMin: number;
}

export interface WorkoutDistance {
  unit: string;
  value: string;
}
