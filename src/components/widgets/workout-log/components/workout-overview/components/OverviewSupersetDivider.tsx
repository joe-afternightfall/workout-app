import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      marginTop: 12,
      marginBottom: 12,
    },
    dividerWrapper: {
      width: '40%',
    },
    linkWrapper: {
      width: '20%',
    },
  })
);

export default function OverviewSupersetDivider(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={12} container alignItems={'center'} className={classes.root}>
      <Grid item className={classes.dividerWrapper}>
        <Divider />
      </Grid>
      <Grid
        item
        container
        justify={'center'}
        alignItems={'center'}
        className={classes.linkWrapper}
      >
        <LinkIcon fontSize={'large'} style={{ opacity: 0.8 }} />
      </Grid>
      <Grid item className={classes.dividerWrapper}>
        <Divider />
      </Grid>
    </Grid>
  );
}
