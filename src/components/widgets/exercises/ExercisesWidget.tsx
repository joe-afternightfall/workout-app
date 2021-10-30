import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import ExercisesAppBar from './exercise-app-bar/ExercisesAppBar';
import MuscleGroupList from './muscle-group-list/MuscleGroupList';
import SwipeableViews from 'react-swipeable-views';
import ExercisesGrid from './exercises-grid/ExercisesGrid';

const useStyles = makeStyles(() =>
  createStyles({
    swipeableViews: {
      height: '100%',
    },
    viewWrapper: {
      marginTop: '7vh',
      marginBottom: '8vh',
    },
  })
);

export default function ExercisesWidget(): JSX.Element {
  const classes = useStyles();
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>('');
  const [activeTab, setActiveTab] = React.useState(0);

  const selectMuscleHandler = (id: string) => {
    setSelectedMuscleId(id);
    handleChangeIndex(1);
  };

  const goBack = () => {
    handleChangeIndex(0);
  };

  const handleViewChange = (index: number) => {
    setActiveTab(index);
    scrollToTop();
  };

  const handleChangeIndex = (index: number) => {
    setActiveTab(index);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Grid container item xs={12}>
      <ExercisesAppBar
        activeTab={activeTab}
        selectedMuscleId={selectedMuscleId}
        goBackHandler={goBack}
      />
      <div className={classes.viewWrapper}>
        <SwipeableViews
          index={activeTab}
          onChangeIndex={handleViewChange}
          className={classes.swipeableViews}
        >
          <Grid item xs={12}>
            <MuscleGroupList selectMuscleHandler={selectMuscleHandler} />
          </Grid>
          <Grid item xs={12}>
            <ExercisesGrid selectedMuscleId={selectedMuscleId} />
          </Grid>
        </SwipeableViews>
      </div>
    </Grid>
  );
}

interface ExercisesWidgetProps {
  blah?: undefined;
}
