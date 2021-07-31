import { WorkoutDAO } from './WorkoutDAO';
import { NewCircuitProps } from '../../components/top-level-components/workout/WorkoutScreen';

export class WorkoutVO extends WorkoutDAO {
  firebaseId: string;

  constructor(
    firebaseId: string,
    id: string,
    username: string,
    circuits: NewCircuitProps[],
    workoutDate: string
  ) {
    super(id, username, circuits, workoutDate);
    this.firebaseId = firebaseId;
  }
}
