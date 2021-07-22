import { MuscleGroupDAO } from './MuscleGroupDAO';

export class MuscleGroupVO extends MuscleGroupDAO {
  firebaseId: string;
  [key: string]: string;

  constructor(firebaseId: string, id: string, name: string) {
    super(id, name);
    this.firebaseId = firebaseId;
  }
}
