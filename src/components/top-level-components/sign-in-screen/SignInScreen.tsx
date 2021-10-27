import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import SignInCard from './SignInCard';
import { Grid } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction, Dispatch } from 'redux';
import { routerActions } from 'react-router-redux';
import { State } from '../../../configs/redux/store';
import { getUserProfile } from '../../../services/user-profile';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { getWorkoutsForUser } from '../../../services/workout-service';
import { DASHBOARD_SCREEN_PATH } from '../../../configs/constants/app';
import { loadUsersWorkouts, validatedUser } from '../../../creators/user-info';
import { initializeWorkoutConfigs } from '../../../creators/initialize';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      backgroundColor: '#1A2474',
    },
  })
);

const SignInScreen = (props: SignInScreenProps): JSX.Element => {
  const classes = useStyles();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const signInHandler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user && user.email) {
          props.logInHandler(user.email);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          'CAUGHT_FIREBASE_ERROR: ' + errorCode + ' message: ' + errorMessage
        );
      });
  };

  return (
    <Grid
      container
      alignItems={'center'}
      justify={'center'}
      className={classes.root}
    >
      <Grid item xs={8} md={4}>
        <SignInCard
          email={email}
          clickHandler={signInHandler}
          changeHandler={handleChange}
          password={password}
        />
      </Grid>
    </Grid>
  );
};

export interface SignInScreenProps {
  logInHandler: (username: string) => void;
}

const mapDispatchToProps = (dispatch: Dispatch): SignInScreenProps =>
  ({
    logInHandler: async (email: string) => {
      dispatch(routerActions.push(DASHBOARD_SCREEN_PATH));
      dispatch(validatedUser(email));
      (dispatch as ThunkDispatch<State, void, AnyAction>)(
        getUserProfile(email)
      );
      const workouts = await getWorkoutsForUser(email);
      dispatch(loadUsersWorkouts(workouts));
      dispatch(initializeWorkoutConfigs());
    },
  } as unknown as SignInScreenProps);

export default connect(null, mapDispatchToProps)(SignInScreen);
