import React from 'react';
import { render } from '@testing-library/react';
import PerSideAdornment from './PerSideAdornment';

describe('Per Side Adornment Component', () => {
  it('should render with reps title', () => {
    const component = render(
      <PerSideAdornment fontColor={'#ddd'} setType={'reps'} />
    );

    expect(component.getByTestId('per-side-set-type-title')).toHaveTextContent(
      'reps'
    );
    expect(component.getByTestId('per-side-divider')).toHaveTextContent('/');
    expect(component.getByTestId('per-side-adornment-component')).toHaveStyle(
      `color: rgb(221, 221, 221)`
    );
    expect(component.getByTestId('per-side-text')).toHaveTextContent('side');
  });

  it('should render with sec title', () => {
    const component = render(
      <PerSideAdornment fontColor={'#eee'} setType={'duration'} />
    );

    expect(component.getByTestId('per-side-set-type-title')).toHaveTextContent(
      'sec'
    );
    expect(component.getByTestId('per-side-divider')).toHaveTextContent('/');
    expect(component.getByTestId('per-side-text')).toHaveTextContent('side');
  });
});
