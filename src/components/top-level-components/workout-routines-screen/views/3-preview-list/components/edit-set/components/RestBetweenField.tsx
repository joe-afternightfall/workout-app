import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField } from '@material-ui/core';
import { trimLeadingZeros } from '../../../../../../../../utils/validator';
import { updateRestBetween } from '../../../../../../../../creators/workout/update-workout';
import { AppTheme } from '../../../../../../../../configs/theme/app-theme';
import { validateForOnlyNumbers } from 'workout-app-common-core';

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    inputRoot: {
      fontSize: '5vh',
      color: theme.palette.custom.colors.idle,
    },
    notchedOutline: {
      border: 0,
    },
    fieldWrapper: {
      borderColor: '#222323',
      backgroundColor: '#222323',
      borderRadius: 8,
    },
  })
);

const RestBetweenField = ({
  value,
  updateRestBetweenHandler,
}: RestBetweenFieldProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <div className={classes.fieldWrapper}>
        <TextField
          variant={'outlined'}
          value={value}
          inputProps={{ style: { textAlign: 'center' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position={'start'}>{'Sec'}</InputAdornment>
            ),
            classes: {
              root: classes.inputRoot,
              notchedOutline: classes.notchedOutline,
            },
          }}
          onChange={(e) => {
            updateRestBetweenHandler(e.target.value);
          }}
        />
      </div>
    </Grid>
  );
};

interface PassedInProps {
  value: number;
  segmentId: string;
  type: 'set' | 'segment';
}

interface RestBetweenFieldProps {
  updateRestBetweenHandler: (value: string) => void;
}

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenFieldProps =>
  ({
    updateRestBetweenHandler: (value: string) => {
      const trimmedValue = trimLeadingZeros(value);
      if (validateForOnlyNumbers(trimmedValue)) {
        dispatch(updateRestBetween(ownProps.segmentId, ownProps.type, value));
      }
    },
  } as unknown as RestBetweenFieldProps);

export default connect(null, mapDispatchToProps)(RestBetweenField);
