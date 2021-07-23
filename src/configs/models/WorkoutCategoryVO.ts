import { WorkoutCategoryDAO } from './WorkoutCategoryDAO';

export class WorkoutCategoryVO extends WorkoutCategoryDAO {
  firebaseId: string;
  [key: string]: string;

  constructor(firebaseId: string, id: string, name: string) {
    super(id, name);
    this.firebaseId = firebaseId;
  }
}
