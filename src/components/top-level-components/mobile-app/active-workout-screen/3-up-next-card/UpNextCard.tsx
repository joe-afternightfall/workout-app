import React from 'react';
import {
  Grid,
  Card,
  Divider,
  Typography,
  ListItemText,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import barbellIcon from '../../../../../configs/icons/barbell.gif';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
  })
);

export default function UpNextCard(props: UpNextCardProps): JSX.Element {
  const classes = useStyles();

  return (
    <Card>
      <Grid item xs={12} container>
        <Grid item xs={12}>
          <Typography color={'textPrimary'} variant={'body1'}>
            {'Up Next'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={'textPrimary'} variant={'body1'}>
            {'Burpee'}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={'textSecondary'} variant={'body2'}>
            {'10 reps | 8 reps | 6 reps | 4 reps'}
          </Typography>
        </Grid>
        <Grid item xs={12} container alignItems={'center'}>
          <img
            style={{ height: 18, marginTop: 6 }}
            src={barbellIcon}
            alt={'barbell'}
          />
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems={'center'}
          style={{ marginTop: -4 }}
        >
          <Grid item xs={10}>
            <Divider variant={'fullWidth'} />
          </Grid>
          <Grid item xs={2} container alignItems={'center'}>
            <LinkIcon style={{ marginLeft: 8 }} />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ListItemText
            primary={'Mountain Climbers'}
            secondary={'20 reps | 18 reps | 16 reps | 14 reps'}
          />
        </Grid>
      </Grid>
    </Card>
  );
}

export interface UpNextCardProps {
  DELETE_ME?: undefined;
}
