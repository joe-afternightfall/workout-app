import { LOCATION_CHANGE } from 'connected-react-router';
import {
  WorkoutActions,
  WorkoutActionTypes,
} from '../creators/actions-workout';
import {
  EquipmentVO,
  ExerciseVO,
  RoutineTemplateVO,
  WorkoutCategoryVO,
  PhaseVO,
  GripType,
  GripWidth,
  ParameterType,
  Phase,
  Set,
  TrainingSetType,
  WorkoutExercise,
  Workout,
} from 'workout-app-common-core';
import { v4 as uuidv4 } from 'uuid';
import * as ramda from 'ramda';
import { arrayMoveImmutable as arrayMove } from 'array-move';

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
      case WorkoutActionTypes.ADD_SET_TO_ROUTINE_COPY: {
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
                  duration: lastSet && lastSet.duration,
                  timers: lastSet && lastSet.timers,
                  distance: lastSet && lastSet.distance,
                  markedDone: false,
                });
              }
            });
          });
        });
        newState.copyOfRoutineTemplate.phases = clonedPhases;
        break;
      }
      case WorkoutActionTypes.DELETE_SET_FROM_ROUTINE_COPY: {
        const clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        clonedPhases.map((phase) => {
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
        newState.copyOfRoutineTemplate.phases = clonedPhases;
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
        let clonedPhases: Phase[] = [];

        if (newState.displayEditPreviewList) {
          clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
          clonedPhases.map((phase) => {
            phase.segments.map((segment) => {
              segment.exercises.map((exercise) => {
                exercise.sets.map((set) => {
                  if (set.id === action.setId) {
                    if (action.name === 'sec') {
                      if (set.duration) {
                        set.duration.seconds = action.value;
                      }
                    } else {
                      set[action.name] = action.value;
                    }
                  }
                });
              });
            });
          });
          newState.copyOfRoutineTemplate.phases = clonedPhases;
        } else {
          clonedPhases = ramda.clone(newState.activeWorkout.routine.phases);
          newState.currentPhase.segments.map((segment) => {
            segment.exercises.map((exercise) => {
              exercise.sets.map((set) => {
                if (set.id === action.setId) {
                  if (action.name === 'sec') {
                    if (set.duration) {
                      set.duration.seconds = action.value;
                    }
                  } else {
                    set[action.name] = action.value;
                  }
                }
              });
            });
          });
        }
        break;
      }
      case WorkoutActionTypes.UPDATE_REST_BETWEEN: {
        const clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        clonedPhases.map((phase) => {
          phase.segments.map((segment) => {
            if (segment.id === action.segmentId) {
              if (action.restType === 'set') {
                segment.secondsRestBetweenSets = Number(action.value);
              } else {
                segment.secondsRestBetweenNextSegment = Number(action.value);
              }
            }
          });
        });
        newState.copyOfRoutineTemplate.phases = clonedPhases;
        break;
      }
      case WorkoutActionTypes.UPDATE_SEGMENT_ORDER: {
        const clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        const foundPhase = clonedPhases.find(
          (phase) => phase.id === action.phaseId
        );
        if (foundPhase) {
          arrayMove(foundPhase.segments, action.fromIndex, action.toIndex).map(
            (segment, index) => {
              segment.order = index + 1;
            }
          );
        }
        newState.copyOfRoutineTemplate.phases = clonedPhases;
        break;
      }
      case WorkoutActionTypes.START_WORKOUT: {
        const template = ramda.clone(newState.selectedRoutineTemplate);
        const currentTimestamp = new Date();

        newState.activeWorkout = {
          id: uuidv4(),
          date: currentTimestamp.toLocaleDateString(),
          startTime: String(Date.now()),
          endTime: '0',
          routine: {
            id: template.id,
            name: template.name,
            workoutCategoryId: template.workoutCategoryId,
            phases: template.phases,
          },
        };

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
      case WorkoutActionTypes.WORKOUT_DONE:
        newState.activeWorkout.endTime = Date.now().toString();
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
  activeWorkout: Workout;
  currentPhase: Phase;
  currentSegmentIndex: number;
  currentSetIndex: number;
  totalSegments: number;
  lastSegment: number;
  displayEditPreviewList: boolean;
  displayEditSet: boolean;
  editSetSegmentId: string;
}
