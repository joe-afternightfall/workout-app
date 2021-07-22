import firebase from 'firebase';
import { MuscleGroupDAO } from '../configs/models/MuscleGroupDAO';
import { v4 as uuidv4 } from 'uuid';

export const createNewMuscleGroup = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(`/muscle-groups`);
  const newRef = ref.push();

  const muscleGroupDAO = new MuscleGroupDAO(uuidv4(), name);

  return await newRef.set(muscleGroupDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};
