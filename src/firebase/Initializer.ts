import { Store } from 'redux';
import firebase from 'firebase';
import { updateExercises } from './update-methods/update-exercises';
import { updateWorkoutCategories } from './update-methods/update-workout-categories';
import {
  EXERCISES_ROUTE,
  WORKOUT_CATEGORIES_ROUTE,
} from '../configs/constants/firebase-routes';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCxpOEet-ONYFVLUNdagd7o0McN3F2fFRc',
  authDomain: 'workout-app-d4f5d.firebaseapp.com',
  databaseURL: 'https://workout-app-d4f5d-default-rtdb.firebaseio.com',
  projectId: 'workout-app-d4f5d',
  storageBucket: 'workout-app-d4f5d.appspot.com',
  messagingSenderId: '1035531799240',
  appId: '1:1035531799240:web:b5b4e899d2b94eb06eb3fd',
  measurementId: 'G-3NZ08YGD2N',
};

export class Initializer {
  store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  initializeFirebase(): void {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const exercises = firebase.database().ref(EXERCISES_ROUTE);
    const workoutCategories = firebase.database().ref(WORKOUT_CATEGORIES_ROUTE);

    exercises.on('child_added', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_changed', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_removed', async () => {
      await updateExercises(this.store);
    });

    workoutCategories.on('child_added', async () => {
      await updateWorkoutCategories(this.store);
    });

    workoutCategories.on('child_changed', async () => {
      await updateWorkoutCategories(this.store);
    });

    workoutCategories.on('child_removed', async () => {
      await updateWorkoutCategories(this.store);
    });
  }
}
