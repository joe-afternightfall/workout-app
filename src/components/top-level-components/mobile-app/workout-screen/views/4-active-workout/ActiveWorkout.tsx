import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import barbellIcon from '../../../../../../configs/icons/barbell.gif';
import LinkIcon from '@material-ui/icons/Link';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() => createStyles({}));

export default function ActiveWorkout(props: ActiveWorkoutProps): JSX.Element {
  const classes = useStyles();

  return (
    <Grid
      container
      direction={'column'}
      alignItems={'stretch'}
      justify={'space-around'}
    >
      <Grid item xs={12} container>
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            style={{ height: '100%', width: 56 }}
          >
            <Grid item>
              <div
                style={{
                  backgroundColor: 'blue',
                  height: 81,
                  width: '100%',
                }}
              />
            </Grid>
            <Grid item>
              <div
                style={{ backgroundColor: 'red', height: 75, width: '100%' }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} style={{ paddingLeft: 16 }}>
          <Grid container>
            <Grid item xs={12} container>
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
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={8}>
            <TextField fullWidth variant={'outlined'} value={'10 reps'} />
            <TextField fullWidth variant={'outlined'} value={'20 reps'} />
          </Grid>
          <Grid item xs={2}>
            <Button>{'Did It'}</Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
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
      </Grid>
    </Grid>
  );
}

export interface ActiveWorkoutProps {
  DELETE_ME?: undefined;
}
