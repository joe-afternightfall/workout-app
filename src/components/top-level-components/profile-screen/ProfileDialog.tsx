import {
  Grid,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  didNotDeleteSlash,
  formatBirthday,
  isValidDate,
} from '../../../utils/date-formatter';
import React, { ChangeEvent } from 'react';
import { State } from '../../../configs/redux/store';
import Typography from '@material-ui/core/Typography';
import NumbersTextField from '../../shared/NumbersTextField';
import { findLatestWeight } from '../../../utils/find-latest';
import { NUMBERS_ONLY_REGEX } from '../../../configs/constants/app';
import { UserProfileVO } from '../../../configs/models/UserProfileVO';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

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
  const [hasBlurred, setHasBlurred] = React.useState<boolean>(false);
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

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (
      NUMBERS_ONLY_REGEX.test(input.replace(/\//g, '')) &&
      didNotDeleteSlash(localProfile.dateOfBirth, input)
    ) {
      const formattedDate = formatBirthday(input);
      setLocalProfile((prevState: ProfileState) => {
        return {
          ...prevState,
          dateOfBirth: formattedDate,
        };
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalProfile((prevState: ProfileState) => {
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
                <Grid item sm={8} xs={12}>
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
