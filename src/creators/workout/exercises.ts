import { ActionTypes } from '../actions';

export interface FilterExercisesForSearchValueAction {
  type: ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE;
  searchValue: string;
}

export const filterExercisesForSearchValue = (
  value: string
): FilterExercisesForSearchValueAction => {
  return {
    type: ActionTypes.FILTER_EXERCISES_FOR_SEARCH_VALUE,
    searchValue: value,
  };
};

export interface FilterExercisesForEquipmentIdAction {
  type: ActionTypes.FILTER_EXERCISES_FOR_EQUIPMENT_ID;
  id: string;
  actionType: 'add' | 'remove';
}

export const filterExercisesForEquipmentId = (
  id: string,
  actionType: 'add' | 'remove'
): FilterExercisesForEquipmentIdAction => {
  return {
    type: ActionTypes.FILTER_EXERCISES_FOR_EQUIPMENT_ID,
    id: id,
    actionType: actionType,
  };
};
