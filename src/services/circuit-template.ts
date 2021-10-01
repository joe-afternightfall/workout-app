import firebase from 'firebase';
import { circuitTemplateSnapToVO } from '../utils/vo-builder';
import { CircuitTemplateVO } from 'workout-app-common-core';
import { CIRCUIT_TEMPLATES_ROUTE } from '../configs/constants/firebase-routes';

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
