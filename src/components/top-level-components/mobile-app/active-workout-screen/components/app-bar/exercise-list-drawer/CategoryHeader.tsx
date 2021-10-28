import React, { useState } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import { WorkoutTimer } from 'workout-app-common-core';
import {
  Button,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: '#222222',
      // padding: 0,
    },
  })
);

export default function CategoryHeader({
  title,
}: CategoryHeaderProps): JSX.Element {
  const classes = useStyles();

  return (
    <ListItem className={classes.root}>
      <ListItemText
        disableTypography
        primary={
          <Grid container justify={'center'}>
            <Grid item>
              <Typography>{title}</Typography>
            </Grid>
          </Grid>
        }
      />
    </ListItem>
  );
}

export interface CategoryHeaderProps {
  title: string;
}
