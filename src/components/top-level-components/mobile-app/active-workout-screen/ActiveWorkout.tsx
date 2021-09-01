import React from 'react';
import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Typography,
  ListItemText,
  Slide,
  Toolbar,
  AppBar,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import barbellIcon from '../../../../configs/icons/barbell.gif';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { DASHBOARD_SCREEN_PATH } from '../../../../configs/constants/app';
import { routerActions } from 'connected-react-router';
import SuperSetItem from '../shared/SuperSetItem';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '10vh',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    gridWrapper: {
      height: '100%',
    },
  })
);

const ActiveWorkout = (props: ActiveWorkoutProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid style={{ height: '100%' }}>
      <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
        <div>
          <AppBar position={'absolute'}>
            <Toolbar className={classes.toolbar}>
              <Grid
                container
                className={classes.gridWrapper}
                alignItems={'center'}
              >
                <Grid item xs={2}>
                  <Button onClick={props.exitClickHandler}>{'exit'}</Button>
                </Grid>

                <Grid
                  item
                  xs={8}
                  container
                  justify={'center'}
                  alignItems={'center'}
                >
                  <Grid item>
                    <Typography variant={'overline'}>{'1/10'}</Typography>
                  </Grid>
                </Grid>

                <Grid item xs={2} />
              </Grid>
            </Toolbar>
          </AppBar>

          <div className={classes.toolbar} />

          <Grid
            container
            direction={'column'}
            alignItems={'stretch'}
            justify={'space-around'}
          >
            <Grid item xs={12} container>
              <SuperSetItem
                firstExerciseTitle={'Mountain Climbers'}
                firstExerciseRepsAndSets={'10 reps | 8 reps | 6 reps | 4 reps'}
                // firstExerciseIcon={}
                secondExerciseTitle={'Jumping Jacks'}
                secondExerciseRepsAndSets={
                  '20 reps | 38 reps | 46 reps | 54 reps'
                }
                // secondExerciseIcon={}
              />
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
        </div>
      </Slide>
    </Grid>
  );
};

export interface ActiveWorkoutProps {
  exitClickHandler: () => void;
}

const mapStateToProps = (): ActiveWorkoutProps => {
  return {} as unknown as ActiveWorkoutProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ActiveWorkoutProps =>
  ({
    exitClickHandler: () => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
    },
  } as unknown as ActiveWorkoutProps);

export default connect(mapStateToProps, mapDispatchToProps)(ActiveWorkout);
