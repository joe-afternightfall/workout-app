import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import barbellIcon from '../../../../configs/icons/barbell.gif';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    listItemText: {
      margin: '4px 0',
    },
    title: {
      fontSize: '0.875rem',
    },
    secondaryTitle: {
      fontSize: '0.775rem',
    },
  })
);

export default function SingleListItem(
  props: SingleListItemProps
): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemIcon
        style={{ backgroundColor: 'gray', height: 56, marginRight: 8 }}
      />
      <ListItemText
        disableTypography
        primary={
          <Typography
            variant={'body1'}
            color={'textPrimary'}
            className={classes.title}
          >
            {props.exerciseTitle}
          </Typography>
        }
        className={classes.listItemText}
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item style={{ height: 20 }} container alignItems={'center'}>
              <Grid item style={{ height: 16 }}>
                <img style={{ height: 16 }} src={barbellIcon} alt={'barbell'} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                className={classes.secondaryTitle}
                variant={'body2'}
                color={'textSecondary'}
              >
                {props.repsAndSets}
              </Typography>
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

export interface SingleListItemProps {
  exerciseTitle: string;
  repsAndSets: string;
  // equipmentIcon: JSX.Element;
}
