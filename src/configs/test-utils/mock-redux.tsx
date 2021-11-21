import React from 'react';
import { Store } from 'redux';
import thunk from 'redux-thunk';
import {
  State,
  createStore as createRealStore,
} from '../../configs/redux/store';
import MockTheme from './mock-theme';
import { Provider } from 'react-redux';
import { createHashHistory, History } from 'history';
import createStore, { MockStore } from 'redux-mock-store';
import { render, RenderResult } from '@testing-library/react';
jest.mock('array-move', () => ({
  arrayMoveImmutable: jest.fn(),
}));

const middleware = [thunk];

export function renderWithTheme(ui: JSX.Element): RenderResult {
  return render(<MockTheme>{ui}</MockTheme>);
}

export function renderWithRedux(ui: JSX.Element, store: Store): RenderResult {
  return render(
    <Provider store={store}>
      <MockTheme>{ui}</MockTheme>
    </Provider>
  );
}

export async function renderAsyncWithRedux(
  ui: JSX.Element,
  store: Store
): Promise<RenderResult> {
  return new Promise((resolve) => {
    const result = render(
      <Provider store={store}>
        <MockTheme>{ui}</MockTheme>
      </Provider>
    );
    setTimeout(() => {
      resolve(result);
    }, 100);
  });
}

export const initialState = {
  applicationState: {},
};

export function getStore(state: State): MockStore {
  return createStore(middleware)({
    ...initialState,
    applicationState: { ...initialState.applicationState, ...state },
  });
}

export function getWorkoutStore(state: State): MockStore {
  return createStore(middleware)({
    workoutState: { ...state },
  });
}

export function getRealStore(): Store {
  const history: History = createHashHistory();
  return createRealStore(history);
}
