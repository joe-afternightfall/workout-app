import React from 'react';
import TopAppBar from './TopAppBar';
import { render } from '@testing-library/react';
import { chance } from 'jest-chance';

describe('Top App Bar', () => {
  it('should render with title', () => {
    const title = chance.string();
    const topAppBar = render(<TopAppBar title={title} color={'primary'} />);

    expect(topAppBar.getByTestId('top-app-bar-title')).toHaveTextContent(title);
  });
});
