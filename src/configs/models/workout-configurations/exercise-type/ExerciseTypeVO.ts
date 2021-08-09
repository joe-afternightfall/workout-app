import { ExerciseTypeDAO, SetType } from './ExerciseTypeDAO';

export class ExerciseTypeVO extends ExerciseTypeDAO {
  firebaseId: string;
  // [key: string]: string;

  constructor(
    firebaseId: string,
    id: string,
    name: string,
    workoutCategoryId: string,
    setType: SetType
  ) {
    super(id, name, workoutCategoryId, setType);
    this.firebaseId = firebaseId;
  }
}
