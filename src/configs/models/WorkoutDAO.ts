import { NewCircuitProps } from '../../components/top-level-components/workout/WorkoutScreen';

export class WorkoutDAO {
  id: string;
  username: string;
  circuits: NewCircuitProps[];
  workoutDate: string;

  constructor(
    id: string,
    username: string,
    circuits: NewCircuitProps[],
    workoutDate: string
  ) {
    this.id = id;
    this.username = username;
    this.circuits = circuits;
    this.workoutDate = workoutDate;
  }
}
