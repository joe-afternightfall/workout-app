import {
  updateRestBetween,
  updateSegmentOrder,
  updateSetTextField,
} from './update-workout';
import { WorkoutActionTypes } from '../actions-workout';
import { chance } from 'jest-chance';

describe('update workout creator', () => {
  it('should return update set text field action', () => {
    const setId = chance.string();
    const value = chance.integer();

    const response = updateSetTextField(setId, 'weight', value);

    expect(response).toEqual({
      type: WorkoutActionTypes.UPDATE_SET_TEXT_FIELD,
      setId: setId,
      name: 'weight',
      value: value,
    });
  });

  it('should return update segment order action', () => {
    const phaseId = chance.string();
    const fromIndex = chance.integer();
    const toIndex = chance.integer();

    const response = updateSegmentOrder(phaseId, fromIndex, toIndex);

    expect(response).toEqual({
      type: WorkoutActionTypes.UPDATE_SEGMENT_ORDER,
      phaseId: phaseId,
      fromIndex: fromIndex,
      toIndex: toIndex,
    });
  });

  it('should return update rest between action', () => {
    const segmentId = chance.string();
    const value = chance.string();

    const response = updateRestBetween(segmentId, 'set', value);

    expect(response).toEqual({
      type: WorkoutActionTypes.UPDATE_REST_BETWEEN,
      segmentId: segmentId,
      restType: 'set',
      value: value,
    });
  });
});
