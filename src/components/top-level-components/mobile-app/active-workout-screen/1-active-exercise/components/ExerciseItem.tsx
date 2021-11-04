import clsx from 'clsx';
import React from 'react';
import {
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
    },
    title: {
      fontSize: '1.225rem',
      paddingBottom: '1vh',
    },
    textWrapper: {
      paddingLeft: 12,
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
      <ListItemIcon>
        <img
          alt={'exercise-icon'}
          src={'images/barbell-upright-row.gif'}
          className={classes.exerciseIcon}
        />
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
