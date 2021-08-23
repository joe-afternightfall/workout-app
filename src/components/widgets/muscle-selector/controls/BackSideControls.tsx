import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function BackSideControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector inputId={'forearms'} title={'Forearms'} />
      <Selector inputId={'triceps'} title={'Triceps'} />

      <SectionTitle title={'Back'} />
      <Selector inputId={'trapezius'} title={'Trapezius'} />
      <Selector inputId={'lats'} title={'Lats'} />

      <SectionTitle title={'Legs'} />
      <Selector inputId={'calves'} title={'Calves'} />
      <Selector inputId={'hamstrings'} title={'Hamstrings'} />
      <Selector inputId={'glutes'} title={'Glutes'} />
    </div>
  );
}
