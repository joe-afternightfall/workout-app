import firebase from 'firebase';
import { circuitTypeSnapToVO } from '../../utils/vo-builder';
import { CIRCUIT_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { CircuitTypeVO } from '../../configs/old-models/CircuitTypeVO';

export const getAllCircuitTypes = async (): Promise<CircuitTypeVO[]> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return circuitTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};
