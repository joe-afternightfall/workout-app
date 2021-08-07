import { ExerciseTypeDAO } from './ExerciseTypeDAO';

export class ExerciseTypeVO extends ExerciseTypeDAO {
  firebaseId: string;
  // [key: string]: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    workoutCategoryId: string
  ) {
    super(id, name, workoutCategoryId);
    this.firebaseId = firebaseId;
  }
}
