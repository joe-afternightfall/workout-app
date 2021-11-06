import { connect } from 'react-redux';
import React, { useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import { Segment } from 'workout-app-common-core';
import { Drawer, IconButton } from '@material-ui/core';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveExerciseList from './components/list/ActiveExerciseList';
import SelectedExerciseOverlay from './components/SelectedExerciseOverlay';
import ActiveExerciseListAppBar from './components/ActiveExerciseListAppBar';

const useStyles = makeStyles(() =>
  createStyles({
    drawerContainer: {
      height: '90vh',
    },
  })
);

const ActiveExerciseListDrawer = (
  props: ActiveExerciseListDrawerProps
): JSX.Element => {
  const classes = useStyles();
  const { currentSegment, doneSegments, nextSegments } = props;
  const [open, setOpen] = useState(false);
  const [openSelectedExercise, setOpenSelectedExercise] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const toggleSelectedExercise = (open: boolean, segment: Segment | null) => {
    setOpenSelectedExercise(open);
    setSelectedSegment(segment);
  };

  const closeAndReset = () => {
    closeDialog();
    setTimeout(() => {
      toggleSelectedExercise(false, null);
    }, 500);
  };

  return (
    <>
      <IconButton color={'primary'} onClick={openDialog}>
        <ListIcon />
      </IconButton>
      <Drawer open={open} anchor={'bottom'} onClose={closeAndReset}>
        <div className={classes.drawerContainer}>
          <ActiveExerciseListAppBar
            selectedSegment={openSelectedExercise}
            closeClickHandler={closeAndReset}
            goBackClickHandler={() => {
              toggleSelectedExercise(false, null);
            }}
          />
          {openSelectedExercise && selectedSegment ? (
            <SelectedExerciseOverlay
              segment={selectedSegment}
              closeHandler={closeAndReset}
            />
          ) : (
            <ActiveExerciseList
              nextSegments={nextSegments}
              doneSegments={doneSegments}
              currentSegment={currentSegment}
              toggleSelectedExerciseHandler={toggleSelectedExercise}
            />
          )}
        </div>
      </Drawer>
    </>
  );
};

interface ActiveExerciseListDrawerProps {
  nextSegments: Segment[];
  doneSegments: Segment[];
  currentSegment: Segment;
}

const mapStateToProps = (state: State): ActiveExerciseListDrawerProps => {
  const doneSegments: Segment[] = [];
  const nextSegments: Segment[] = [];
  const currentPhase = state.workoutState.currentPhase;

  currentPhase.segments.map((segment) => {
    let numberOfExercisesDone = 0;
    segment.exercises.map((exercise) => {
      const numberOfSets = exercise.sets.length;
      let markedDoneSets = 0;
      exercise.sets.map((set) => {
        if (set.markedDone) {
          markedDoneSets++;
        }
      });
      if (numberOfSets === markedDoneSets) {
        numberOfExercisesDone++;
      }
    });
    if (numberOfExercisesDone === segment.exercises.length) {
      doneSegments.push(segment);
    }
  });

  const currentSegment = currentPhase.segments.find(
    (segment: Segment) =>
      segment.order === state.workoutState.currentSegmentIndex
  );

  currentPhase.segments.map((segment) => {
    const foundIndex = doneSegments.indexOf(segment);
    if (foundIndex === -1 && segment !== currentSegment) {
      nextSegments.push(segment);
    }
  });

  return {
    doneSegments: doneSegments,
    currentSegment: currentSegment,
    nextSegments: nextSegments,
  } as unknown as ActiveExerciseListDrawerProps;
};

export default connect(mapStateToProps)(ActiveExerciseListDrawer);
