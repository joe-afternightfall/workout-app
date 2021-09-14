import React from 'react';
import LinkIcon from '@material-ui/icons/Link';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider, Grid, ListItemIcon } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    itemIcon: {
      height: 0,
      width: '13.5vh',
      marginRight: 12,
    },
    dividerWrapper: {
      marginTop: -12,
    },
    link: {
      marginLeft: 8,
      height: 22,
    },
  })
);

export default function LinkDivider(props: LinkDividerProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemIcon className={classes.itemIcon} />
      <ListItemText
        disableTypography
        className={classes.dividerWrapper}
        primary={
          <Grid item xs={props.shrink ? 8 : 12} container alignItems={'center'}>
            <Grid item xs={10}>
              <Divider variant={'fullWidth'} />
            </Grid>
            <Grid item xs={2} container alignItems={'center'}>
              <LinkIcon className={classes.link} />
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

export interface LinkDividerProps {
  shrink?: boolean;
}
