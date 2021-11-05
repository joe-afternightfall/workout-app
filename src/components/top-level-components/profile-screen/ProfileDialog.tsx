import {
  Grid,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { connect } from 'react-redux';
import {
  isValidDate,
  formatBirthday,
  didNotDeleteSlash,
} from '../../../utils/date-formatter';
import {
  NUMBERS_ONLY_REGEX,
  DISPLAY_NAME_REGEX,
} from '../../../configs/constants/app';
import {
  getUserProfile,
  updateUserProfile,
  createNewUserProfile,
  UpdateUserProfileProps,
} from '../../../services/user-profile';
import React, { ChangeEvent } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { State } from '../../../configs/redux/store';
import NumbersTextField from '../../shared/NumbersTextField';
import { findLatestWeight } from '../../../utils/find-latest';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { UserProfileVO } from 'workout-app-common-core';
import { toggleUserProfileDialog } from '../../../creators/user-info';

const useStyles = makeStyles(() =>
  createStyles({
    dialogTitle: {
      textAlign: 'center',
    },
  })
);

export interface ProfileDialogState {
  email: string;
  icon: string;
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
  const [hasBlurred, setHasBlurred] = React.useState<boolean>(false);
  const { isNewUser, userProfile } = props;
  let latestWeight: string;

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

  const [localProfile, setLocalProfile] = React.useState<ProfileDialogState>({
    email: '',
    icon: '',
    displayName: '',
    dateOfBirth: '',
    weight: '',
    height: {
      feet: '',
      inches: '',
    },
  });

  const loadProfileDialogState = () => {
    setLocalProfile({
      email: props.userEmail,
      icon: '',
      displayName: isNewUser ? '' : userProfile.displayName,
      dateOfBirth: isNewUser ? '' : userProfile.dateOfBirth,
      weight: latestWeight,
      height: {
        feet: isNewUser ? '' : userProfile.height.feet,
        inches: isNewUser ? '' : userProfile.height.inches,
      },
    });
  };

  React.useEffect(() => loadProfileDialogState(), [userProfile]);

  const cancelChanges = () => loadProfileDialogState();

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (
      NUMBERS_ONLY_REGEX.test(input.replace(/\//g, '')) &&
      didNotDeleteSlash(localProfile.dateOfBirth, input)
    ) {
      const formattedDate = formatBirthday(input);
      setLocalProfile((prevState: ProfileDialogState) => {
        return {
          ...prevState,
          dateOfBirth: formattedDate,
        };
      });
    }
  };

  const handleDisplayNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (DISPLAY_NAME_REGEX.test(e.target.value)) {
      setLocalProfile((prevState: ProfileDialogState) => {
        return {
          ...prevState,
          displayName: e.target.value,
        };
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalProfile((prevState: ProfileDialogState) => {
      if (e.target.name === 'feet' || e.target.name === 'inches') {
        return {
          ...prevState,
          height: {
            ...prevState.height,
            [e.target.name]: e.target.value,
          },
        };
      } else {
        return {
          ...prevState,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const invalidDate = !isValidDate(localProfile.dateOfBirth);
  const weightChanged = localProfile.weight !== latestWeight;

  const difference =
    localProfile.dateOfBirth !== userProfile.dateOfBirth ||
    localProfile.weight !== latestWeight ||
    localProfile.displayName !== userProfile.displayName ||
    localProfile.height.feet !== userProfile.height.feet ||
    localProfile.height.inches !== userProfile.height.inches;

  const isEmpty =
    localProfile.dateOfBirth === '' ||
    localProfile.weight === '' ||
    localProfile.displayName === '' ||
    localProfile.height.feet === '' ||
    localProfile.height.inches === '';

  const disableUpdate = !(difference && !isEmpty);

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
            <TextField
              fullWidth
              name={'displayName'}
              value={localProfile.displayName}
              label={'Display Name'}
              onChange={handleDisplayNameChange}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              label={'Birthday'}
              value={localProfile.dateOfBirth}
              onChange={handleDateChange}
              helperText={hasBlurred && invalidDate && 'invalid birthdate'}
              error={invalidDate && hasBlurred}
              onBlur={() => {
                setHasBlurred(localProfile.dateOfBirth.length > 0);
              }}
              onFocus={() => {
                setHasBlurred(false);
              }}
              placeholder={'MM/DD/YYYY'}
            />
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
                <Grid item xs={8}>
                  <NumbersTextField
                    name={'weight'}
                    value={localProfile.weight}
                    label={'lbs'}
                    changeHandler={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid item xs={6} container spacing={2}>
                <Grid item xs={6}>
                  <NumbersTextField
                    name={'feet'}
                    value={localProfile.height.feet}
                    label={'ft'}
                    changeHandler={handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <NumbersTextField
                    name={'inches'}
                    value={localProfile.height.inches}
                    label={'in'}
                    changeHandler={handleChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      {isNewUser ? (
        <DialogActions>
          <Button
            onClick={() => {
              props.saveNewUserClickHandler(localProfile);
            }}
          >
            {'Save'}
          </Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            onClick={() => {
              props.closeDialogHandler();
              setTimeout(() => {
                cancelChanges();
              }, 500);
            }}
          >
            {'Cancel'}
          </Button>
          <Button
            disabled={disableUpdate}
            onClick={() => {
              props.updateClickHandler({
                weightChange: weightChanged,
                updatedUserProfile: localProfile,
                originalUserProfile: userProfile,
              });
            }}
          >
            {'Update'}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

interface ProfileDialogProps {
  userEmail: string;
  open: boolean;
  closeHandler: () => void;
  isNewUser: boolean;
  userProfile: UserProfileVO;
  saveNewUserClickHandler: (profile: ProfileDialogState) => void;
  closeDialogHandler: () => void;
  updateClickHandler: (props: UpdateUserProfileProps) => void;
}

const mapStateToProps = (state: State): ProfileDialogProps => {
  return {
    userEmail: state.applicationState.userEmail,
    open: state.applicationState.openUserProfileDialog,
    userProfile: state.applicationState.userProfile,
    isNewUser: state.applicationState.setupNewUser,
  } as unknown as ProfileDialogProps;
};

const mapDispatchToProps = (dispatch: Dispatch): ProfileDialogProps =>
  ({
    saveNewUserClickHandler: async (profile: ProfileDialogState) => {
      await createNewUserProfile(profile);
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        getUserProfile(profile.email)
      );
    },
    closeDialogHandler: () => {
      dispatch(toggleUserProfileDialog(false));
    },
    updateClickHandler: async (props: UpdateUserProfileProps) => {
      await updateUserProfile(props);
      dispatch(toggleUserProfileDialog(false));
    },
  } as unknown as ProfileDialogProps);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDialog);
