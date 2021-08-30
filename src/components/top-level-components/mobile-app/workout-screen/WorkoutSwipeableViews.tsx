import React from 'react';
import { teal } from '@material-ui/core/colors';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      // height: '100%',
      // borderRadius: 8,
      // backgroundColor: '#F6F6F6',
    },
    routineCard: {
      color: '#fff',
      backgroundColor: teal[500],
      // backgroundColor: '#404040',
      // backgroundColor: '#635cf4',
      // backgroundColor: '#534d9f',
      // backgroundColor: '#3CBDEDFF',
    },
  })
);

export default function WorkoutSwipeableViews(
  props: WorkoutSwipeableViewsProps
): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleViewChange = (index: number) => {
    setActiveTab(index);
  };

  return (
    <SwipeableViews
      index={activeTab}
      className={classes.root}
      onChangeIndex={handleViewChange}
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card raised={true} className={classes.routineCard}>
            <CardHeader title={'Routine'} />
            <CardContent>{'Back and Biceps'}</CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card raised={true} className={classes.routineCard}>
            <CardHeader title={'Routine'} />
            <CardContent>{'Back and Biceps'}</CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card raised={true} className={classes.routineCard}>
            <CardHeader title={'Routine'} />
            <CardContent>{'Back and Biceps'}</CardContent>
          </Card>
        </Grid>
      </Grid>
    </SwipeableViews>
  );
}

export interface WorkoutSwipeableViewsProps {
  DELETE_ME?: undefined;
}
