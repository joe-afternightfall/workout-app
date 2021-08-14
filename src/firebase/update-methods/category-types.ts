import { Store } from 'redux';
import { loadCategoryTypes } from '../../creators/workout-configurations';
import { getAllCategoryTypes } from '../../services/workout-configurations/category-types-service';

export const updateCategoryTypes = async (store: Store): Promise<void> => {
  const categoryTypes = await getAllCategoryTypes();

  store.dispatch(loadCategoryTypes(categoryTypes));
};
