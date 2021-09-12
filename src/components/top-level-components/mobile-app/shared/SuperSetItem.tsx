import clsx from 'clsx';
import React from 'react';
import LinkDivider from './LinkDivider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItemIcon, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    listItemRoot: {
      padding: 0,
    },
    exerciseIcon: {
      height: '13vh',
      margin: 'auto',
    },
    itemIconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '13vh',
      height: '13vh',
    },
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    secondaryTitle: {
      paddingTop: 4,
    },
    textWrapper: {
      paddingLeft: 12,
    },
    bottomListItemRoot: {
      padding: 0,
      marginTop: -16,
    },
    upNextHighlight: {
      color: '#ED440B',
    },
  })
);

export default function SuperSetItem(props: SuperSetItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <div>
      <ListItem className={classes.listItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          {props.firstExerciseIcon}
        </ListItemIcon>
        <ListItemText
          className={classes.textWrapper}
          disableTypography
          primary={
            props.upNextTitle ? (
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
                    {props.firstExerciseTitle}
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Typography
                variant={'body1'}
                color={'textPrimary'}
                className={classes.title}
              >
                {props.firstExerciseTitle}
              </Typography>
            )
          }
          secondary={
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item container alignItems={'center'}>
                <Grid item>{props.firstEquipmentIcon}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  className={clsx({
                    [classes.secondaryTitle]: !props.upNextTitle,
                  })}
                  variant={'body2'}
                  color={'textSecondary'}
                >
                  {props.firstExerciseRepsAndSets}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>

      <LinkDivider />

      <ListItem className={classes.bottomListItemRoot}>
        <ListItemIcon className={classes.itemIconWrapper}>
          {props.secondExerciseIcon}
        </ListItemIcon>
        <ListItemText
          className={classes.textWrapper}
          disableTypography
          primary={
            <Typography
              variant={'body1'}
              color={'textPrimary'}
              className={
                props.upNextTitle ? classes.upNextTitle : classes.title
              }
            >
              {props.secondExerciseTitle}
            </Typography>
          }
          secondary={
            <Grid item xs={12} container alignItems={'center'}>
              <Grid item container alignItems={'center'}>
                <Grid item>{props.secondEquipmentIcon}</Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant={'body2'} color={'textSecondary'}>
                  {props.secondExerciseRepsAndSets}
                </Typography>
              </Grid>
            </Grid>
          }
        />
      </ListItem>
    </div>
  );
}

export interface SuperSetItemProps {
  upNextTitle?: boolean;
  firstExerciseTitle: string;
  firstExerciseRepsAndSets: string;
  firstEquipmentIcon?: JSX.Element;
  firstExerciseIcon?: JSX.Element;
  secondExerciseTitle: string;
  secondExerciseRepsAndSets: string;
  secondEquipmentIcon?: JSX.Element;
  secondExerciseIcon?: JSX.Element;
}
