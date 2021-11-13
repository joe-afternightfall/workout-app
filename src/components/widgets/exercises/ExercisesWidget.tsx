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
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Dispatch } from 'redux';
import { filterExercisesForSearchValue } from '../../../creators/workout/exercises';
import { connect } from 'react-redux';
import {
  addExerciseToNewSuperSet,
  addExerciseToNewStraightSet,
} from '../../../creators/workout/preview-workout';

const useStyles = makeStyles(() =>
  createStyles({
    swipeableViews: {
      width: '100%',
      height: '82vh',
      marginBottom: '8vh',
    },
    expandedMargin: {
      marginTop: '7vh',
    },
    toolbar: {
      height: '7vh',
    },
  })
);

const ExercisesWidget = (
  props: ExercisesWidgetProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();
  const { addToSegment, backToRoutineHandler, alwaysDisplayBackButton } = props;
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
    props.clearSearchHandler();
    if (addToSegment) {
      props.addSegmentHandler(exercise.id, () => setActiveTab(0));
    } else {
      setSelectedExercise(exercise);
      handleChangeIndex(2);
    }
    if (expandSearchField) {
      setExpandSearchField(false);
    }
  };

  const goBack = () => {
    setExpandSearchField(false);
    props.clearSearchHandler();
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

  if (expandSearchField || activeTab === 0) {
    viewClass = classes.expandedMargin;
  } else if (activeTab === 1) {
    viewClass = expandSearchField ? classes.expandedMargin : '';
  }

  return (
    <div>
      <ExercisesAppBar
        activeTab={activeTab}
        alwaysDisplayBackButton={alwaysDisplayBackButton}
        goBackHandler={() => {
          if (backToRoutineHandler) {
            if (activeTab === 0) {
              backToRoutineHandler();
            } else {
              goBack();
            }
          } else {
            goBack();
          }
        }}
        selectedMuscleId={selectedMuscleId}
        selectedExercise={selectedExercise}
      />
      {addToSegment ? <React.Fragment /> : <div className={classes.toolbar} />}
      <Grid container>
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
    </div>
  );
};

interface PassedInProps {
  addToSegment?: boolean;
  segmentType?: 'straight' | 'super';
  backToRoutineHandler?: () => void;
  alwaysDisplayBackButton: boolean;
}

interface ExercisesWidgetProps {
  clearSearchHandler: () => void;
  addSegmentHandler: (exerciseId: string, callback: () => void) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): ExercisesWidgetProps =>
  ({
    clearSearchHandler: () => {
      dispatch(filterExercisesForSearchValue(''));
    },
    addSegmentHandler: (exerciseId: string, callback: () => void) => {
      if (ownProps.segmentType === 'straight') {
        dispatch(addExerciseToNewStraightSet(exerciseId));
      } else if (ownProps.segmentType === 'super') {
        dispatch(addExerciseToNewSuperSet(exerciseId, callback));
      }
    },
  } as unknown as ExercisesWidgetProps);

export default connect(null, mapDispatchToProps)(ExercisesWidget);
