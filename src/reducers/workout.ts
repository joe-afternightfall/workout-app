import * as ramda from 'ramda';
import {
  Phase,
  RoutineTemplateVO,
  Set,
  STRAIGHT_SET_ID,
  SUPER_SET_ID,
  Workout,
  WorkoutCategoryVO,
  WorkoutExercise,
} from 'workout-app-common-core';
import {
  WorkoutActions,
  WorkoutActionTypes,
} from '../creators/actions-workout';
import { v4 as uuidv4 } from 'uuid';
import { arrayMoveImmutable as arrayMove } from 'array-move';
import {
  DeleteExerciseDrawerActionProps,
  PhaseTypeEditingSegment,
} from '../configs/types';
import { deleteSegmentFromPhase } from '../utils/edit-object-util';

function updateSet(
  phase: Phase | undefined,
  setId: string,
  value: number,
  name: 'sec' | 'reps' | 'weight'
) {
  phase &&
    phase.segments.map((segment) => {
      segment.exercises.map((exercise) => {
        exercise.sets.map((set) => {
          if (set.id === setId) {
            if (name === 'sec') {
              if (set.duration) {
                set.duration.seconds = value;
              }
            } else {
              set[name] = value;
            }
          }
        });
      });
    });
}

function buildBaseSets(amount: number): Set[] {
  let i = 0;
  const baseSets: Set[] = [];

  while (amount > i) {
    i++;
    baseSets.push({
      id: uuidv4(),
      setNumber: i,
      weight: 0,
      reps: 0,
      markedDone: false,
    });
  }
  return baseSets;
}

export default {
  reducer: (
    state: WorkoutState = {} as unknown as WorkoutState,
    action: WorkoutActions
  ): WorkoutState => {
    const newState = Object.assign({}, state);

    switch (action.type) {
      case WorkoutActionTypes.SELECTED_WORKOUT_CATEGORY:
        newState.selectedWorkoutCategory = action.category;
        break;
      case WorkoutActionTypes.SELECTED_ROUTINE:
        newState.selectedRoutineTemplate = action.routine;
        break;
      case WorkoutActionTypes.TOGGLE_EDIT_OPTION_BUTTONS:
        newState.editOptions = action.props;
        break;
      case WorkoutActionTypes.OPEN_EDIT_PREVIEW_OPTIONS: {
        newState.copyOfRoutineTemplate = ramda.clone(
          newState.selectedRoutineTemplate
        );
        newState.editOptions.open = true;
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
      case WorkoutActionTypes.DELETE_SELECTED_SEGMENT_FROM_ROUTINE: {
        const phaseType = newState.deleteExerciseDrawerProps.phaseType;

        if (phaseType === 'editing') {
          newState.copyOfRoutineTemplate.phases = deleteSegmentFromPhase(
            newState.copyOfRoutineTemplate.phases,
            action.segmentId
          );
        } else if (phaseType === 'activeWorkout') {
          const updatedPhases = deleteSegmentFromPhase(
            newState.activeWorkout.routine.phases,
            action.segmentId
          );
          newState.activeWorkout.routine.phases = updatedPhases;
          updatedPhases.map((phase) => {
            if (phase.id === newState.currentPhase.id) {
              newState.currentPhase = phase;
            }
          });
        }
        break;
      }
      case WorkoutActionTypes.TOGGLE_DELETE_EXERCISE_DRAWER:
        newState.deleteExerciseDrawerProps = action.props;
        break;
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
        newState.editOptions.open = false;
        break;
      }
      case WorkoutActionTypes.UPDATE_SET_TEXT_FIELD: {
        if (newState.editOptions.open) {
          const clonedPhases = ramda.clone(
            newState.copyOfRoutineTemplate.phases
          );
          clonedPhases.map((phase) => {
            updateSet(phase, action.setId, action.value, action.name);
          });
          newState.copyOfRoutineTemplate.phases = clonedPhases;
        } else {
          let foundPhase: Phase | undefined;
          newState.activeWorkout.routine.phases.map((phase) => {
            phase.segments.map((segment) => {
              segment.exercises.map((exercise) => {
                exercise.sets.map((set) => {
                  if (set.id === action.setId) {
                    foundPhase = phase;
                  }
                });
              });
            });
          });
          updateSet(foundPhase, action.setId, action.value, action.name);
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
      case WorkoutActionTypes.START_SELECTED_SEGMENT: {
        const currentSegmentIndex = newState.currentSegmentIndex;
        const clonedCurrentPhase = ramda.clone(newState.currentPhase);
        const selectedSegment = clonedCurrentPhase.segments.find(
          (segment) => segment.id === action.segmentId
        );
        const currentSegment = clonedCurrentPhase.segments.find(
          (segment) => segment.order === currentSegmentIndex
        );
        if (selectedSegment && currentSegment) {
          currentSegment.order = selectedSegment.order;
          selectedSegment.order = currentSegmentIndex;
        }

        newState.currentPhase = clonedCurrentPhase;
        break;
      }
      case WorkoutActionTypes.CLEAR_ACTIVE_WORKOUT:
        newState.activeWorkout = action.workout;
        break;
      case WorkoutActionTypes.ADD_EXERCISE_TO_NEW_STRAIGHT_SET: {
        let clonedPhases: Phase[] = [];
        if (newState.phaseTypeAddingSegment === 'editing') {
          clonedPhases = ramda.clone(newState.copyOfRoutineTemplate.phases);
        } else if (newState.phaseTypeAddingSegment === 'activeWorkout') {
          clonedPhases = ramda.clone(newState.activeWorkout.routine.phases);
        }

        const segmentId = uuidv4();
        clonedPhases.map((phase) => {
          if (phase.id === newState.phaseIdToAddNewSegment) {
            phase.segments.push({
              id: segmentId,
              order: phase.segments.length + 1,
              trainingSetTypeId: STRAIGHT_SET_ID,
              secondsRestBetweenSets: 30,
              secondsRestBetweenNextSegment: 60,
              exercises: [
                {
                  id: uuidv4(),
                  order: 1,
                  exerciseId: action.exerciseId,
                  sets: buildBaseSets(3),
                },
              ],
            });
          }
        });
        if (newState.phaseTypeAddingSegment === 'editing') {
          newState.copyOfRoutineTemplate.phases = clonedPhases;
        } else if (newState.phaseTypeAddingSegment === 'activeWorkout') {
          newState.activeWorkout.routine.phases = clonedPhases;
          clonedPhases.map((phase) => {
            if (phase.id === newState.currentPhase.id) {
              newState.currentPhase = phase;
            }
          });
        }
        newState.displayEditSet = true;
        newState.editSetSegmentId = segmentId;
        newState.displayDoneButtonInEditSetAppBar = true;
        break;
      }
      case WorkoutActionTypes.ADD_EXERCISE_TO_NEW_SUPER_SET: {
        newState.newSuperSetExerciseIdsForRoutine.push(action.exerciseId);

        if (newState.newSuperSetExerciseIdsForRoutine.length === 2) {
          const phaseIdToAddNewSegment = newState.phaseIdToAddNewSegment;
          let phases: Phase[] = [];
          if (phaseIdToAddNewSegment !== '') {
            if (newState.phaseTypeAddingSegment === 'editing') {
              phases = newState.copyOfRoutineTemplate.phases;
            } else if (newState.phaseTypeAddingSegment === 'activeWorkout') {
              phases = newState.activeWorkout.routine.phases;
            }
          }
          const clonedPhases = ramda.clone(phases);
          const newExercises: WorkoutExercise[] =
            newState.newSuperSetExerciseIdsForRoutine.map((id, index) => {
              return {
                id: uuidv4(),
                order: index + 1,
                exerciseId: id,
                sets: buildBaseSets(3),
              };
            });
          const segmentId = uuidv4();
          clonedPhases.map((phase) => {
            if (phase.id === newState.phaseIdToAddNewSegment) {
              phase.segments.push({
                id: segmentId,
                order: phase.segments.length + 1,
                trainingSetTypeId: SUPER_SET_ID,
                secondsRestBetweenSets: 30,
                secondsRestBetweenNextSegment: 60,
                exercises: newExercises,
              });
            }
            if (newState.phaseTypeAddingSegment === 'editing') {
              newState.copyOfRoutineTemplate.phases = clonedPhases;
            } else if (newState.phaseTypeAddingSegment === 'activeWorkout') {
              newState.activeWorkout.routine.phases = clonedPhases;
              clonedPhases.map((phase) => {
                if (phase.id === newState.currentPhase.id) {
                  newState.currentPhase = phase;
                }
              });
            }
            newState.displayEditSet = true;
            newState.editSetSegmentId = segmentId;
            newState.displayDoneButtonInEditSetAppBar = true;
            newState.newSuperSetExerciseIdsForRoutine = [];
          });
        } else if (newState.newSuperSetExerciseIdsForRoutine.length === 1) {
          action.callbackHandler();
        }
        break;
      }
      case WorkoutActionTypes.TOGGLE_EXERCISE_WIDGET_ON_ROUTINE_PREVIEW_PAGE:
        newState.displayExerciseWidget = action.open;
        break;
      case WorkoutActionTypes.CHECK_IF_PHASE_SELECTION_REQUIRED:
        newState.phaseTypeAddingSegment = action.phaseType;
        if (action.phaseType === 'editing') {
          if (newState.copyOfRoutineTemplate.phases.length === 1) {
            newState.phaseIdToAddNewSegment =
              newState.copyOfRoutineTemplate.phases[0].id;
          } else {
            newState.displayWhichPhaseDialog = true;
          }
        } else if (action.phaseType === 'activeWorkout') {
          if (newState.activeWorkout.routine.phases.length === 1) {
            newState.phaseIdToAddNewSegment =
              newState.activeWorkout.routine.phases[0].id;
          } else {
            newState.displayWhichPhaseDialog = true;
          }
        }
        break;
      case WorkoutActionTypes.CLOSE_AND_UPDATE_PHASE_ID_TO_ADD_NEW_SEGMENT:
        newState.phaseIdToAddNewSegment = action.phaseId;
        newState.displayWhichPhaseDialog = false;
        break;
      default:
        break;
    }

    return newState;
  },
};

export interface WorkoutState {
  currentLocation: string;
  selectedWorkoutCategory: WorkoutCategoryVO;
  selectedRoutineTemplate: RoutineTemplateVO;
  copyOfRoutineTemplate: RoutineTemplateVO;
  activeWorkout: Workout;
  currentPhase: Phase;
  newSuperSetExerciseIdsForRoutine: string[];
  currentSegmentIndex: number;
  currentSetIndex: number;
  totalSegments: number;
  lastSegment: number;
  editOptions: {
    open: boolean;
    onlyDisplayDelete: boolean;
  };
  displayEditSet: boolean;
  editSetSegmentId: string;
  displayWhichPhaseDialog: boolean;
  phaseTypeAddingSegment: PhaseTypeEditingSegment;
  phaseIdToAddNewSegment: string;
  displayExerciseWidget: boolean;
  displayDoneButtonInEditSetAppBar: boolean;
  deleteExerciseDrawerProps: DeleteExerciseDrawerActionProps;
}
