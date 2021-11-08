import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import SaveIcon from '@material-ui/icons/Save';
import { Grid, Button } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { State } from '../../../../../../../../configs/redux/store';
import { saveWorkoutForUser } from '../../../../../../../../services/user-profile';
import { WORKOUT_SCREEN_PATH } from '../../../../../../../../configs/constants/app';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      width: '90%',
      color: '#424242',
    },
  })
);

const SaveAndExitButton = (props: SaveAndExitButtonProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <Button
        size={'large'}
        color={'primary'}
        variant={'contained'}
        startIcon={<SaveIcon />}
        className={classes.button}
        onClick={props.saveAndExitHandler}
      >
        {'Save and Exit'}
      </Button>
    </Grid>
  );
};

interface SaveAndExitButtonProps {
  saveAndExitHandler: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): SaveAndExitButtonProps =>
  ({
    saveAndExitHandler: () => {
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        saveWorkoutForUser(WORKOUT_SCREEN_PATH)
      );
    },
  } as unknown as SaveAndExitButtonProps);

export default connect(null, mapDispatchToProps)(SaveAndExitButton);
