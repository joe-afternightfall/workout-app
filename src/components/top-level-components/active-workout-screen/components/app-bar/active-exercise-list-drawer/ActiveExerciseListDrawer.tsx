import React, { useState } from 'react';
import ListIcon from '@material-ui/icons/List';
import { Segment } from 'workout-app-common-core';
import { Drawer, Grid, IconButton } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import ActiveExerciseList from './components/list/ActiveExerciseList';
import SelectedExerciseOverlay from './components/SelectedExerciseOverlay';
import ActiveExerciseListAppBar from './components/ActiveExerciseListAppBar';
import { State } from '../../../../../../configs/redux/store';
import { connect } from 'react-redux';
import EditSet from '../../../../workout-screens/3-preview-workout/components/edit-set/EditSet';
import { toggleEditOptionButtons } from '../../../../../../creators/workout/workout-selections';
import { Dispatch } from 'redux';

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
  const [editRoutine, setEditRoutine] = useState(false);
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

  const toggleEditRoutine = () => {
    setEditRoutine(!editRoutine);
    props.toggleEditHandler(!editRoutine);
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
      <Drawer
        open={open}
        anchor={'bottom'}
        onClose={closeAndReset}
        PaperProps={{
          style: { padding: displayEditSet ? 8 : 0 },
        }}
      >
        <div className={classes.drawerContainer}>
          {displayEditSet ? (
            <Grid item xs={12}>
              <EditSet hideToolbarMixin />
            </Grid>
          ) : (
            <>
              {displayExerciseWidget ? (
                <React.Fragment />
              ) : (
                <ActiveExerciseListAppBar
                  isEditing={editRoutine}
                  selectedSegment={openSelectedExercise}
                  closeClickHandler={closeAndReset}
                  toggleEditHandler={toggleEditRoutine}
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
                  displayBottomActionButtons={editRoutine}
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
  toggleEditHandler: (open: boolean) => void;
}

const mapStateToProps = (state: State): ActiveExerciseListDrawerProps => {
  return {
    displayEditSet: state.workoutState.displayEditSet,
    displayExerciseWidget: state.workoutState.displayExerciseWidget,
  } as unknown as ActiveExerciseListDrawerProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch
): ActiveExerciseListDrawerProps =>
  ({
    toggleEditHandler: (open: boolean) => {
      const props = {
        open: open,
        onlyDisplayDelete: open,
      };
      dispatch(toggleEditOptionButtons(props));
    },
  } as unknown as ActiveExerciseListDrawerProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveExerciseListDrawer);
