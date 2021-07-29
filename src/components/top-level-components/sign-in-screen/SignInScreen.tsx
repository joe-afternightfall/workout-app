import firebase from 'firebase';
import {
  Theme,
  WithStyles,
  withStyles,
  StyledComponentProps,
} from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Styles } from '@material-ui/styles';
import { Button, Card, Grid, TextField } from '@material-ui/core';
import SignInCard from './SignInCard';

const styles: Styles<Theme, StyledComponentProps> = (theme: Theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#1A2474',
  },
});

class SignInScreen extends Component<SignInProps> {
  state = {
    email: '',
    password: '',
  };

  render(): JSX.Element {
    const { classes } = this.props;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    const signInHandler = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
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
            email={this.state.email}
            clickHandler={signInHandler}
            changeHandler={handleChange}
            password={this.state.password}
          />
        </Grid>
      </Grid>
    );
  }
}

export type SignInProps = WithStyles<typeof styles>;

export default withStyles(styles, { withTheme: true })(SignInScreen);
