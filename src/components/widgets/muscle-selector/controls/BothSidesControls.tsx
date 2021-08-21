import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function BothSidesControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector inputId={'biceps'} title={'Biceps'} />
      <Selector inputId={'deltoids'} title={'Deltoids'} />
      <Selector inputId={'forearms'} title={'Forearms'} />
      <Selector inputId={'triceps'} title={'Triceps'} />

      <SectionTitle title={'BackManikin'} />
      <Selector inputId={'trapezius'} title={'Trapezius'} />
      <Selector inputId={'lats'} title={'Lats'} />

      <SectionTitle title={'Core'} />
      <Selector inputId={'abs'} title={'Abs'} />
      <Selector inputId={'obliques'} title={'Obliques'} />
      <Selector inputId={'pectorals'} title={'Pectorals'} />

      <SectionTitle title={'Legs'} />
      <Selector inputId={'adductors'} title={'Adductors'} />
      <Selector inputId={'calves'} title={'Calves'} />
      <Selector inputId={'hamstrings'} title={'Hamstrings'} />
      <Selector inputId={'glutes'} title={'Glutes'} />
      <Selector inputId={'quads'} title={'Quads'} />
    </div>
  );
}
