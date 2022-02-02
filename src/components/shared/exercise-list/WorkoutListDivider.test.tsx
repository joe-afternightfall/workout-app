import React from 'react';
import { render } from '@testing-library/react';
import WorkoutListDivider from './WorkoutListDivider';

describe('Workout List Divider Component', () => {
  it('should render with id', () => {
    const component = render(<WorkoutListDivider />);

    expect(component.getByTestId('workout-list-divider')).toBeInTheDocument();
  });
});
