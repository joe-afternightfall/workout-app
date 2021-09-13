import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ListItemIcon, Typography } from '@material-ui/core';
import inclinePressDumbBells from '../../../../../../configs/icons/exercises/dumbells/incline-press-dumbells.png';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import clsx from 'clsx';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    bottom: {
      marginTop: -16,
    },
    exerciseIcon: {
      height: '15vh',
      margin: 'auto',
    },
    title: {
      fontSize: '1.225rem',
      paddingBottom: '1vh',
    },
    textWrapper: {
      paddingLeft: 12,
    },
    iconWrapper: {
      backgroundColor: 'gray',
      padding: 4,
      width: '15vh',
      height: '15vh',
    },
  })
);

export default function ExerciseItem(props: ExerciseItemProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem
      className={clsx(classes.root, {
        [classes.bottom]: props.bottom,
      })}
    >
      <ListItemIcon className={classes.iconWrapper}>
        {/*<img*/}
        {/*  alt={'exercise-icon'}*/}
        {/*  src={inclinePressDumbBells}*/}
        {/*  className={classes.exerciseIcon}*/}
        {/*/>*/}
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
            {props.title}
          </Typography>
        }
      />
    </ListItem>
  );
}

export interface ExerciseItemProps {
  title: string;
  bottom: boolean;
}
