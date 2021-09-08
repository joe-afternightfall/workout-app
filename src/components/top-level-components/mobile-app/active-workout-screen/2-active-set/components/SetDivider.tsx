import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '0%',
    },
    divider: {
      width: 2,
      height: '75%',
    },
  })
);

export default function SetDivider(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      item
      container
      alignItems={'center'}
      justify={'center'}
      className={classes.root}
    >
      <Divider orientation={'vertical'} className={classes.divider} />
    </Grid>
  );
}
