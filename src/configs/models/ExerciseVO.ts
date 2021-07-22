import { ExerciseDAO } from './ExerciseDAO';

export class ExerciseVO extends ExerciseDAO {
  firebaseId: string;
  [key: string]: string;

  constructor(firebaseId: string, name: string) {
    super(name);
    this.firebaseId = firebaseId;
  }
}
