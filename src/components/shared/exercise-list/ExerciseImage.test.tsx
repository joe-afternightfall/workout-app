import React from 'react';
import {
  getStore,
  renderWithRedux,
} from '../../../configs/test-utils/mock-redux';
import ExerciseImage from './ExerciseImage';
import { State } from '../../../configs/redux/store';
import { chance } from 'jest-chance';

describe('Exercise Image Component', () => {
  it('should render', () => {
    const folder = chance.string();
    const image = chance.string();

    const store = getStore({
      workoutConfigurations: {
        exerciseImages: [
          {
            name: chance.string(),
            downloadUrls: [chance.string(), chance.string(), chance.string()],
          },
          {
            name: folder,
            downloadUrls: [chance.string(), image, chance.string()],
          },
          {
            name: chance.string(),
            downloadUrls: [chance.string(), chance.string(), chance.string()],
          },
        ],
      },
    } as unknown as State);

    const component = renderWithRedux(
      <ExerciseImage folder={folder} image={image} />,
      store
    );

    expect(component.getByAltText(folder));
  });
});
