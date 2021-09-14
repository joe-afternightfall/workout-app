import { ExerciseDAO } from './ExerciseDAO';

export class ExerciseVO extends ExerciseDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
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
    super(
      id,
      name,
      description,
      equipmentId,
      muscleGroupIds,
      iconId,
      gripTypeId,
      gripWidthId,
      parameterTypeId,
      alternateSides
    );
    this.firebaseId = firebaseId;
  }
}
