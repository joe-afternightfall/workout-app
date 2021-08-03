import React from 'react';
import firebase from 'firebase';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import SignInCard from './SignInCard';
import { Grid } from '@material-ui/core';
import { updateLoggedInUser } from '../../../creators/user-info';
import { createStyles, makeStyles } from '@material-ui/core/styles';

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
      justifyContent={'center'}
      className={classes.root}
    >
      <Grid item xs={4}>
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
    logInHandler: (username: string) => {
      dispatch(updateLoggedInUser(username));
    },
  } as unknown as SignInScreenProps);

export default connect(null, mapDispatchToProps)(SignInScreen);
