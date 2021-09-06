import { RoutineTemplateDAO } from './RoutineTemplateDAO';
import { Phase } from '../AppInterfaces';

export class RoutineTemplateVO extends RoutineTemplateDAO {
  firebaseId: string;

  constructor(
    id: string,
    name: string,
    workoutCategoryId: string,
    phases: Phase[],
    firebaseId: string
  ) {
    super(id, name, workoutCategoryId, phases);
    this.firebaseId = firebaseId;
  }
}
