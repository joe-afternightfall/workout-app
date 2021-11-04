import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { ExerciseVO } from 'workout-app-common-core';
import ExerciseInfo from './views/3-exercise-info/ExerciseInfo';
import ExercisesAppBar from './exercise-app-bar/ExercisesAppBar';
import ExercisesGrid from './views/2-exercises-grid/ExercisesGrid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import MuscleGroupList from './views/1-muscle-group-list/MuscleGroupList';

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
  const [selectedExercise, setSelectedExercise] = useState<ExerciseVO | null>(
    null
  );
  const [activeTab, setActiveTab] = React.useState(0);

  const selectMuscleHandler = (id: string) => {
    setSelectedMuscleId(id);
    handleChangeIndex(1);
  };

  const selectExerciseClickHandler = (exercise: ExerciseVO) => {
    setSelectedExercise(exercise);
    handleChangeIndex(2);
  };

  const goBack = () => {
    handleChangeIndex(activeTab - 1);
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
        goBackHandler={goBack}
        selectedMuscleId={selectedMuscleId}
        selectedExercise={selectedExercise}
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
            <ExercisesGrid
              exerciseInfoClickHandler={selectExerciseClickHandler}
              selectedMuscleId={selectedMuscleId}
            />
          </Grid>
          <Grid item xs={12}>
            <ExerciseInfo exercise={selectedExercise} />
          </Grid>
        </SwipeableViews>
      </div>
    </Grid>
  );
}
