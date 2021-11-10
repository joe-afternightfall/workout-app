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
