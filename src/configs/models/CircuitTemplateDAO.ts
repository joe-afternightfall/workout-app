import { ExerciseTypeVO } from './workout-configurations/exercise-type/ExerciseTypeVO';

export interface SetTemplate {
  setTemplateId: string;
  exerciseSet: ExerciseTypeVO;
  sets: number;
  weight: number;
  reps: number;
}

export class CircuitTemplateDAO {
  id: string;
  circuitId: string;
  circuitNickname: string;
  exercises: SetTemplate[];

  constructor(
    id: string,
    circuitId: string,
    circuitNickname: string,
    exercises: SetTemplate[]
  ) {
    this.id = id;
    this.circuitId = circuitId;
    this.circuitNickname = circuitNickname;
    this.exercises = exercises;
  }
}
