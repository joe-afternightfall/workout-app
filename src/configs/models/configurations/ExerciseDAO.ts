export class ExerciseDAO {
  id: string;
  name: string;
  description: string;
  equipmentId: string;
  muscleGroupIds: string[];
  iconId: string;
  gripTypeId: string;
  parameterTypeId: string;
  trainingSetTypeId: string;

  constructor(
    id: string,
    name: string,
    description: string,
    equipmentId: string,
    muscleGroupIds: string[],
    iconId: string,
    gripTypeId: string,
    parameterTypeId: string,
    trainingSetTypeId: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.equipmentId = equipmentId;
    this.muscleGroupIds = muscleGroupIds;
    this.iconId = iconId;
    this.gripTypeId = gripTypeId;
    this.parameterTypeId = parameterTypeId;
    this.trainingSetTypeId = trainingSetTypeId;
  }
}
