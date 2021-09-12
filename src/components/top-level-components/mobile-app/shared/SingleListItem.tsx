import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    bottomRoot: {
      padding: 0,
      marginTop: -16,
    },
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
      height: '13vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
    secondaryTitle: {
      paddingTop: 4,
    },
    upNextHighlight: {
      color: '#ED440B',
    },
  })
);

export default function SingleListItem(
  props: SingleListItemProps
): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem
      className={props.bottomListItem ? classes.bottomRoot : classes.root}
    >
      <ListItemIcon className={classes.itemIconWrapper}>
        {props.exerciseIcon}
      </ListItemIcon>
      <ListItemText
        className={classes.textWrapper}
        disableTypography
        primary={
          props.displayUpNextTitle ? (
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextHighlight}
                >
                  {'Up Next'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant={'body1'}
                  color={'textPrimary'}
                  className={classes.upNextTitle}
                >
                  {props.exerciseTitle}
                </Typography>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={
                props.bottomListItem && props.upNextCard
                  ? classes.upNextTitle
                  : classes.title
              }
            >
              {props.exerciseTitle}
            </Typography>
          )
        }
        secondary={
          <Grid item xs={12} container alignItems={'center'}>
            <Grid item container alignItems={'center'}>
              <Grid item>{props.equipmentIcon}</Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant={'body2'}
                color={'textSecondary'}
                className={clsx({
                  [classes.secondaryTitle]: !props.equipmentIcon,
                })}
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
  displayUpNextTitle?: boolean;
  bottomListItem?: boolean;
  upNextCard?: boolean;
  exerciseTitle: string;
  repsAndSets: string;
  equipmentIcon?: JSX.Element;
  exerciseIcon?: JSX.Element;
}
