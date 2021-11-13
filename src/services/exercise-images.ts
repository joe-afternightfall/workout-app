import 'firebase/storage';
import {
  ExerciseVO,
  findExercise,
  RoutineTemplateVO,
} from 'workout-app-common-core';
import firebase from 'firebase/app';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { loadExerciseImages } from '../creators/load-workout-configs';

let exerciseCounter = 0;

export const getExerciseImagesForMuscleId =
  (selectedMuscleId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const allExercises =
      getState().applicationState.workoutConfigurations.exercises;
    const exercisesForId: ExerciseVO[] = [];

    allExercises.map((exercise) => {
      if (exercise.manikinMuscleGroupIds.includes(selectedMuscleId)) {
        exercisesForId.push(exercise);
      }
    });
    console.log('exercisesForId: ' + JSON.stringify(exercisesForId));
    exercisesForId.map((exercise) => {
      exerciseCounter++;
      console.log(
        'ATTEMPTING_IMAGE_LOOKUP: #' +
          exerciseCounter +
          ' for:' +
          exercise.iconId
      );
      // todo: FIRST_LOOKUP_IN_REDUX
      // todo: if exercise not found then make firebase call
      getImages(dispatch, exercise.iconId);
    });
  };

export const getExerciseImagesForRoutine =
  (routine: RoutineTemplateVO): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const allExercises =
      getState().applicationState.workoutConfigurations.exercises;
    const folderNames: string[] = [];

    routine.phases.map((phase) => {
      phase.segments.map((segment) => {
        segment.exercises.map((exercise) => {
          const foundExercise = findExercise(allExercises, exercise.exerciseId);
          if (foundExercise) {
            folderNames.push(foundExercise.iconId);
          }
        });
      });
    });

    folderNames.map((name) => getImages(dispatch, name));
  };

const getImages = async (dispatch: Dispatch, folderName: string) => {
  const downloadUrls: string[] = [];
  return await firebase
    .storage()
    .ref(`exercises/${folderName}`)
    .listAll()
    .then(async (listResult) => {
      const length = listResult.items.length;
      listResult.items.map(async (item) => {
        await item.getDownloadURL().then((url) => {
          downloadUrls.push(url);
        });
        if (length === downloadUrls.length) {
          dispatch(loadExerciseImages(folderName, downloadUrls));
        }
      });
    })
    .catch((error) => {
      console.log('error: ' + JSON.stringify(error));
    });
};
