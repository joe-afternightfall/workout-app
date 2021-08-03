import { WorkoutDAO } from './WorkoutDAO';
import { WorkoutCircuitProps } from '../../components/top-level-components/workout/WorkoutScreen';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    username: string,
    circuits: WorkoutCircuitProps[],
    workoutDate: string
  ) {
    super(id, username, circuits, workoutDate);
    this.firebaseId = firebaseId;
  }
}
