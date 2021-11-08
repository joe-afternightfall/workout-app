import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '5%',
    },
    divider: {
      margin: 'auto',
      width: 2,
    },
  })
);

export default function InfoDivider(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item className={classes.root}>
      <Divider orientation={'vertical'} className={classes.divider} />
    </Grid>
  );
}
