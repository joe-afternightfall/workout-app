export class ExerciseDAO {
  id: string;
  name: string;
  description: string;
  equipmentId: string;
  muscleGroupIds: string[];
  iconId: string;
  gripTypeId: string;
  gripWidthId: string;
  parameterTypeId: string;
  alternateSides: boolean;

  constructor(
    id: string,
    name: string,
    description: string,
    equipmentId: string,
    muscleGroupIds: string[],
    iconId: string,
    gripTypeId: string,
    gripWidthId: string,
    parameterTypeId: string,
    alternateSides: boolean
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.equipmentId = equipmentId;
    this.muscleGroupIds = muscleGroupIds;
    this.iconId = iconId;
    this.gripTypeId = gripTypeId;
    this.gripWidthId = gripWidthId;
    this.parameterTypeId = parameterTypeId;
    this.alternateSides = alternateSides;
  }
}
