import { Store } from 'redux';
import firebase from 'firebase';
import {
  CATEGORY_TYPES_ROUTE,
  EXERCISE_TYPES_ROUTE,
  CIRCUIT_TYPES_ROUTE,
} from '../configs/constants/firebase-routes';
import { updateExerciseTypes } from './update-methods/exercise-types';
import { updateCategoryTypes } from './update-methods/category-types';

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

    const exerciseTypes = firebase.database().ref(EXERCISE_TYPES_ROUTE);
    const categoryTypes = firebase.database().ref(CATEGORY_TYPES_ROUTE);
    const circuitTypes = firebase.database().ref(CIRCUIT_TYPES_ROUTE);

    exerciseTypes.on('child_added', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_changed', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_removed', async () => {
      await updateExerciseTypes(this.store);
    });

    categoryTypes.on('child_added', async () => {
      await updateCategoryTypes(this.store);
    });

    categoryTypes.on('child_changed', async () => {
      await updateCategoryTypes(this.store);
    });

    categoryTypes.on('child_removed', async () => {
      await updateCategoryTypes(this.store);
    });

    circuitTypes.on('child_added', async () => {
      await updateExerciseTypes(this.store);
    });

    circuitTypes.on('child_changed', async () => {
      await updateExerciseTypes(this.store);
    });

    circuitTypes.on('child_removed', async () => {
      await updateExerciseTypes(this.store);
    });
  }
}
