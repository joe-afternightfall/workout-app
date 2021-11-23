import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { State } from '../../configs/redux/store';
import { Button, Drawer, Grid } from '@material-ui/core';
import {
  toggleDeleteExerciseDrawer,
  deleteSelectedSegmentFromRoutine,
} from '../../creators/workout/delete-exercise-drawer';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 12px',
      height: '21.75vh',
      background: 'transparent',
    },
    button: {
      borderRadius: '8px 8px 0 0',
      width: '100%',
    },
    cancelButton: {
      width: '100%',
      height: '6vh',
      fontWeight: 'bold',
      color: '#cb9d14',
      background: '#2d2d2e',
      // background: '#212121',
    },
    removeButton: {
      width: '100%',
      color: '#e44239',
      borderRadius: '0 0 8px 8px',
      background: '#212121',
      // background: '#333333',
      borderTop: '2px solid #333333',
    },
    replaceButton: {
      width: '100%',
      borderRadius: '8px 8px 0 0',
      // background: '#2d2d2e',
      background: '#212121',
      color: theme.palette.info.dark,
    },
  })
);

const DeleteExerciseDrawer = (
  props: DeleteExerciseDrawerProps
): JSX.Element => {
  const classes = useStyles();
  const { open, segmentId } = props;

  return (
    <Drawer
      anchor={'bottom'}
      open={open}
      onClose={props.closeHandler}
      classes={{ paper: classes.root }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Button variant={'contained'} className={classes.replaceButton}>
              {'Replace Exercise'}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant={'contained'}
              className={classes.removeButton}
              onClick={() => {
                props.deleteSegmentHandler(segmentId);
                props.closeHandler();
              }}
              data-testid={'delete-exercise-button'}
            >
              {'Remove Exercise'}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={12}>
            <Button
              variant={'contained'}
              onClick={props.closeHandler}
              className={classes.cancelButton}
              data-testid={'delete-exercise-cancel-button'}
            >
              {'Cancel'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Drawer>
  );
};

interface DeleteExerciseDrawerProps {
  open: boolean;
  segmentId: string;
  closeHandler: () => void;
  deleteSegmentHandler: (segmentId: string) => void;
}

const mapStateToProps = (state: State): DeleteExerciseDrawerProps => {
  const props = state.workoutState.deleteExerciseDrawerProps;

  return {
    open: props.open,
    segmentId: props.segmentId,
  } as unknown as DeleteExerciseDrawerProps;
};

const mapDispatchToProps = (dispatch: Dispatch): DeleteExerciseDrawerProps =>
  ({
    deleteSegmentHandler: (segmentId: string) => {
      dispatch(deleteSelectedSegmentFromRoutine(segmentId));
    },
    closeHandler: () => {
      dispatch(
        toggleDeleteExerciseDrawer({
          open: false,
          segmentId: '',
          phaseType: '',
        })
      );
    },
  } as unknown as DeleteExerciseDrawerProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteExerciseDrawer);
