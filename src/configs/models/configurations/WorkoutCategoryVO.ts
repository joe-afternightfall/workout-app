import { WorkoutCategoryDAO } from './WorkoutCategoryDAO';

export class WorkoutCategoryVO extends WorkoutCategoryDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    color: string,
    muscleGroupIds: string[]
  ) {
    super(id, name, color, muscleGroupIds);
    this.firebaseId = firebaseId;
  }
}
