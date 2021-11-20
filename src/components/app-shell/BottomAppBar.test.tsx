import React from 'react';
import BottomAppBar from './BottomAppBar';
import { State } from '../../configs/redux/store';
import { getStore, renderWithRedux } from '../../configs/test-utils/mock-redux';
import { DASHBOARD_SCREEN_ID } from '../../configs/constants/app-routing';

describe('Bottom App Bar', () => {
  it('should render', () => {
    const store = getStore({ activePageId: '' } as unknown as State);
    const appBar = renderWithRedux(<BottomAppBar />, store);

    expect(appBar.getByTestId(DASHBOARD_SCREEN_ID)).toBeInTheDocument();

    appBar.getByTestId(DASHBOARD_SCREEN_ID).click();

    expect(store.getActions()).toEqual([
      {
        payload: { args: ['/dashboard'], method: 'push' },
        type: '@@router/CALL_HISTORY_METHOD',
      },
    ]);
  });
});
