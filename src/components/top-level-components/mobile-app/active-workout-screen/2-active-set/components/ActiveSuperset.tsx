import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function ActiveSuperset(props: ActiveSupersetProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <p>functional comp</p>
    </div>
  );
}

export interface ActiveSupersetProps {
  DELETE_ME?: undefined;
}
