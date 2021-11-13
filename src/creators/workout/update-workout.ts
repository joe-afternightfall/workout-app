import { WorkoutActionTypes } from '../actions-workout';
import { RestBetweenType } from '../../configs/types';

export interface UpdateSetTextFieldAction {
  type: WorkoutActionTypes.UPDATE_SET_TEXT_FIELD;
  setId: string;
  name: 'weight' | 'reps' | 'sec';
  value: number;
}

export const updateSetTextField = (
  setId: string,
  name: 'weight' | 'reps' | 'sec',
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

export interface UpdateRestBetweenAction {
  type: WorkoutActionTypes.UPDATE_REST_BETWEEN;
  segmentId: string;
  restType: RestBetweenType;
  value: string;
}

export const updateRestBetween = (
  segmentId: string,
  type: RestBetweenType,
  value: string
): UpdateRestBetweenAction => {
  return {
    type: WorkoutActionTypes.UPDATE_REST_BETWEEN,
    segmentId: segmentId,
    restType: type,
    value: value,
  };
};
