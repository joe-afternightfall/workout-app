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
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  order: number;
  exerciseId: string;
  sets: Set[];
}

export interface Set {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
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
  value: number;
}

export interface TrainingSetType {
  id: string;
  name: string; // ex(superset | straight set | circuit | pyramid | drop set | giant set (triples or quadruples))
  description: string;
  iconId: string;
}

export interface GripWidth {
  id: string;
  name: string;
  description: string;
  iconId: string;
}

export interface GripType {
  id: string;
  name: string;
  description: string;
  iconId: string;
}

export interface ParameterType {
  id: string;
  name: string;
  description: string;
}
