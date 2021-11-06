import firebase from 'firebase/app';
import 'firebase/database';
import { circuitTemplateSnapToVO } from '../utils/vo-builder';
import { CIRCUIT_TEMPLATES_ROUTE } from '../configs/constants/firebase-routes';
import { CircuitTemplateVO } from '../configs/old-models/CircuitTemplateVO';

export const getCircuitTemplates = async (): Promise<CircuitTemplateVO[]> => {
  return await firebase
    .database()
    .ref(CIRCUIT_TEMPLATES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return circuitTemplateSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};
