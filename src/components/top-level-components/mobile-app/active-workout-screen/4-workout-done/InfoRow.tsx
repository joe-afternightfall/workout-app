import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { AppTheme } from '../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
    textHighlight: {
      color: theme.palette.custom.colors.active,
    },
  })
);

export default function InfoRow({ stat, title }: InfoRowProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid item xs={4} container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant={'h4'} className={classes.textHighlight}>
          {stat}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={'caption'} color={'textSecondary'}>
          {title}
        </Typography>
      </Grid>
    </Grid>
  );
}

export interface InfoRowProps {
  stat: string;
  title: string;
}
