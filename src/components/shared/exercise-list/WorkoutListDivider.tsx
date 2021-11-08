import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 4,
      width: '100%',
      backgroundColor: '#2c2c2c',
    },
  })
);

export default function WorkoutListDivider(): JSX.Element {
  const classes = useStyles();
  return <ListItem className={classes.root} />;
}
