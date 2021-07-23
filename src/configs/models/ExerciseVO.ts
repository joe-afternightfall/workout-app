import { ExerciseDAO } from './ExerciseDAO';

export class ExerciseVO extends ExerciseDAO {
  firebaseId: string;
  [key: string]: string;

  constructor(firebaseId: string, id: string, name: string) {
    super(id, name);
    this.firebaseId = firebaseId;
  }
}
