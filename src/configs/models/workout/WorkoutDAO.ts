import { Routine, WorkoutDuration } from '../AppInterfaces';

export class WorkoutDAO {
  id: string;
  userId: string;
  date: string;
  duration: WorkoutDuration;
  routine: Routine;

  constructor(
    id: string,
    userId: string,
    date: string,
    duration: WorkoutDuration,
    routine: Routine
  ) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.duration = duration;
    this.routine = routine;
  }
}
