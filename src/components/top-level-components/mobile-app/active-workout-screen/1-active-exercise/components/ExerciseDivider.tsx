import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Divider, Grid, ListItemIcon } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import LinkIcon from '@material-ui/icons/Link';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    itemIcon: {
      height: 0,
      width: '15vh',
      marginRight: 8,
    },
    item: {
      marginTop: -12,
    },
    linkIcon: {
      marginLeft: 8,
      height: 22,
    },
  })
);

export default function ExerciseDivider(): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemIcon className={classes.itemIcon} />
      <ListItemText
        disableTypography
        className={classes.item}
        primary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item xs={10}>
              <Divider variant={'fullWidth'} />
            </Grid>
            <Grid item xs={2} container alignItems={'center'}>
              <LinkIcon className={classes.linkIcon} />
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}
