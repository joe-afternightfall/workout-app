import React, { ChangeEvent } from 'react';
import { TextField } from '@material-ui/core';
import { NUMBERS_ONLY_REGEX } from '../../configs/constants/app';

export default function NumbersTextField(
  props: NumbersTextFieldProps
): JSX.Element {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (NUMBERS_ONLY_REGEX.test(event.target.value)) {
      props.changeHandler(event);
    }
  };

  return (
    <TextField
      fullWidth
      name={props.name}
      variant={'outlined'}
      value={props.value}
      label={props.label}
      onChange={handleChange}
    />
  );
}

export interface NumbersTextFieldProps {
  name: string;
  value: string;
  label?: string;
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
