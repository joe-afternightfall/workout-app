import firebase from 'firebase';
import { Button, Card, Grid, TextField } from '@material-ui/core';
import SignInCard from './SignInCard';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { updateLoggedInUser } from '../../../creators/user-info';

const useStyles = makeStyles((theme: Theme) =>
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
