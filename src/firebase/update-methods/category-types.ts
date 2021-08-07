import { Store } from 'redux';
import { loadCategoryTypes } from '../../creators/workout-configurations';
import { getAllWorkoutCategories } from '../../services/category-types-service';
import { CategoryTypeVO } from '../../configs/models/workout-configurations/category-type/CategoryTypeVO';

export const updateCategoryTypes = async (store: Store): Promise<void> => {
  const groups = await getAllWorkoutCategories();

  if (groups) {
    store.dispatch(loadCategoryTypes(buildVO(groups)));
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
