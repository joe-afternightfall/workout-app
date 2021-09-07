import { LOCATION_CHANGE } from 'connected-react-router';
import {
  WorkoutActions,
  WorkoutActionTypes,
} from '../creators/actions-workout';
import { PhaseVO } from '../configs/models/configurations/PhaseVO';
import { WorkoutCategoryVO } from '../configs/models/configurations/WorkoutCategoryVO';
import { EquipmentVO } from '../configs/models/configurations/EquipmentVO';
import { ExerciseVO } from '../configs/models/configurations/ExerciseVO';
import { RoutineTemplateVO } from '../configs/models/workout/RoutineTemplateVO';
import {
  GripType,
  GripWidth,
  ParameterType,
  Phase,
  Segment,
  TrainingSetType,
  WorkoutExercise,
  Set,
} from '../configs/models/AppInterfaces';
import { WorkoutDAO } from '../configs/models/workout/WorkoutDAO';
import { v4 as uuidv4 } from 'uuid';

export default {
  reducer: (
    state: WorkoutState = {} as unknown as WorkoutState,
    action: WorkoutActions
  ): WorkoutState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case LOCATION_CHANGE:
        newState.currentLocation = action.payload.location.pathname;
        break;
      case WorkoutActionTypes.INITIALIZE:
        newState.configs = action.configs;
        break;
      case WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY:
        newState.selectedWorkoutCategory = action.category;
        break;
      case WorkoutActionTypes.SELECTED_ROUTINE:
        newState.selectedRoutineTemplate = action.routine;
        break;
      case WorkoutActionTypes.START_WORKOUT: {
        const template = newState.selectedRoutineTemplate;
        const phases: Phase[] = template.phases;

        phases
          .sort((a: Phase, b: Phase) => a.order - b.order)
          .map((phase: Phase) => {
            return phase.segments
              .sort((c: Segment, d: Segment) => c.order - d.order)
              .map((segment: Segment) => {
                return segment.exercises
                  .sort(
                    (e: WorkoutExercise, f: WorkoutExercise) =>
                      e.order - f.order
                  )
                  .map((exercise: WorkoutExercise) => {
                    return exercise.sets.sort(
                      (g: Set, h: Set) => g.setNumber - h.setNumber
                    );
                  });
              });
          });

        newState.activeWorkout = new WorkoutDAO(
          uuidv4(),
          '', // todo: come back to userId and implement from firebase
          new Date().toLocaleDateString(),
          {
            currentTimeMs: 0,
            currentTimeSec: 0,
            currentTimeMin: 0,
          },
          {
            id: template.id,
            name: template.name,
            workoutCategoryId: template.workoutCategoryId,
            phases: phases,
          }
        );
        newState.currentPhase = newState.activeWorkout.routine.phases[0];
        newState.currentSegmentIndex = 4;
        newState.currentSetIndex = 1;
        break;
      }
      case WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE: {
        const segments = newState.currentPhase.segments;
        const foundSegment = segments.find(
          (segment) => segment.id === action.segmentId
        );

        if (foundSegment) {
          foundSegment.exercises.map((exercise: WorkoutExercise) => {
            const foundSet = exercise.sets.find(
              (set: Set) => set.setNumber === action.setNumber
            );

            if (foundSet) {
              if (foundSet.markedDone) {
                foundSet.markedDone = false;
                return;
              } else {
                foundSet.markedDone = true;
              }
            }
          });
        }

        return {
          ...newState,
          currentSetIndex: action.lastSet ? 1 : newState.currentSetIndex + 1,
          currentSegmentIndex: action.lastSet
            ? newState.currentSegmentIndex + 1
            : newState.currentSegmentIndex,
          activeWorkout: {
            ...newState.activeWorkout,
            routine: {
              ...newState.activeWorkout.routine,
              phases: [...newState.activeWorkout.routine.phases],
            },
          },
        };
      }
      default:
        break;
    }

    return newState;
  },
};

export interface WorkoutState {
  currentLocation: string;
  configs: {
    trainingSetTypes: TrainingSetType[];
    phases: PhaseVO[];
    workoutCategories: WorkoutCategoryVO[];
    equipmentList: EquipmentVO[];
    gripWidths: GripWidth[];
    gripTypes: GripType[];
    parameterTypes: ParameterType[];
    exercises: ExerciseVO[];
    routineTemplates: RoutineTemplateVO[];
  };
  selectedWorkoutCategory: WorkoutCategoryVO;
  selectedRoutineTemplate: RoutineTemplateVO;
  activeWorkout: WorkoutDAO;
  currentPhase: Phase;
  currentSegmentIndex: number;
  currentSetIndex: number;
  totalSegments: number;
  lastSegment: number;
}
