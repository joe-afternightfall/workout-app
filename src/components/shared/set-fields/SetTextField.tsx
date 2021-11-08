import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { validateWeight, trimLeadingZeros } from '../../../utils/validator';
import { Grid, TextField } from '@material-ui/core';
import BaseSetAdornment from './adornments/BaseSetAdornment';
import { AppTheme } from '../../../configs/theme/app-theme';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { updateSetTextField } from '../../../creators/workout/update-workout';
import {
  validateForOnlyNumbers,
  WorkoutDistance,
  WorkoutDuration,
  WorkoutTimer,
} from 'workout-app-common-core';

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

const SetTextField = ({
  value,
  setType,
  activeSet,
  fullLength,
  markedDone,
  alternateSides,
  onChangeHandler,
}: SetTextFieldProps & PassedInProps): JSX.Element => {
  const classes = useStyles();
  const theme = useTheme<AppTheme>();
  let fontColor = theme.palette.custom.colors.idle;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const trimmedValue = trimLeadingZeros(event.target.value);
    const name = event.target.name;
    if (name === 'reps' || name === 'sec') {
      if (validateForOnlyNumbers(trimmedValue)) {
        return onChangeHandler(trimmedValue);
      }
    } else if (name === 'weight') {
      if (validateWeight(trimmedValue)) {
        return onChangeHandler(trimmedValue);
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

export interface SetTextFieldInfoProps {
  setId: string;
  reps: number;
  weight?: number;
  duration?: WorkoutDuration;
  distance?: WorkoutDistance;
  parameterTypeId: string;
  alternateSides: boolean;
  timers?: WorkoutTimer[];
  shouldDisplayTimer: boolean;
}

interface PassedInProps {
  value: number;
  setId: string;
  activeSet: boolean;
  markedDone: boolean;
  fullLength: boolean;
  alternateSides: boolean;
  setType: 'weight' | 'reps' | 'sec';
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
