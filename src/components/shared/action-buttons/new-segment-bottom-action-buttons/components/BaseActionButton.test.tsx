import React from 'react';
import { chance } from 'jest-chance';
import BaseActionButton from './BaseActionButton';
import { render } from '@testing-library/react';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

describe('Base Action Button component', () => {
  it('should render with title and element', () => {
    const buttonTitle = chance.string({ alpha: true });
    const mockClickHandler = jest.fn();

    const component = render(
      <BaseActionButton
        icon={FitnessCenterIcon}
        buttonTitle={buttonTitle}
        clickHandler={mockClickHandler}
      />
    );

    expect(
      component.container.querySelector(`#${buttonTitle}-icon`)
    ).toBeInTheDocument();
    expect(component.getByText(buttonTitle)).toBeInTheDocument();

    component.getByTestId(`${buttonTitle}-button`).click();
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
