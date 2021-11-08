import firebase from 'firebase/app';
import 'firebase/storage';
import { ThunkAction } from 'redux-thunk';
import { State } from '../configs/redux/store';
import { AnyAction, Dispatch } from 'redux';
import { loadExerciseImages } from '../creators/new-workout/exercises';
import { ExerciseVO } from 'workout-app-common-core';

let exerciseCounter = 0;

export const getExerciseImages =
  (selectedMuscleId: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const allExercises = getState().workoutState.configs.exercises;
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
