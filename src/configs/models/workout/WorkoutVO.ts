import { WorkoutDAO } from './WorkoutDAO';
import { Routine, WorkoutDuration } from '../AppInterfaces';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    userId: string,
    date: string,
    duration: WorkoutDuration,
    routine: Routine
  ) {
    super(id, userId, date, duration, routine);
    this.firebaseId = firebaseId;
  }
}
