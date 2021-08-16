import { WorkoutCircuitProps } from '../../components/top-level-components/workout-screen/WorkoutScreen';

export class WorkoutDAO {
  id: string;
  email: string;
  circuits: WorkoutCircuitProps[];
  // todo: rename "workoutDate" to "date"
  workoutDate: string;

  constructor(
    id: string,
    email: string,
    circuits: WorkoutCircuitProps[],
    workoutDate: string
  ) {
    this.id = id;
    this.email = email;
    this.circuits = circuits;
    this.workoutDate = workoutDate;
  }
}
