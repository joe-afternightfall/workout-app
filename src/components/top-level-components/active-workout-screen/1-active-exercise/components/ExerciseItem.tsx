import clsx from 'clsx';
import React from 'react';
import {
  ListItem,
  Typography,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExerciseImage from '../../../../shared/exercise-list/ExerciseImage';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 0,
    },
    bottom: {
      marginTop: -16,
    },
    exerciseIcon: {
      width: '15vh',
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
  const { bottom, info } = props;

  return (
    <ListItem
      className={clsx(classes.root, {
        [classes.bottom]: bottom,
      })}
    >
      <ListItemIcon className={classes.exerciseIcon}>
        <ExerciseImage
          folder={info.exerciseIcon}
          image={`${info.exerciseIcon}-exercise.gif`}
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
            {info.title}
          </Typography>
        }
      />
    </ListItem>
  );
}

interface ExerciseItemProps {
  bottom: boolean;
  info: {
    title: string;
    exerciseIcon: string;
  };
}
