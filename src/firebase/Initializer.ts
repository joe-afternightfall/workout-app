import { Store } from 'redux';
import firebase from 'firebase';
import { updateExercises } from './update-methods/update-exercises';
import { updateMuscleGroups } from './update-methods/update-muscle-groups';

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

    const exercises = firebase.database().ref('/exercises');
    const muscleGroups = firebase.database().ref('/muscle-groups');

    exercises.on('child_added', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_changed', async () => {
      await updateExercises(this.store);
    });

    exercises.on('child_removed', async () => {
      await updateExercises(this.store);
    });

    muscleGroups.on('child_added', async () => {
      await updateMuscleGroups(this.store);
    });

    muscleGroups.on('child_changed', async () => {
      await updateMuscleGroups(this.store);
    });

    muscleGroups.on('child_removed', async () => {
      await updateMuscleGroups(this.store);
    });
  }
}
