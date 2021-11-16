import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { validateWeight, trimLeadingZeros } from '../../../utils/validator';
import { Grid, TextField } from '@material-ui/core';
import BaseSetAdornment from './adornments/BaseSetAdornment';
import { AppTheme } from '../../../configs/theme/app-theme';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { updateSetTextField } from '../../../creators/workout/update-workout';
import { validateForOnlyNumbers } from 'workout-app-common-core';
import { SetTextFieldTypes } from '../../../configs/types';

const useStyles = makeStyles(() =>
  createStyles({
    inputRoot: {
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
  const { value, setType, activeSet, fullLength, markedDone, alternateSides } =
    props;

  const theme = useTheme<AppTheme>();
  let fontColor = theme.palette.custom.colors.idle;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = trimLeadingZeros(event.target.value);
    const name = event.target.name as unknown as SetTextFieldTypes;
    if (name === 'reps' || name === 'duration') {
      if (validateForOnlyNumbers(trimmedValue)) {
        return props.onChangeHandler(trimmedValue);
      }
    } else if (name === 'weight') {
      if (validateWeight(trimmedValue)) {
        return props.onChangeHandler(trimmedValue);
      }
    }
  };

  if (activeSet) {
    fontColor = theme.palette.custom.colors.activeText;
  } else if (markedDone) {
    fontColor = theme.palette.custom.colors.activeText;
  }

  return (
    <Grid item className={fullLength ? classes.fullLength : classes.halfLength}>
      <TextField
        type={'number'}
        fullWidth
        variant={'outlined'}
        value={value}
        name={setType}
        inputProps={{
          style: {
            textAlign: fullLength ? 'center' : undefined,
            color: fontColor,
          },
        }}
        InputProps={{
          endAdornment: (
            <BaseSetAdornment
              setType={setType}
              fontColor={fontColor}
              alternateSides={alternateSides}
            />
          ),
          classes: {
            root: classes.inputRoot,
            notchedOutline: classes.notchedOutline,
          },
        }}
        onChange={handleChange}
      />
    </Grid>
  );
};

interface PassedInProps {
  value: number;
  setId: string;
  activeSet: boolean;
  markedDone: boolean;
  fullLength: boolean;
  alternateSides: boolean;
  setType: SetTextFieldTypes;
}

interface SetTextFieldProps {
  onChangeHandler: (value: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): SetTextFieldProps =>
  ({
    onChangeHandler: (value: number) => {
      dispatch(updateSetTextField(ownProps.setId, ownProps.setType, value));
    },
  } as unknown as SetTextFieldProps);

export default connect(null, mapDispatchToProps)(SetTextField);
