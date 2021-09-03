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
import LargeSuperSetItem from './components/LargeSuperSetItem';
import UpNextCard from './UpNextCard';
import clsx from 'clsx';

// scrollIntoView(someElement);
const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      height: '8vh',
    },
    toolbarMixin: {
      height: '7vh',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    gridWrapper: {
      height: '100%',
    },
    appBar: {
      backgroundColor: '#ed440b',
    },
    didItButton: {
      width: '100%',
      height: '100%',
      backgroundColor: '#ed440b',
      borderRadius: '0 8px 8px 0',
    },
    textField: {
      fontSize: '5vh',
      backgroundColor: '#ed440b',
      opacity: 0.6,
    },
    bottomTextField: {
      borderRadius: '0 0 0 8px',
    },
    topTextField: {
      borderRadius: '8px 0 0 0',
    },
  })
);

const ActiveWorkout = (props: ActiveWorkoutProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <AppBar position={'absolute'} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              className={classes.gridWrapper}
              alignItems={'flex-end'}
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

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12} style={{ height: '34vh' }}>
            <LargeSuperSetItem
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

          <Grid
            item
            xs={12}
            container
            alignItems={'center'}
            style={{ height: '24vh' }}
          >
            <Grid
              item
              xs={8}
              container
              alignItems={'center'}
              style={{ paddingRight: 8 }}
            >
              <Grid item xs={12} style={{ marginBottom: 6 }}>
                <TextField
                  fullWidth
                  variant={'outlined'}
                  value={'10 reps'}
                  InputProps={{
                    className: clsx(classes.textField, classes.topTextField),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant={'outlined'}
                  value={'20 reps'}
                  InputProps={{
                    className: clsx(classes.textField, classes.bottomTextField),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={4} style={{ height: '100%' }}>
              <Button className={classes.didItButton}>{'Did It'}</Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            container
            alignItems={'flex-end'}
            style={{ height: '29vh' }}
          >
            <UpNextCard />
          </Grid>
        </Grid>
      </div>
    </Slide>
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
