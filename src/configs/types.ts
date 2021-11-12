export type PhaseTypeEditingSegment = 'editing' | 'activeWorkout' | '';

export type DeleteExerciseDrawerActionProps = {
  open: boolean;
  segmentId: string;
  phaseType: PhaseTypeEditingSegment;
};
