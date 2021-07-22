import application from './application';
import actions from '../creators/actions';
// import { getStore } from '../configs/test-utils/mock-redux';

describe('Application Reducer', () => {
  it('should update current location', () => {
    const state = application.reducer(undefined, {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/testing-pathname',
        },
      },
    });

    expect(state.currentLocation).toBe('/testing-pathname');
  });

  it('should return empty object', () => {
    const state = application.reducer(undefined, {
      type: 'TESTING',
    });

    expect(state).toEqual({});
  });
});
