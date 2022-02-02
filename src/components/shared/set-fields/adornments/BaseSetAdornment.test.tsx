import React from 'react';
import { render } from '@testing-library/react';
import BaseSetAdornment from './BaseSetAdornment';

describe('Base Set Adornment Component', () => {
  it('should render with weight title', () => {
    const component = render(
      <BaseSetAdornment
        alternateSides={false}
        setType={'weight'}
        fontColor={'#000'}
      />
    );

    expect(component.getByTestId('adornment-title')).toHaveTextContent('lb');
    expect(component.getByTestId('adornment-title')).toHaveStyle(
      `color: rgb(0, 0, 0)`
    );
  });

  it('should render with duration title', () => {
    const component = render(
      <BaseSetAdornment
        alternateSides={false}
        setType={'duration'}
        fontColor={'#fff'}
      />
    );

    expect(component.getByTestId('adornment-title')).toHaveTextContent('sec');
    expect(component.getByTestId('adornment-title')).toHaveStyle(
      `color: rgb(255, 255, 255)`
    );
  });

  it('should render with reps title', () => {
    const component = render(
      <BaseSetAdornment
        alternateSides={false}
        setType={'reps'}
        fontColor={'#333'}
      />
    );

    expect(component.getByTestId('adornment-title')).toHaveTextContent('reps');
    expect(component.getByTestId('adornment-title')).toHaveStyle(
      `color: rgb(51, 51, 51)`
    );
  });

  it('should render with alternate sides title', () => {
    const component = render(
      <BaseSetAdornment
        alternateSides={true}
        setType={'reps'}
        fontColor={'#333'}
      />
    );

    expect(
      component.getByTestId('per-side-adornment-component')
    ).toBeInTheDocument();
  });
});
