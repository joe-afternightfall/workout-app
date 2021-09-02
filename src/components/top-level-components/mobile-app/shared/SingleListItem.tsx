import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import barbellIcon from '../../../../configs/icons/barbell.gif';
import ListItem from '@material-ui/core/ListItem';
import icon from '../../../../configs/icons/exercises/Bench-press-1.png';

const useStyles = makeStyles(() =>
  createStyles({
    listItemRoot: {
      padding: 0,
    },
    title: {
      fontSize: '1.225rem',
      paddingBottom: '1vh',
    },
    icon: {
      height: '13vh',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
    },
    textWrapper: {
      paddingLeft: 12,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
  })
);

export default function SingleListItem(
  props: SingleListItemProps
): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.listItemRoot}>
      <ListItemIcon className={classes.itemIconWrapper}>
        <img src={icon} alt={'app-logo'} className={classes.icon} />
      </ListItemIcon>
      <ListItemText
        className={classes.textWrapper}
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
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item container alignItems={'center'}>
              <Grid item>
                <img style={{ height: 18 }} src={barbellIcon} alt={'barbell'} />
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
