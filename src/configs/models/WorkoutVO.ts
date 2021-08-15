import { WorkoutDAO } from './WorkoutDAO';
import { WorkoutCircuitProps } from '../../components/top-level-components/workout-screen/WorkoutScreen';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    email: string,
    circuits: WorkoutCircuitProps[],
    workoutDate: string
  ) {
    super(id, email, circuits, workoutDate);
    this.firebaseId = firebaseId;
  }
}
