import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function WorkoutListDivider(
  props: WorkoutListDividerProps
): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem style={{ width: '100%', padding: 4, backgroundColor: 'black' }} />
  );
}

export interface WorkoutListDividerProps {
  DELETE_ME?: undefined;
}
