export class ExerciseDAO {
  id: string;
  name: string;
  workoutCategoryId: string;

  constructor(id: string, name: string, workoutCategoryId: string) {
    this.id = id;
    this.name = name;
    this.workoutCategoryId = workoutCategoryId;
  }
}
