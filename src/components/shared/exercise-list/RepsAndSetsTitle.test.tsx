import React from 'react';
import { render } from '@testing-library/react';
import RepsAndSetsTitle from './RepsAndSetsTitle';
import { buildMultipleMockExerciseSets } from '../../../configs/test-utils/test-vo-builder';

describe('Reps and Sets Title component', () => {
  it('should render', () => {
    const component = render(
      <RepsAndSetsTitle sets={buildMultipleMockExerciseSets(3)} />
    );

    expect(component.getByTestId('reps-and-sets-title')).toBeInTheDocument();
  });
});
