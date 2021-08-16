import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { categoryTypeSnapToVO } from '../../utils/vo-builder';
import { CATEGORY_TYPES_ROUTE } from '../../configs/constants/firebase-routes';
import { CategoryTypeDAO } from '../../configs/models/workout-configurations/category-type/CategoryTypeDAO';
import { CategoryTypeVO } from '../../configs/models/workout-configurations/category-type/CategoryTypeVO';

export const createNewCategoryType = async (name: string): Promise<void> => {
  const ref = firebase.database().ref(CATEGORY_TYPES_ROUTE);
  const newRef = ref.push();

  const muscleGroupDAO = new CategoryTypeDAO(uuidv4(), name);

  return await newRef.set(muscleGroupDAO, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getAllCategoryTypes = async (): Promise<CategoryTypeVO[]> => {
  return await firebase
    .database()
    .ref(CATEGORY_TYPES_ROUTE)
    .once('value')
    .then((snapshot) => {
      if (snapshot.val()) {
        return categoryTypeSnapToVO(snapshot.val());
      } else {
        return [];
      }
    });
};

export const updateCategoryType = async (
  firebaseId: string,
  value: string
): Promise<void> => {
  return await firebase
    .database()
    .ref(CATEGORY_TYPES_ROUTE)
    .child(firebaseId)
    .update(
      {
        name: value,
      },
      (error: Error | null) => {
        if (error) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      }
    );
};

export const deleteCategoryType = async (firebaseId: string): Promise<void> => {
  return await firebase
    .database()
    .ref(CATEGORY_TYPES_ROUTE)
    .child(firebaseId)
    .remove((error) => {
      if (error) {
        return Promise.reject();
      } else {
        return Promise.resolve();
      }
    });
};
