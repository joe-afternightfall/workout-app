import { Store } from 'redux';
import { MuscleGroupVO } from '../../configs/models/MuscleGroupVO';
import { getAllMuscleGroups } from '../../services/muscle-group-service';
import { loadMuscleGroups } from '../../creators/muscle-groups';

export const updateMuscleGroups = async (store: Store) => {
  const groups = await getAllMuscleGroups();

  if (groups) {
    store.dispatch(loadMuscleGroups(buildVO(groups)));
  } else {
    store.dispatch(loadMuscleGroups([]));
  }
};

function buildVO(groups: any): MuscleGroupVO[] {
  return Object.keys(groups).map((key: string): MuscleGroupVO => {
    return {
      firebaseId: key,
      id: groups[key].id,
      name: groups[key].name,
    };
  });
}
