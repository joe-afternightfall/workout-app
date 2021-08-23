import React from 'react';
import Selector from './components/Selector';
import SectionTitle from './components/SectionTitle';

export default function FrontSideControls(): JSX.Element {
  return (
    <div>
      <SectionTitle title={'Arms'} />
      <Selector inputId={'biceps'} title={'Biceps'} />
      <Selector inputId={'deltoids'} title={'Deltoids'} />

      <SectionTitle title={'Core'} />
      <Selector inputId={'abs'} title={'Abs'} />
      <Selector inputId={'obliques'} title={'Obliques'} />
      <Selector inputId={'pectorals'} title={'Pectorals'} />

      <SectionTitle title={'Legs'} />
      <Selector inputId={'adductors'} title={'Adductors'} />
      <Selector inputId={'quads'} title={'Quads'} />
    </div>
  );
}
