import { WorkoutCircuitProps } from '../../components/top-level-components/workout-screen/WorkoutScreen';

export class WorkoutDAO {
  id: string;
  username: string;
  circuits: WorkoutCircuitProps[];
  workoutDate: string;

  constructor(
    id: string,
    username: string,
    circuits: WorkoutCircuitProps[],
    workoutDate: string
  ) {
    this.id = id;
    this.username = username;
    this.circuits = circuits;
    this.workoutDate = workoutDate;
  }
}
