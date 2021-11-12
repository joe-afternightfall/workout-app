import React, { useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import { Segment } from 'workout-app-common-core';
import { Drawer, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveExerciseList from './components/list/ActiveExerciseList';
import SelectedExerciseOverlay from './components/SelectedExerciseOverlay';
import ActiveExerciseListAppBar from './components/ActiveExerciseListAppBar';
import { State } from '../../../../../../configs/redux/store';
import { connect } from 'react-redux';
import EditSet from '../../../../workout-routines-screen/views/3-preview-list/components/edit-set/EditSet';

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
  const { displayExerciseWidget, displayEditSet } = props;
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
          {displayEditSet ? (
            <EditSet />
          ) : (
            <>
              {displayExerciseWidget ? (
                <React.Fragment />
              ) : (
                <ActiveExerciseListAppBar
                  selectedSegment={openSelectedExercise}
                  closeClickHandler={closeAndReset}
                  goBackClickHandler={() => {
                    toggleSelectedExercise(false, null);
                  }}
                />
              )}
              {openSelectedExercise && selectedSegment ? (
                <SelectedExerciseOverlay
                  segment={selectedSegment}
                  closeHandler={closeAndReset}
                />
              ) : (
                <ActiveExerciseList
                  toggleSelectedExerciseHandler={toggleSelectedExercise}
                />
              )}
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

interface ActiveExerciseListDrawerProps {
  displayExerciseWidget: boolean;
  displayEditSet: boolean;
}

const mapStateToProps = (state: State): ActiveExerciseListDrawerProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
    displayExerciseWidget:
      state.workoutState.displayExerciseWidgetOnRoutinePreviewPage,
  } as unknown as ActiveExerciseListDrawerProps;
};

export default connect(mapStateToProps)(ActiveExerciseListDrawer);
