import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import barbellIcon from '../../../../configs/icons/barbell.gif';
import ListItem from '@material-ui/core/ListItem';
import icon from '../../../../configs/icons/exercises/bench-press-barbell.png';

const useStyles = makeStyles(() =>
  createStyles({
    listItemRoot: {
      padding: 0,
    },
    title: {
      fontSize: '1.225rem',
      paddingBottom: '1vh',
    },
    exerciseIcon: {
      height: '13vh',
      margin: 'auto',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
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
        {props.exerciseIcon}
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
  equipmentIcon: JSX.Element;
  exerciseIcon: JSX.Element;
}