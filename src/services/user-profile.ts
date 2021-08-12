import firebase from 'firebase';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../configs/redux/store';
import {
  loadUserInfo,
  setupNewUser,
  toggleUserProfileDialog,
} from '../creators/user-info';
import { UserProfileVO } from '../configs/models/UserProfileVO';
import { USER_PROFILE_ROUTE } from '../configs/constants/firebase-routes';

export const getUserProfile =
  (email: string): ThunkAction<void, State, void, AnyAction> =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    return await firebase
      .database()
      .ref(USER_PROFILE_ROUTE)
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
      weight: userProfile[key].weight,
      dateOfBirth: userProfile[key].dateOfBirth,
      lastUpdatedOn: userProfile[key].lastUpdatedOn,
    };
  });
}
