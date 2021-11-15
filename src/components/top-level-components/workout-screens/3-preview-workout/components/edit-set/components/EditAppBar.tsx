import React from 'react';
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { State } from '../../../../../../../configs/redux/store';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import {
  closeEditSet,
  toggleExerciseWidgetOnRoutinePreviewPage,
} from '../../../../../../../creators/workout/workout-selections';

const useStyles = makeStyles(() =>
  createStyles({
    appBar: {
      height: '8vh',
    },
    gridWrapper: {
      height: '100%',
    },
    menuButton: {
      paddingTop: 8,
      paddingBottom: 8,
    },
    toolbarMixin: {
      height: '7vh',
    },
  })
);

const EditAppBar = (props: EditAppBarProps): JSX.Element => {
  const classes = useStyles();
  const { displayDoneButton } = props;

  return (
    <>
      <AppBar
        color={'inherit'}
        elevation={0}
        position={'fixed'}
        className={classes.appBar}
      >
        <Toolbar>
          <Grid container className={classes.gridWrapper} alignItems={'center'}>
            {displayDoneButton ? (
              <Grid item xs={2} />
            ) : (
              <Grid item xs={2}>
                <IconButton
                  color={'primary'}
                  className={classes.menuButton}
                  onClick={props.closeClickHandler}
                >
                  <ArrowBackIcon fontSize={'small'} />
                </IconButton>
              </Grid>
            )}

            <Grid
              item
              xs={8}
              container
              justify={'center'}
              alignItems={'center'}
            >
              <Grid item>
                <Typography variant={'body1'}>{'Edit'}</Typography>
              </Grid>
            </Grid>

            {displayDoneButton ? (
              <Grid item xs={2} container justify={'flex-end'}>
                <Button
                  variant={'text'}
                  color={'primary'}
                  onClick={props.doneClickHandler}
                >
                  {'Done'}
                </Button>
              </Grid>
            ) : (
              <Grid item xs={2} />
            )}
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbarMixin} />
    </>
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
