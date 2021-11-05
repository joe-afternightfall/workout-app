import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, ListItem, ListItemText, Typography } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      background: '#222222',
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

interface CategoryHeaderProps {
  title: string;
}
