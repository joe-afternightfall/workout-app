import React from 'react';
import SetTitle from './SetTitle';
import { chance } from 'jest-chance';
import { renderWithTheme } from '../../../configs/test-utils/mock-redux';

describe('Set Title', () => {
  it('should render with up next title', () => {
    const exerciseName = chance.string();

    const component = renderWithTheme(
      <SetTitle displayUpNextTitle exerciseName={exerciseName} />
    );

    expect(component.getByTestId('up-next-title')).toBeInTheDocument();
    expect(component.getByText('Up Next')).toBeInTheDocument();

    expect(component.getByTestId('up-next-exercise-title')).toBeInTheDocument();
    expect(component.getByText(exerciseName)).toBeInTheDocument();
  });

  it('should render as regular title', () => {
    const exerciseName = chance.string();
    const component = renderWithTheme(<SetTitle exerciseName={exerciseName} />);

    const title = component.getByTestId('regular-title');
    expect(title.classList.value.includes('title')).toEqual(true);
    expect(component.getByText(exerciseName)).toBeInTheDocument();
  });

  it('should render as bottom list item', () => {
    const exerciseName = chance.string();
    const component = renderWithTheme(
      <SetTitle exerciseName={exerciseName} bottomListItem upNextCard />
    );

    const title = component.getByTestId('up-next-title');
    expect(title.classList.value.includes('upNextTitle')).toEqual(true);
    expect(component.getByText(exerciseName)).toBeInTheDocument();
  });
});
