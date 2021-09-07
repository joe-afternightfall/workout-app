import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function ActiveCircuitSet(props: ActiveCircuitSetProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <p>functional comp</p>
    </div>
  );
}

export interface ActiveCircuitSetProps {
  DELETE_ME?: undefined;
}
