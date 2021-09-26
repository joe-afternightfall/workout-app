import { WorkoutDAO } from './WorkoutDAO';
import { Routine } from '../AppInterfaces';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    userId: string,
    date: string,
    startTime: string,
    endTime: string,
    routine: Routine
  ) {
    super(id, userId, date, startTime, endTime, routine);
    this.firebaseId = firebaseId;
  }
}
