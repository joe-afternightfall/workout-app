import { Store } from 'redux';
import firebase from 'firebase';
import {
  EXERCISE_TYPES_ROUTE,
  CIRCUIT_TYPES_ROUTE,
  WORKOUTS_ROUTE,
  CIRCUIT_TEMPLATES_ROUTE,
} from '../configs/constants/firebase-routes';
import {
  updateExerciseTypes,
  updateCircuitTypes,
  updateUserWorkouts,
  updateCircuitTemplates,
} from './update-methods';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCxpOEet-ONYFVLUNdagd7o0McN3F2fFRc',
  authDomain: 'workout-app-d4f5d.firebaseapp.com',
  databaseURL: 'https://workout-app-d4f5d-default-rtdb.firebaseio.com',
  projectId: 'workout-app-d4f5d',
  storageBucket: 'workout-app-d4f5d.appspot.com',
  messagingSenderId: '1035531799240',
  appId: '1:1035531799240:web:4dc51e62371cc2786eb3fd',
  measurementId: 'G-BC1XM8ERB0',
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
    const circuitTypes = firebase.database().ref(CIRCUIT_TYPES_ROUTE);
    const workouts = firebase.database().ref(WORKOUTS_ROUTE);
    const circuitTemplates = firebase.database().ref(CIRCUIT_TEMPLATES_ROUTE);

    exerciseTypes.on('child_added', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_changed', async () => {
      await updateExerciseTypes(this.store);
    });

    exerciseTypes.on('child_removed', async () => {
      await updateExerciseTypes(this.store);
    });

    circuitTypes.on('child_added', async () => {
      await updateCircuitTypes(this.store);
    });

    circuitTypes.on('child_changed', async () => {
      await updateCircuitTypes(this.store);
    });

    circuitTypes.on('child_removed', async () => {
      await updateCircuitTypes(this.store);
    });

    workouts.on('child_added', async () => {
      await updateUserWorkouts(this.store);
    });

    workouts.on('child_changed', async () => {
      await updateUserWorkouts(this.store);
    });

    workouts.on('child_removed', async () => {
      await updateUserWorkouts(this.store);
    });

    circuitTemplates.on('child_added', async () => {
      await updateCircuitTemplates(this.store);
    });

    circuitTemplates.on('child_changed', async () => {
      await updateCircuitTemplates(this.store);
    });

    circuitTemplates.on('child_removed', async () => {
      await updateCircuitTemplates(this.store);
    });
  }
}
