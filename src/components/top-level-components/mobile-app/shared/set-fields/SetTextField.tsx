import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import {
  trimLeadingZeros,
  validateForOnlyNumbers,
  validateWeight,
} from '../../../../../utils/validator';
import { updateSetTextField } from '../../../../../creators/new-workout/update-workout';
import SetFieldAdornment from './SetFieldAdornment';
import clsx from 'clsx';
import { AppTheme } from '../../../../../configs/theme/app-theme';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      fontSize: '5vh',
    },
    fullLength: {
      width: '100%',
    },
    halfLength: {
      width: '50%',
    },
    notchedOutline: {
      border: 0,
    },
    activeText: {
      color: theme.palette.custom.colors.activeText,
    },
    idleText: {
      color: theme.palette.custom.colors.idle,
    },
  })
);

const SetTextField = (
  props: SetTextFieldProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = trimLeadingZeros(event.target.value);
    if (event.target.name === 'reps') {
      if (validateForOnlyNumbers(trimmedValue)) {
        return props.onChangeHandler(trimmedValue);
      }
    } else if (event.target.name === 'weight') {
      if (validateWeight(trimmedValue)) {
        return props.onChangeHandler(trimmedValue);
      }
    }
  };

  return (
    <Grid
      item
      className={props.fullLength ? classes.fullLength : classes.halfLength}
    >
      <TextField
        fullWidth
        variant={'outlined'}
        value={props.value}
        name={props.setType}
        inputProps={{
          style: { textAlign: props.fullLength ? 'center' : undefined },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position={'end'}>
              {props.setType === 'weight' ? (
                <Typography
                  className={
                    props.activeSet ? classes.activeText : classes.idleText
                  }
                >
                  {'lb'}
                </Typography>
              ) : props.alternateSides ? (
                <SetFieldAdornment />
              ) : (
                <Typography
                  className={
                    props.activeSet ? classes.activeText : classes.idleText
                  }
                >
                  {'reps'}
                </Typography>
              )}
            </InputAdornment>
          ),
          classes: {
            root: clsx(
              classes.root,
              props.activeSet ? classes.activeText : classes.idleText
            ),
            notchedOutline: classes.notchedOutline,
            adornedEnd: props.activeSet ? classes.activeText : classes.idleText,
          },
        }}
        onChange={handleChange}
      />
    </Grid>
  );
};

export interface SetFieldInfoProps {
  setId: string;
  reps: number;
  weight?: number;
  parameterTypeId: string;
  alternateSides: boolean;
}

export interface PassedInProps {
  value: number;
  fullLength: boolean;
  setType: 'weight' | 'reps';
  setId: string;
  alternateSides: boolean;
  activeSet: boolean;
}

export interface SetTextFieldProps {
  onChangeHandler: (value: string) => void;
}

const mapStateToProps = (): SetTextFieldProps => {
  return {} as unknown as SetTextFieldProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SetTextFieldProps =>
  ({
    onChangeHandler: (value: number) => {
      dispatch(updateSetTextField(ownProps.setId, ownProps.setType, value));
    },
  } as unknown as SetTextFieldProps);

export default connect(mapStateToProps, mapDispatchToProps)(SetTextField);
