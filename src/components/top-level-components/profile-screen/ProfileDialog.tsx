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
import MaterialUIPickers from './text-fields/TossPickers';
import { UserProfileVO } from '../../../configs/models/UserProfileVO';
import { findLatestWeight } from '../../../utils/find-latest';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
  })
);

interface ProfileState {
  displayName: string;
  dateOfBirth: string;
  weight: string;
  height: {
    feet: string;
    inches: string;
  };
}

const ProfileDialog = (props: ProfileDialogProps): JSX.Element => {
  const classes = useStyles();
  const { isNewUser, userProfile } = props;
  let latestWeight;

  if (isNewUser) {
    latestWeight = '';
  } else {
    const foundLatest = findLatestWeight(userProfile.weights);
    if (foundLatest) {
      latestWeight = foundLatest.weight;
    } else {
      latestWeight = '';
    }
  }

  const [localProfile, setLocalProfile] = React.useState<ProfileState>({
    displayName: isNewUser ? '' : userProfile.displayName,
    dateOfBirth: isNewUser ? '' : userProfile.dateOfBirth,
    weight: latestWeight,
    height: {
      feet: isNewUser ? '' : userProfile.height.feet,
      inches: isNewUser ? '' : userProfile.height.inches,
    },
  });

  // const handleWeightChange = () => {};

  return (
    <Dialog
      BackdropProps={{
        style: {
          backgroundColor: isNewUser ? 'black' : '',
        },
      }}
      onClose={props.closeHandler}
      open={props.open}
      fullWidth
    >
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant={'h6'}>
          {isNewUser ? 'Lets Setup Your User Profile' : 'User Profile'}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Grid container alignItems={'center'} justify={'center'} spacing={2}>
          <Grid item xs={12} sm={8}>
            <TextField fullWidth label={'Display Name'} />
          </Grid>

          <Grid item xs={12} sm={8}>
            <MaterialUIPickers />
          </Grid>

          <Grid item xs={12} sm={8} container>
            <Grid item xs={12} container style={{ marginBottom: 16 }}>
              <Grid item xs={6}>
                <Typography variant={'caption'}>{'Weight'}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant={'caption'}>{'Height'}</Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} container>
              <Grid item xs={6} container>
                <Grid item sm={8} xs={12}>
                  <TextField variant={'outlined'} fullWidth label={'lbs'} />
                </Grid>
              </Grid>

              <Grid item xs={6} container spacing={2}>
                <Grid item xs={6}>
                  <TextField variant={'outlined'} fullWidth label={'ft'} />
                </Grid>
                <Grid item xs={6}>
                  <TextField variant={'outlined'} fullWidth label={'in'} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      {isNewUser ? (
        <DialogActions>
          <Button>{'Save'}</Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button>{'Cancel'}</Button>
          <Button>{'Update'}</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export interface ProfileDialogProps {
  open: boolean;
  closeHandler: () => void;
  isNewUser: boolean;
  userProfile: UserProfileVO;
}

const mapStateToProps = (state: State): ProfileDialogProps => {
  return {
    open: state.applicationState.openUserProfileDialog,
    userProfile: state.applicationState.userProfile,
    isNewUser: state.applicationState.setupNewUser,
  } as unknown as ProfileDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ProfileDialogProps =>
  ({} as unknown as ProfileDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
