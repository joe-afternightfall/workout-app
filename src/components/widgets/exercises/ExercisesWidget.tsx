import clsx from 'clsx';
import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { ExerciseVO } from 'workout-app-common-core';
import SearchBar from './exercise-app-bar/SearchBar';
import ExerciseInfo from './views/3-exercise-info/ExerciseInfo';
import ExercisesAppBar from './exercise-app-bar/ExercisesAppBar';
import ExercisesGrid from './views/2-exercises-grid/ExercisesGrid';
import MuscleGroupList from './views/1-muscle-group-list/MuscleGroupList';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    swipeableViews: {
      width: '100%',
      height: '82vh',
      marginBottom: '8vh',
    },
    expandedMargin: {
      marginTop: '15vh',
    },
    closedMargin: {
      marginTop: '7vh',
    },
  })
);

export default function ExercisesWidget(): JSX.Element {
  const classes = useStyles();
  const [selectedMuscleId, setSelectedMuscleId] = useState<string>('');
  const [expandSearchField, setExpandSearchField] = useState(false);
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
    setExpandSearchField(false);
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

  const toggleSearchFieldHandler = () => {
    setExpandSearchField(!expandSearchField);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  let viewClass = '';

  if (activeTab === 2) {
    viewClass = classes.closedMargin;
  } else if (expandSearchField || activeTab === 0) {
    viewClass = classes.expandedMargin;
  } else if (activeTab === 1) {
    viewClass = expandSearchField
      ? classes.expandedMargin
      : classes.closedMargin;
  }

  return (
    <Grid container item xs={12}>
      <ExercisesAppBar
        activeTab={activeTab}
        goBackHandler={goBack}
        selectedMuscleId={selectedMuscleId}
        selectedExercise={selectedExercise}
      />
      {activeTab !== 2 && (
        <SearchBar
          expanded={expandSearchField}
          clickHandler={() => {
            if (activeTab === 0) {
              selectMuscleHandler('');
              toggleSearchFieldHandler();
            } else if (activeTab === 1) {
              toggleSearchFieldHandler();
            }
          }}
        />
      )}
      <SwipeableViews
        index={activeTab}
        onChangeIndex={handleViewChange}
        className={clsx(classes.swipeableViews, viewClass)}
        containerStyle={{ height: '100%' }}
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
    </Grid>
  );
}
