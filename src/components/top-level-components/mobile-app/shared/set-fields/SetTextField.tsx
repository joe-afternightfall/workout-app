import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import { validateReps } from '../../../../../utils/validator';
import { updateSetTextField } from '../../../../../creators/new-workout/update-workout';

const useStyles = makeStyles(() =>
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
  })
);

const SetTextField = (
  props: SetTextFieldProps & PassedInProps
): JSX.Element => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'reps') {
      if (validateReps(event.target.value)) {
        props.onChangeHandler(Number(event.target.value));
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
            <InputAdornment position={'start'}>
              {props.setType === 'weight' ? 'lb' : 'reps'}
            </InputAdornment>
          ),
          classes: {
            root: classes.root,
            notchedOutline: classes.notchedOutline,
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
}

export interface PassedInProps {
  value: number;
  fullLength: boolean;
  setType: 'weight' | 'reps';
  setId: string;
}

export interface SetTextFieldProps {
  onChangeHandler: (value: number) => void;
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
