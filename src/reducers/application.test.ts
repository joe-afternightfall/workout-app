import application, { ApplicationState } from './application';
import { ActionTypes } from '../creators/actions';
import { buildWorkoutEquipment } from '../configs/test-utils/test-vo-builder';

describe('Application Reducer', () => {
  // it('should update current location', () => {
  //   const state = application.reducer(undefined, {
  //     type: '@@router/LOCATION_CHANGE',
  //     payload: {
  //       location: {
  //         pathname: '/testing-pathname',
  //       },
  //     },
  //   });
  //
  //   expect(state.currentLocation).toBe('/testing-pathname');
  // });
  //
  // it('should return empty object', () => {
  //   const state = application.reducer(undefined, {
  //     type: 'TESTING',
  //   });
  //
  //   expect(state).toEqual({});
  // });

  it('should return VALIDATED_USER', function () {
    const state = application.reducer({} as unknown as ApplicationState, {
      type: ActionTypes.VALIDATED_USER,
      email: 'test-email',
    });
    expect(state.userIsValidated).toEqual(true);
    expect(state.userEmail).toEqual('test-email');
  });

  it('should return SETUP_NEW_USER action', function () {
    const state = application.reducer({} as unknown as ApplicationState, {
      type: ActionTypes.SETUP_NEW_USER,
      email: 'test-email',
    });
    expect(state.setupNewUser).toEqual(true);
    expect(state.userEmail).toEqual('test-email');
  });

  // it('should return LOAD_USER_INFO action', function () {
  //   const state = application.reducer({} as unknown as ApplicationState, {
  //     type: ActionTypes.LOAD_USER_INFO,
  //     email: 'test-email',
  //   });
  //   expect(state.setupNewUser).toEqual(false);
  //   expect(state.openUserProfileDialog).toEqual(false);
  // });

  it('should return LOAD_WORKOUT_EQUIPMENT action', function () {
    const state = application.reducer(
      {
        workoutConfigurations: {
          workoutEquipment: [],
        },
      } as unknown as ApplicationState,
      {
        type: ActionTypes.LOAD_WORKOUT_EQUIPMENT,
        workoutEquipment: buildWorkoutEquipment(3),
      }
    );

    expect(state.workoutConfigurations.workoutEquipment.length).toEqual(3);
  });
});
