import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { routerActions } from 'connected-react-router';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { WORKOUT_SCREEN_PATH } from '../../../../../../../configs/constants/app';
import { clearActiveWorkout } from '../../../../../../../creators/workout/active-workout';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '90%',
      color: '#424242',
    },
  })
);

const ExitWithoutSavingButton = (
  props: ExitWithoutSavingButtonProps
): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Button
        size={'large'}
        color={'primary'}
        variant={'contained'}
        className={classes.button}
        startIcon={<DeleteIcon />}
        onClick={props.exitWithoutSavingHandler}
      >
        {'Exit Without Saving'}
      </Button>
    </Grid>
  );
};

interface ExitWithoutSavingButtonProps {
  exitWithoutSavingHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): ExitWithoutSavingButtonProps =>
  ({
    exitWithoutSavingHandler: () => {
      dispatch(routerActions.push(WORKOUT_SCREEN_PATH));
      dispatch(clearActiveWorkout());
    },
  } as unknown as ExitWithoutSavingButtonProps);

export default connect(null, mapDispatchToProps)(ExitWithoutSavingButton);
