import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Divider,
  InputAdornment,
  FormHelperText,
  OutlinedInput,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    topTextField: {
      // width: '4ch',
      // borderRight: 0,
      border: 0,
      borderRadius: '4px 0 0 4px',
    },
    bottomTextField: {
      // width: '4ch',
      border: 0,
      borderRadius: 0,
    },
    textFieldRoot: {
      fontSize: '5vh',
      // fontSize: '1.991em',
    },
    inputRowWrapper: {
      border: '1px solid',
      borderColor: 'rgba(255, 255, 255, 0.23)',
      borderRadius: 'inherit',
      height: '12.5vh',
    },
    topRow: {
      borderRadius: '4px 0 0 0',
    },
    bottomRow: {
      borderRadius: '0 0 0 4px',
    },
    activeColor: {
      backgroundColor: '#ed440b',
      // opacity: 0.6,
    },
    textFieldWrapper: {
      width: '50%',
    },
  })
);

const CurrentSet = (props: CurrentSetProps): JSX.Element => {
  const classes = useStyles();
  const [values, setValues] = React.useState<LocalState>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof LocalState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  return (
    <>
      <Grid
        item
        xs={12}
        container
        className={clsx(
          classes.inputRowWrapper,
          classes.topRow,
          classes.activeColor
        )}
      >
        <Grid item className={classes.textFieldWrapper}>
          <TextField
            fullWidth
            variant={'outlined'}
            value={'35'}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'start'}>{'lb'}</InputAdornment>
              ),
              classes: {
                root: classes.textFieldRoot,
                notchedOutline: classes.topTextField,
              },
            }}
          />
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          justify={'center'}
          style={{ width: '0%' }}
        >
          <Divider
            orientation={'vertical'}
            style={{ width: 2, height: '75%' }}
          />
        </Grid>
        <Grid item className={classes.textFieldWrapper}>
          <TextField
            fullWidth
            variant={'outlined'}
            value={'12'}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'start'}>{'reps'}</InputAdornment>
              ),
              classes: {
                root: classes.textFieldRoot,
                notchedOutline: classes.bottomTextField,
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        container
        className={clsx(
          classes.inputRowWrapper,
          classes.bottomRow,
          classes.activeColor
        )}
      >
        <Grid item className={classes.textFieldWrapper}>
          <TextField
            fullWidth
            variant={'outlined'}
            value={'35'}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'start'}>{'lb'}</InputAdornment>
              ),
              classes: {
                root: classes.textFieldRoot,
                notchedOutline: classes.topTextField,
              },
            }}
          />
        </Grid>
        <Grid
          item
          container
          alignItems={'center'}
          justify={'center'}
          style={{ width: '0%' }}
        >
          <Divider
            orientation={'vertical'}
            style={{ width: 2, height: '75%' }}
          />
        </Grid>
        <Grid item className={classes.textFieldWrapper}>
          <TextField
            fullWidth
            variant={'outlined'}
            value={'12'}
            InputProps={{
              endAdornment: (
                <InputAdornment position={'start'}>{'reps'}</InputAdornment>
              ),
              classes: {
                root: classes.textFieldRoot,
                notchedOutline: classes.bottomTextField,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

interface LocalState {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export interface CurrentSetProps {
  DELETE_ME?: undefined;
}

const mapStateToProps = (state: any): CurrentSetProps => {
  return {} as unknown as CurrentSetProps;
};

const mapDispatchToProps = (dispatch: Dispatch): CurrentSetProps =>
  ({} as unknown as CurrentSetProps);

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSet);
