import { ExerciseVO } from './configurations/ExerciseVO';

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
  secondsRestBetweenSets: number;
  secondsRestBetweenNextSegment: number;
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
  duration?: WorkoutDuration;
  distance?: WorkoutDistance;
  timer?: WorkoutTimer;
  markedDone: boolean;
}

export interface WorkoutTimer {
  id: string;
  order: number;
  stepperTitle: string;
  timerMessage: string;
  seconds: number;
}

export interface WorkoutDuration {
  seconds: number;
  minutes: number;
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

export interface BuiltSets {
  [key: number]: ActiveSetInfo[];
}

export interface ActiveSetInfo {
  setNumber: number;
  setId: string;
  segmentId: string;
  exercise: ExerciseVO | undefined;
  exerciseOrder: number;
  weight: number;
  reps: number;
  duration?: WorkoutDuration;
  distance?: WorkoutDistance;
  timer?: WorkoutTimer;
  markedDone: boolean;
}
