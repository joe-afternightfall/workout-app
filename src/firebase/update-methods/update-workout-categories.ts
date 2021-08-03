import { Store } from 'redux';
import { WorkoutCategoryVO } from '../../configs/models/WorkoutCategoryVO';
import { getAllWorkoutCategories } from '../../services/workout-categories-service';
import { loadWorkoutCategories } from '../../creators/workout-categories';

export const updateWorkoutCategories = async (store: Store): Promise<void> => {
  const groups = await getAllWorkoutCategories();

  if (groups) {
    store.dispatch(loadWorkoutCategories(buildVO(groups)));
  } else {
    store.dispatch(loadWorkoutCategories([]));
  }
};

function buildVO(groups: any): WorkoutCategoryVO[] {
  return Object.keys(groups).map((key: string): WorkoutCategoryVO => {
    return {
      firebaseId: key,
      id: groups[key].id,
      name: groups[key].name,
    };
  });
}
