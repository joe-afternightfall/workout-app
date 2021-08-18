import React from 'react';

export default function SelectorControls(
  props: SelectorControlsProps
): JSX.Element {
  return (
    <>
      <input
        type={'checkbox'}
        className={`${props.inputId} muscles-helper`}
        id={props.inputId}
        value={' '}
      />

      <label htmlFor={props.inputId}>{props.title}</label>
    </>
  );
}

export interface SelectorControlsProps {
  inputId: string;
  title: string;
}
