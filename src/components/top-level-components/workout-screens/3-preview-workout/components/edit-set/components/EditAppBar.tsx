import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid, IconButton, Button } from '@material-ui/core';
import TopAppBar from '../../../../../../app-shell/TopAppBar';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  closeEditSet,
  toggleExerciseWidgetOnRoutinePreviewPage,
} from '../../../../../../../creators/workout/workout-selections';

const useStyles = makeStyles(() =>
  createStyles({
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
  })
);

const EditAppBar = (props: EditAppBarProps): JSX.Element => {
  const classes = useStyles();
  const { displayDoneButton } = props;

  return (
    <TopAppBar
      title={'Edit'}
      leftButton={
        displayDoneButton ? undefined : (
          <IconButton
            color={'primary'}
            className={classes.menuButton}
            onClick={props.closeClickHandler}
          >
            <ArrowBackIcon fontSize={'small'} />
          </IconButton>
        )
      }
      rightButton={
        displayDoneButton ? (
          <Grid item xs={2} container justify={'flex-end'}>
            <Button
              variant={'text'}
              color={'primary'}
              onClick={props.doneClickHandler}
            >
              {'Done'}
            </Button>
          </Grid>
        ) : undefined
      }
    />
  );
};

interface EditAppBarProps {
  displayDoneButton: boolean;
  closeClickHandler: () => void;
  doneClickHandler: () => void;
}

const mapStateToProps = (state: State): EditAppBarProps => {
  return {
    displayDoneButton: state.workoutState.displayDoneButtonInEditSetAppBar,
  } as unknown as EditAppBarProps;
};

const mapDispatchToProps = (dispatch: Dispatch): EditAppBarProps =>
  ({
    closeClickHandler: () => {
      dispatch(closeEditSet());
    },
    doneClickHandler: () => {
      dispatch(closeEditSet());
      dispatch(toggleExerciseWidgetOnRoutinePreviewPage(false));
    },
  } as unknown as EditAppBarProps);

export default connect(mapStateToProps, mapDispatchToProps)(EditAppBar);
