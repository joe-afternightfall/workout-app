import React from 'react';
import {
  getWorkoutStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import SuperSetDivider from './SuperSetDivider';
import { State } from '../../../configs/redux/store';

describe('Super Set Divider Component', () => {
  it('should render as full divider', () => {
    const workoutStore = getWorkoutStore({
      editOptions: {
        open: false,
      },
    } as unknown as State);
    const component = renderWithRedux(<SuperSetDivider />, workoutStore);

    expect(component.getByTestId('super-set-divider')).toBeInTheDocument();
    const wrapper = component.getByTestId('super-set-wrapper');
    expect(wrapper.classList.value.includes('MuiGrid-grid-xs-12')).toEqual(
      true
    );
  });

  it('should render as smaller divider', () => {
    const workoutStore = getWorkoutStore({
      editOptions: {
        open: true,
      },
    } as unknown as State);
    const component = renderWithRedux(<SuperSetDivider />, workoutStore);

    const wrapper = component.getByTestId('super-set-wrapper');
    expect(wrapper.classList.value.includes('MuiGrid-grid-xs-8')).toEqual(true);
  });
});
