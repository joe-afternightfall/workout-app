import { Store } from 'redux';
import { loadCategoryTypes } from '../../creators/workout-configurations';
import { CategoryTypeVO } from '../../configs/models/workout-configurations/category-type/CategoryTypeVO';
import { getAllCategoryTypes } from '../../services/workout-configurations/category-types-service';

export const updateCategoryTypes = async (store: Store): Promise<void> => {
  const categoryTypes = await getAllCategoryTypes();

  if (categoryTypes) {
    store.dispatch(loadCategoryTypes(buildVO(categoryTypes)));
  } else {
    store.dispatch(loadCategoryTypes([]));
  }
};

function buildVO(groups: any): CategoryTypeVO[] {
  return Object.keys(groups).map((key: string): CategoryTypeVO => {
    return {
      firebaseId: key,
      id: groups[key].id,
      name: groups[key].name,
    };
  });
}
