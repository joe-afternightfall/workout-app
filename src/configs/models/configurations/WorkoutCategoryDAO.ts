export class WorkoutCategoryDAO {
  id: string;
  name: string; // ex(back & bi's | chest & tri's | cardio | shoulders)
  color: string;
  muscleGroupIds: string[];

  constructor(
    id: string,
    name: string,
    color: string,
    muscleGroupIds: string[]
  ) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.muscleGroupIds = muscleGroupIds;
  }
}
