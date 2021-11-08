import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { AppTheme } from '../../../configs/theme/app-theme';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    title: {
      fontSize: '1.125rem',
      paddingBottom: '1vh',
    },
    upNextTitle: {
      fontSize: '1rem',
    },
    upNextHighlight: {
      color: theme.palette.custom.colors.active,
    },
  })
);

export default function SetTitle(props: SetTitleProps): JSX.Element {
  const classes = useStyles();
  const { upNextCard, displayUpNextTitle, bottomListItem, exerciseName } =
    props;

  return displayUpNextTitle ? (
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
          {exerciseName}
        </Typography>
      </Grid>
    </Grid>
  ) : (
    <Typography
      variant={'body1'}
      color={'textPrimary'}
      className={
        bottomListItem && upNextCard ? classes.upNextTitle : classes.title
      }
    >
      {exerciseName}
    </Typography>
  );
}

interface SetTitleProps {
  upNextCard?: boolean;
  exerciseName?: string;
  bottomListItem?: boolean;
  displayUpNextTitle?: boolean;
}
