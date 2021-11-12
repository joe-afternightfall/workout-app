export type PhaseTypeAddingSegment = 'editing' | 'activeWorkout' | '';

export type DeleteExerciseDrawerActionProps = {
  open: boolean;
  segmentId: string;
  phaseType: PhaseTypeAddingSegment;
};
