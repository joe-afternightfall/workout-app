export type PhaseTypeEditingSegment = 'editing' | 'activeWorkout' | '';

export type SetTextFieldTypes = 'weight' | 'reps' | 'duration' | 'distance';

export type RestBetweenType = 'set' | 'segment';

export type DeleteExerciseDrawerActionProps = {
  open: boolean;
  segmentId: string;
  phaseType: PhaseTypeEditingSegment;
};
