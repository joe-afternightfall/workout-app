import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions,
  Button,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { State } from '../../../configs/redux/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
  })
);

const ProfileDialog = (props: ProfileDialogProps): JSX.Element => {
  const classes = useStyles();

  console.log('props.setupNewUser: ' + JSON.stringify(props.setupNewUser));
  return (
    <Dialog
      BackdropProps={{
        style: {
          backgroundColor: props.setupNewUser ? 'black' : '',
        },
      }}
      onClose={props.closeHandler}
      open={props.open}
      fullWidth
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant={'h6'}>{'User Profile'}</Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item xs={8}>
            <TextField fullWidth label={'Display Name'} />
          </Grid>

          <Grid item xs={8}>
            <TextField fullWidth label={'Date of Birth'} />
          </Grid>

          <Grid item xs={8}>
            <TextField fullWidth label={'Weight'} />
          </Grid>

          <Grid item xs={8}>
            <TextField fullWidth label={'Height'} />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button>{'Cancel'}</Button>
        <Button>{'Save'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export interface ProfileDialogProps {
  open: boolean;
  closeHandler: () => void;
  setupNewUser: boolean;
}

const mapStateToProps = (state: State): ProfileDialogProps => {
  return {
    open: state.applicationState.openUserProfileDialog,
    setupNewUser: state.applicationState.setupNewUser,
  } as unknown as ProfileDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ProfileDialogProps =>
  ({} as unknown as ProfileDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
