import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, InputAdornment, TextField, Typography } from '@material-ui/core';
import { Segment } from '../../../../../../../../../configs/models/AppInterfaces';
import { updateRestBetween } from '../../../../../../../../../creators/new-workout/update-workout';
import {
  trimLeadingZeros,
  validateForOnlyNumbers,
} from '../../../../../../../../../utils/validator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inputRoot: {
      fontSize: '5vh',
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

const RestBetweenOptions = ({
  segment,
  updateRestBetweenHandler,
}: RestBetweenOptionsProps & PassedInProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={2} justify={'center'}>
        <Grid item xs={6}>
          <div className={classes.fieldWrapper}>
            <TextField
              variant={'outlined'}
              value={segment.secondsRestBetweenSets}
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
                updateRestBetweenHandler('set', e.target.value);
              }}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.fieldWrapper}>
            <TextField
              variant={'outlined'}
              value={segment.secondsRestBetweenNextSegment}
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
                updateRestBetweenHandler('segment', e.target.value);
              }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between sets'}
          </Typography>
        </Grid>
        <Grid item xs={6} container justify={'center'}>
          <Typography color={'textSecondary'} variant={'caption'}>
            {'Rest between exercises'}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

interface PassedInProps {
  segment: Segment;
}

export interface RestBetweenOptionsProps {
  updateRestBetweenHandler: (type: 'set' | 'segment', value: string) => void;
}

const mapStateToProps = (state: any): RestBetweenOptionsProps => {
  return {} as unknown as RestBetweenOptionsProps;
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: PassedInProps
): RestBetweenOptionsProps =>
  ({
    updateRestBetweenHandler: (type: 'set' | 'segment', value: string) => {
      const trimmedValue = trimLeadingZeros(value);
      if (validateForOnlyNumbers(trimmedValue)) {
        dispatch(updateRestBetween(ownProps.segment.id, type, value));
      }
    },
  } as unknown as RestBetweenOptionsProps);

export default connect(mapStateToProps, mapDispatchToProps)(RestBetweenOptions);
