import React from 'react';
import { render } from '@testing-library/react';
import NewSegmentBottomActionButtons from './NewSegmentBottomActionButtons';

describe('New Segment Bottom Action Buttons Component', () => {
  it('should render', () => {
    const mockStraightSetClickHandler = jest.fn();
    const mockSuperSetClickHandler = jest.fn();

    const component = render(
      <NewSegmentBottomActionButtons
        straightSetClickHandler={mockStraightSetClickHandler}
        superSetClickHandler={mockSuperSetClickHandler}
      />
    );

    component.getByTestId('+ Exercise-button').click();
    expect(mockStraightSetClickHandler).toHaveBeenCalledTimes(1);

    component.getByTestId('+ Superset-button').click();
    expect(mockSuperSetClickHandler).toHaveBeenCalledTimes(1);
  });
});
