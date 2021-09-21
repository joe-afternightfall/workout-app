import { WorkoutActionTypes } from '../actions-workout';

export interface UpdateSetTextFieldAction {
  type: WorkoutActionTypes.UPDATE_SET_TEXT_FIELD;
  setId: string;
  name: 'weight' | 'reps';
  value: number;
}

export const updateSetTextField = (
  setId: string,
  name: 'weight' | 'reps',
  value: number
): UpdateSetTextFieldAction => {
  return {
    type: WorkoutActionTypes.UPDATE_SET_TEXT_FIELD,
    setId: setId,
    name: name,
    value: value,
  };
};

export interface UpdateSegmentOrderAction {
  type: WorkoutActionTypes.UPDATE_SEGMENT_ORDER;
  phaseId: string;
  fromIndex: number;
  toIndex: number;
}

export const updateSegmentOrder = (
  phaseId: string,
  fromIndex: number,
  toIndex: number
): UpdateSegmentOrderAction => {
  return {
    type: WorkoutActionTypes.UPDATE_SEGMENT_ORDER,
    phaseId: phaseId,
    fromIndex: fromIndex,
    toIndex: toIndex,
  };
};
