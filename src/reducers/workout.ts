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
  Set,
  TrainingSetType,
  WorkoutExercise,
} from '../configs/models/AppInterfaces';
import { WorkoutDAO } from '../configs/models/workout/WorkoutDAO';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';

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
      case WorkoutActionTypes.TOGGLE_EDIT_PREVIEW_LIST:
        newState.displayEditPreviewList = action.display;
        break;
      case WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS: {
        newState.copyOfRoutineTemplate = ramda.clone(
          newState.selectedRoutineTemplate
        );
        newState.displayEditPreviewList = true;
        break;
      }
      case WorkoutActionTypes.OPEN_EDIT_SET:
        newState.displayEditSet = true;
        newState.editSetSegmentId = action.segmentId;
        break;
      case WorkoutActionTypes.CLOSE_EDIT_SET:
        newState.displayEditSet = false;
        newState.editSetSegmentId = '';
        break;
      case WorkoutActionTypes.DELETE_SEGMENT_FROM_ROUTINE_COPY: {
        const clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              const foundIndex = phase.segments.indexOf(segment);
              phase.segments.splice(foundIndex, 1);
              phase.segments.map((segment, index) => {
                segment.order = index + 1;
              });
            }
          });
        });
        newState.copyOfRoutineTemplate.phases = clonedPhases;
        break;
      }
      case WorkoutActionTypes.ADD_SET_TO_EDITING_COPY: {
        const clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            segment.exercises.map((exercise) => {
              if (exercise.id === action.segmentExerciseId) {
                const numberOfSets = exercise.sets.length;
                const lastSet = exercise.sets[numberOfSets - 1];
                exercise.sets.push({
                  id: uuidv4(),
                  setNumber: numberOfSets + 1,
                  weight: lastSet ? lastSet.weight : 0,
                  reps: lastSet ? lastSet.reps : 0,
                  duration: {
                    currentTimeMs: 0,
                    currentTimeSec: 0,
                    currentTimeMin: 0,
                  },
                  distance: {
                    unit: '',
                    value: 0,
                  },
                  markedDone: false,
                });
              }
            });
          });
        });
        newState.copyOfRoutineTemplate.phases = clonedPhases;
        break;
      }
      case WorkoutActionTypes.DELETE_SET_FROM_EDITING_COPY: {
        //todo: extract out below giant map()
        newState.copyOfRoutineTemplate.phases.map((phase) => {
          phase.segments.map((segment) => {
            segment.exercises.map((exercise) => {
              exercise.sets.map((set) => {
                if (set.id === action.setId) {
                  const foundIndex = exercise.sets.indexOf(set);
                  exercise.sets.splice(foundIndex, 1);
                  exercise.sets.map((set, index) => {
                    set.setNumber = index + 1;
                  });
                }
              });
            });
          });
        });
        break;
      }
      case WorkoutActionTypes.SAVE_EDITED_VERSION_OF_ROUTINE: {
        newState.selectedRoutineTemplate = ramda.clone(
          newState.copyOfRoutineTemplate
        );
        newState.displayEditPreviewList = false;
        break;
      }
      case WorkoutActionTypes.UPDATE_SET_TEXT_FIELD: {
        // todo: add NPM util to access deeply nested objects
        if (newState.displayEditPreviewList) {
          newState.copyOfRoutineTemplate.phases.map((phase) => {
            phase.segments.map((segment) => {
              segment.exercises.map((exercise) => {
                exercise.sets.map((set) => {
                  if (set.id === action.setId) {
                    set[action.name] = action.value;
                  }
                });
              });
            });
          });
        }
        break;
      }
      case WorkoutActionTypes.START_WORKOUT: {
        const template = newState.selectedRoutineTemplate;

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
            phases: template.phases,
          }
        );
        newState.currentPhase = newState.activeWorkout.routine.phases[0];
        newState.currentSegmentIndex = 1;
        newState.currentSetIndex = 1;
        break;
      }
      case WorkoutActionTypes.MARK_CURRENT_SET_AS_DONE:
        {
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

          if (action.lastSet && action.lastSegment) {
            const foundPhase = newState.activeWorkout.routine.phases.find(
              (phase: Phase) => phase.order === newState.currentPhase.order + 1
            );
            if (foundPhase) {
              return {
                ...newState,
                currentSetIndex: 1,
                currentSegmentIndex: 1,
                currentPhase: foundPhase,
                activeWorkout: {
                  ...newState.activeWorkout,
                  routine: {
                    ...newState.activeWorkout.routine,
                    phases: [...newState.activeWorkout.routine.phases],
                  },
                },
              };
            }
          } else if (action.lastSet && !action.lastSegment) {
            return {
              ...newState,
              currentSetIndex: 1,
              currentSegmentIndex: newState.currentSegmentIndex + 1,
              activeWorkout: {
                ...newState.activeWorkout,
                routine: {
                  ...newState.activeWorkout.routine,
                  phases: [...newState.activeWorkout.routine.phases],
                },
              },
            };
          } else {
            return {
              ...newState,
              currentSetIndex: newState.currentSetIndex + 1,
              activeWorkout: {
                ...newState.activeWorkout,
                routine: {
                  ...newState.activeWorkout.routine,
                  phases: [...newState.activeWorkout.routine.phases],
                },
              },
            };
          }
        }
        break;
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
  copyOfRoutineTemplate: RoutineTemplateVO;
  activeWorkout: WorkoutDAO;
  currentPhase: Phase;
  currentSegmentIndex: number;
  currentSetIndex: number;
  totalSegments: number;
  lastSegment: number;
  displayEditPreviewList: boolean;
  displayEditSet: boolean;
  editSetSegmentId: string;
}
