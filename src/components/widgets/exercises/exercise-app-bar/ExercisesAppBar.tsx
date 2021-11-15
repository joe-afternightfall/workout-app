import React from 'react';
import { connect } from 'react-redux';
import FilterDrawer from './FilterDrawer';
import { IconButton } from '@material-ui/core';
import TopAppBar from '../../../app-shell/TopAppBar';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import { State } from '../../../../configs/redux/store';
import { ExerciseVO, ManikinMuscleGroupVO } from 'workout-app-common-core';

const ExercisesAppBar = (
  props: ExercisesAppBarProps & PassedInProps
): JSX.Element => {
  const {
    activeTab,
    manikinMuscleGroups,
    selectedMuscleId,
    hideToolbarMixin,
    selectedExercise,
    goBackHandler,
    alwaysDisplayBackButton,
  } = props;

  let title = '';
  let displayBackButton = false;
  let displayFilterButton = false;

  if (activeTab === 0) {
    title = 'Muscle Groups';
    if (alwaysDisplayBackButton) {
      displayBackButton = true;
    }
  } else if (activeTab === 1) {
    displayBackButton = true;
    displayFilterButton = true;
    if (selectedMuscleId === '') {
      title = 'All Exercises';
    } else {
      manikinMuscleGroups.map((group) => {
        if (group.id === selectedMuscleId) {
          title = `${group.name} Exercises`;
        }
      });
    }
  } else if (activeTab === 2 && selectedExercise) {
    displayBackButton = true;
    title = selectedExercise.name;
  }

  return (
    <TopAppBar
      title={title}
      leftButton={
        displayBackButton ? (
          <IconButton onClick={goBackHandler}>
            <ArrowBack />
          </IconButton>
        ) : undefined
      }
      rightButton={displayFilterButton ? <FilterDrawer /> : undefined}
      hideToolbarMixin={hideToolbarMixin}
    />
  );
};

interface PassedInProps {
  activeTab: number;
  alwaysDisplayBackButton: boolean;
  selectedMuscleId: string;
  goBackHandler: () => void;
  hideToolbarMixin?: boolean;
  selectedExercise: ExerciseVO | null;
}

interface ExercisesAppBarProps {
  manikinMuscleGroups: ManikinMuscleGroupVO[];
}

const mapStateToProps = (state: State): ExercisesAppBarProps => {
  return {
    manikinMuscleGroups:
      state.applicationState.workoutConfigurations.manikinMuscleGroups,
  } as unknown as ExercisesAppBarProps;
};

export default connect(mapStateToProps)(ExercisesAppBar);
