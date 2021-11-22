import {
  filterExercisesForEquipmentId,
  filterExercisesForSearchValue,
} from './exercises';
import { chance } from 'jest-chance';
import { ActionTypes } from '../actions';

describe('exercises creator', () => {
  it('should return filter exercises search value action', () => {
    const value = chance.string();
    const response = filterExercisesForSearchValue(value);

    expect(response).toEqual({
      type: ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE,
      searchValue: value,
    });
  });

  it('should return filterExercisesForEquipmentId actino', () => {
    const id = chance.string();
    const response = filterExercisesForEquipmentId(id, 'add');

    expect(response).toEqual({
      type: ActionTypes.FILTER_EXERCISES_FOR_EQUIPMENT_ID,
      id: id,
      actionType: 'add',
    });
  });
});
