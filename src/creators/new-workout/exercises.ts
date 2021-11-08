import { WorkoutActionTypes } from '../actions-workout';

export interface ExerciseImage {
  name: string;
  downloadUrls: string[];
}

export interface LoadExerciseImagesAction {
  type: WorkoutActionTypes.LOAD_EXERCISE_IMAGES;
  images: ExerciseImage;
}

export const loadExerciseImages = (
  folderName: string,
  downloadUrls: string[]
): LoadExerciseImagesAction => {
  return {
    type: WorkoutActionTypes.LOAD_EXERCISE_IMAGES,
    images: {
      name: folderName,
      downloadUrls: downloadUrls,
    },
  };
};
