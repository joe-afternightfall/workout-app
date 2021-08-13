import firebase from 'firebase';
import { v4 as uuidv4 } from 'uuid';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import {
  loadUserInfo,
  setupNewUser,
  toggleUserProfileDialog,
} from '../creators/user-info';
import { UserProfileVO } from '../configs/models/UserProfileVO';
import { USER_PROFILES_ROUTE } from '../configs/constants/firebase-routes';
import { UserProfileDAO } from '../configs/models/UserProfileDAO';
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
    new Date().toISOString()
  );

  return await newRef.set(newUserProfile, (error: Error | null) => {
    if (error) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  });
};

export const getUserProfile =
  (email: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    return await firebase
      .database()
      .ref(USER_PROFILES_ROUTE)
      .orderByChild('email')
      .equalTo(email)
      .once('value')
      .then((snapshot) => {
        console.log('snapshot-value: ' + JSON.stringify(snapshot));
        if (snapshot.val()) {
          const userProfile = buildVO(snapshot.val());
          dispatch(loadUserInfo(userProfile[0]));
          return;
        } else {
          console.log('INSIDE_NULL');
          dispatch(toggleUserProfileDialog(true));
          dispatch(setupNewUser(email));
          return;
        }
      });
    // .catch((error: Error) => {
    //   console.log('error: ' + JSON.stringify(error));
    // });
  };

function buildVO(userProfile: any): UserProfileVO[] {
  return Object.keys(userProfile).map((key: string) => {
    return {
      firebaseId: key,
      id: userProfile[key].id,
      email: userProfile[key].email,
      profileIcon: userProfile[key].profileIcon,
      displayName: userProfile[key].displayName,
      height: userProfile[key].height,
      weights: userProfile[key].weights,
      dateOfBirth: userProfile[key].dateOfBirth,
      lastUpdatedOn: userProfile[key].lastUpdatedOn,
    };
  });
}
