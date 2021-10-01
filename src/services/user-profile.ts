import firebase from 'firebase';
import {
  loadUserInfo,
  setupNewUser,
  toggleUserProfileDialog,
} from '../creators/user-info';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import { userProfileSnapToVO } from '../utils/vo-builder';
import { USER_PROFILES_ROUTE } from '../configs/constants/firebase-routes';
import { UserProfileVO, UserProfileDAO } from 'workout-app-common-core';
import { ProfileDialogState } from '../components/top-level-components/profile-screen/ProfileDialog';

export const createNewUserProfile = async (
  profile: ProfileDialogState
): Promise<void> => {
  const ref = firebase.database().ref(USER_PROFILES_ROUTE);
  const newRef = ref.push();
  const newWeight = {
    id: uuidv4(),
    weight: profile.weight,
    lastUpdatedOn: new Date().toISOString(),
  };

  const newUserProfile = new UserProfileDAO(
    uuidv4(),
    profile.email,
    profile.icon,
    profile.displayName,
    profile.height,
    [newWeight],
    profile.dateOfBirth,
    new Date().toISOString(),
    []
  );

  return await newRef.set(newUserProfile, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

// export const saveWorkoutForUser =
//   (): ThunkAction<void, State, void, AnyAction> =>
//     async (dispatch: Dispatch, getState: () => State): Promise<void> => {
//
//     };

export interface UpdateUserProfileProps {
  weightChange: boolean;
  updatedUserProfile: ProfileDialogState;
  originalUserProfile: UserProfileVO;
}

export const updateUserProfile = async (
  props: UpdateUserProfileProps
): Promise<void> => {
  const originalUserProfile = props.originalUserProfile;
  const updatedUserProfile = props.updatedUserProfile;
  let weights = originalUserProfile.weights;

  if (props.weightChange) {
    weights = [
      ...weights,
      {
        id: uuidv4(),
        weight: updatedUserProfile.weight,
        lastUpdatedOn: new Date().toISOString(),
      },
    ];
  }

  return await firebase
    .database()
    .ref(USER_PROFILES_ROUTE)
    .child(originalUserProfile.firebaseId)
    .update(
      {
        profileIcon: updatedUserProfile.icon,
        displayName: updatedUserProfile.displayName,
        height: {
          feet: updatedUserProfile.height.feet,
          inches: updatedUserProfile.height.inches,
        },
        dateOfBirth: updatedUserProfile.dateOfBirth,
        lastUpdatedOn: new Date().toISOString(),
        weights: weights,
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

export const getUserProfile =
  (email: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch): Promise<void> => {
    return await firebase
      .database()
      .ref(USER_PROFILES_ROUTE)
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then((snapshot) => {
        if (snapshot.val()) {
          const userProfile = userProfileSnapToVO(snapshot.val());
          dispatch(loadUserInfo(userProfile[0]));
          return;
        } else {
          dispatch(toggleUserProfileDialog(true));
          dispatch(setupNewUser(email));
          return;
        }
      });
  };
