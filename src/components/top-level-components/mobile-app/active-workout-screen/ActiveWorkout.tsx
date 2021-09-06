import React from 'react';
import { scroller } from 'react-scroll';
import { Grid, Slide } from '@material-ui/core';
import ActiveSet from './2-active-set/ActiveSet';
import UpNextCard from './3-up-next-card/UpNextCard';
import ActiveWorkoutAppBar from './components/AppBar';
import ActiveExercise from './1-active-exercise/ActiveExercise';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    toolbarMixin: {
      height: '7vh',
    },
  })
);

export default function ActiveWorkout(): JSX.Element {
  const classes = useStyles();

  const scrollToSection = () => {
    scroller.scrollTo('third-set-row', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };

  return (
    <Slide mountOnEnter unmountOnExit in={true} direction={'up'}>
      <div>
        <ActiveWorkoutAppBar />

        <div className={classes.toolbarMixin} />

        <Grid container style={{ height: '87vh' }}>
          <Grid item xs={12}>
            <ActiveExercise exercises={[{ title: 'Mountain Climbers' }]} />
          </Grid>

          <Grid item xs={12}>
            <ActiveSet didItClickHandler={() => alert('clicked')} currentSet />
          </Grid>

          <Grid item xs={12}>
            <ActiveSet
              didItClickHandler={() => alert('clicked')}
              currentSet={false}
            />
          </Grid>

          <Grid
            item
            xs={12}
            container
            alignItems={'flex-end'}
            style={{ height: '28vh' }}
          >
            <UpNextCard />
          </Grid>
        </Grid>
      </div>
    </Slide>
  );
}
